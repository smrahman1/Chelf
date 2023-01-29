
import webbrowser, os
import json
import boto3
import io
from io import BytesIO
import sys
from pprint import pprint
import pdf2image


# The following was used as a source for code
# https://docs.aws.amazon.com/textract/latest/dg/examples-export-table-csv.html


"""
 The following was used as a source for code:
 https://docs.aws.amazon.com/textract/latest/dg/examples-export-table-csv.html
 

 This is short demo on how to extract the TABLES using textract analyze_document.  
 
 NOTE:
 * This code uses textract's analyze_document.
 * Textract analyze_document and textract analyze_expense are DIFFERENT.
 * Textract analyze_expsense calls the textract model trained on INVOICES ONLY and will provide different results than textract analyze_document. 
 * Textract analyze_document calls the textract model trained on ANY TYPE OF DOCUMENT.


"""

def get_rows_columns_map(table_result, blocks_map):
    rows = {}
    for relationship in table_result['Relationships']:
        if relationship['Type'] == 'CHILD':
            for child_id in relationship['Ids']:
                cell = blocks_map[child_id]
                if cell['BlockType'] == 'CELL':
                    row_index = cell['RowIndex']
                    col_index = cell['ColumnIndex']
                    if row_index not in rows:
                        # create new row
                        rows[row_index] = {}
                        
                    # get the text value
                    rows[row_index][col_index] = get_text(cell, blocks_map)
    return rows


def get_text(result, blocks_map):
    text = ''
    if 'Relationships' in result:
        for relationship in result['Relationships']:
            if relationship['Type'] == 'CHILD':
                for child_id in relationship['Ids']:
                    word = blocks_map[child_id]
                    if word['BlockType'] == 'WORD':
                        text += word['Text'] + ' '
                    if word['BlockType'] == 'SELECTION_ELEMENT':
                        if word['SelectionStatus'] =='SELECTED':
                            text +=  'X '    
    return text

def load_pdf_page_as_byte(file_name, page_number):
    # load pdf as images
    pages = pdf2image.convert_from_path(file_name, first_page  = page_number, last_page  = page_number, dpi = 300, poppler_path="./poppler-21.03.0/Library/bin")
    
    # convert to byte array
    img_byte_arr = io.BytesIO()
    pages[0].save(img_byte_arr, format='PNG')
    bytes_test = img_byte_arr.getvalue()    
    print(f'PDF {file_name}, page {page_number} loaded as an image')
    return bytes_test

def load_image_as_byte(file_name):
    # load images
    with open(file_name, 'rb') as file:
        img_test = file.read()
        bytes_test = bytearray(img_test)
        print('Image loaded', file_name)
    return bytes_test

def get_table_csv_results(file_name):

    # If your file_name is an image, then use load_image_as_byte. If it is a pdf, then you can use use load_pdf_page_as_bytes, specifying a page_number.
    # bytes_test =  load_image_as_byte(file_name)
    bytes_test =  load_pdf_page_as_byte(file_name, page_number = 1)

    # process using image bytes
    # get the results
    client = boto3.client('textract', aws_access_key_id="AKIARTWPZA256ABBPBUR", aws_secret_access_key="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", region_name="ca-central-1")

    response = client.analyze_document(Document={'Bytes': bytes_test}, FeatureTypes=['TABLES'])

    # Get the text blocks
    blocks=response['Blocks']
    pprint(blocks)

    blocks_map = {}
    table_blocks = []
    for block in blocks:
        blocks_map[block['Id']] = block
        if block['BlockType'] == "TABLE":
            table_blocks.append(block)

    if len(table_blocks) <= 0:
        return "<b> NO Table FOUND </b>"

    csv = ''
    for index, table in enumerate(table_blocks):
        csv += generate_table_csv(table, blocks_map, index +1)
        csv += '\n\n'

    return csv

def generate_table_csv(table_result, blocks_map, table_index):
    rows = get_rows_columns_map(table_result, blocks_map)

    table_id = 'Table_' + str(table_index)
    
    # get cells.
    csv = 'Table: {0}\n\n'.format(table_id)

    for row_index, cols in rows.items():
        
        for col_index, text in cols.items():
            csv += '{}'.format(text) + ","
        csv += '\n'
        
    csv += '\n\n\n'
    return csv

def main(file_name):
    table_csv = get_table_csv_results(file_name)

    output_file = 'output.csv'

    # replace content
    with open(output_file, "wt") as fout:
        fout.write(table_csv)

    # show the results
    print('CSV OUTPUT FILE: ', output_file)


if __name__ == "__main__":
    file_name = "85010-pg4.pdf"
    main(file_name)