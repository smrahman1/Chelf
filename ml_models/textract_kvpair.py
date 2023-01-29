import boto3
import sys
import re
import json
from collections import defaultdict

import io
import pdf2image


"""
 The following was used as a source for code:
 https://docs.aws.amazon.com/textract/latest/dg/examples-extract-kvp.html
 
 This is short demo on how to extract the KEY-VALUE PAIRS using textract analyze_document.
 
 NOTE:
 * This code uses textract's analyze_document.
 * Textract analyze_document and textract analyze_expense are DIFFERENT.
 * Textract analyze_expsense calls the textract model trained on INVOICES ONLY and will provide different results than textract analyze_document. 
 * Textract analyze_document calls the textract model trained on ANY TYPE OF DOCUMENT.

"""


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

def get_kv_map(file_name):
    
    # If your file_name is an image, then use load_image_as_byte. If it is a pdf, then you can use use load_pdf_page_as_bytes, specifying a page_number.
    # bytes_test =  load_image_as_byte(file_name)
    bytes_test =  load_pdf_page_as_byte(file_name, page_number = 1)
    
    # process using image bytes
    client = boto3.client('textract', aws_access_key_id="AKIA6MZEBQT46D2DWPWU", aws_secret_access_key="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", region_name="ca-central-1")
    response = client.analyze_document(Document={'Bytes': bytes_test}, FeatureTypes=['FORMS'])

    # Get the text blocks
    blocks = response['Blocks']

    # get key and value maps
    key_map = {}
    value_map = {}
    block_map = {}
    for block in blocks:
        block_id = block['Id']
        block_map[block_id] = block
        if block['BlockType'] == "KEY_VALUE_SET":
            if 'KEY' in block['EntityTypes']:
                key_map[block_id] = block
            else:
                value_map[block_id] = block

    return key_map, value_map, block_map


def get_kv_relationship(key_map, value_map, block_map):
    kvs = defaultdict(list)
    for block_id, key_block in key_map.items():
        value_block = find_value_block(key_block, value_map)
        key = get_text(key_block, block_map)
        val = get_text(value_block, block_map)
        kvs[key].append(val)
    return kvs


def find_value_block(key_block, value_map):
    for relationship in key_block['Relationships']:
        if relationship['Type'] == 'VALUE':
            for value_id in relationship['Ids']:
                value_block = value_map[value_id]
    return value_block


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
                        if word['SelectionStatus'] == 'SELECTED':
                            text += 'X '

    return text


def print_kvs(kvs):
    for key, value in kvs.items():
        print(key, ":", value)


def search_value(kvs, search_key):
    for key, value in kvs.items():
        if re.search(search_key, key, re.IGNORECASE):
            return value


def main(file_name):
    key_map, value_map, block_map = get_kv_map(file_name)

    # Get Key Value relationship
    kvs = get_kv_relationship(key_map, value_map, block_map)
    print("\n\n== FOUND KEY : VALUE pairs ===\n")
    print_kvs(kvs)

    # Start searching a key value
    while input('\n Do you want to search a value for a key? (enter "n" for exit) ') != 'n':
        search_key = input('\n Enter a search key:')
        print('The value is:', search_value(kvs, search_key))

if __name__ == "__main__":
    file_name = "85010-pg4.pdf"
    main(file_name)