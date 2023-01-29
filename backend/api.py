from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from main import generate_recipe, decode_and_save
from ml_models.textract_expense import main

import json
import os
from dotenv import load_dotenv
import psycopg2
import math

load_dotenv()

app = Flask(__name__)
api = Api(app)
CORS(app)


conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)

class generateRecipe(Resource):
    def get(self):
        cur = conn.cursor()
        cur.execute("SELECT name, quantity, unit FROM pantry")
        rows = cur.fetchall()
        cur.close()
        JSON_RESPONSE = {}
        for row in rows:
            JSON_RESPONSE[row[0]] = {
                'quantity': row[1],
                'unit': row[2]
            }

        data = generate_recipe(JSON_RESPONSE)
        return {'status': 'success', 'data': data}
    
class addItems(Resource):
    def post(self):
        cur = conn.cursor()
        for item in request.json:
            print(item)
            cur.execute("SELECT * FROM pantry WHERE name = %s", (item['name'],))
            rows = cur.fetchall()
            if len(rows) > 0:
                cur.execute("UPDATE pantry SET quantity = quantity + %s WHERE name = %s", (item['quantity'], item['name'],))
            else:
                cur.execute("INSERT INTO pantry (name, quantity, unit, category) VALUES (%s, %s, %s, %s)", (item['name'], item['quantity'], item['unit'], item['category'].lower()))
        conn.commit()
        cur.close()

        return {'status': 'success'}
class removeItem(Resource):
    def post(self):
        cur = conn.cursor()
        print(request.json['name'])
        cur.execute("DELETE FROM pantry WHERE name = %s", (request.json['name'],))
        conn.commit()
        cur.close()

        return {'status': 'success'}

class updateItem(Resource):
    def post(self):
        cur = conn.cursor()
        if request.json['increment']:
            cur.execute("UPDATE pantry SET quantity = quantity + 1 WHERE name = %s", (request.json['name'],))
        else:
            cur.execute("UPDATE pantry SET quantity = quantity - 1 WHERE name = %s", (request.json['name'],))
        conn.commit()
        cur.close()

        return {'status': 'success'}

class getAllItems(Resource):
    def get(self):
        cur = conn.cursor()
        cur.execute("SELECT name, quantity, unit, category FROM pantry")
        rows = cur.fetchall()
        cur.close()

        return {'status': 'success',
                'data': rows}
    
class getByCategory(Resource):
    def post(self):
        cur = conn.cursor()
        cur.execute("SELECT name, quantity, unit FROM pantry WHERE category = %s", (request.json['category'].lower(),))
        rows = cur.fetchall()
        cur.close()

        return {'status': 'success',
                'data': rows}
    
class scanReceipt(Resource):
    def post(self):
        decode_and_save(request.json['image'])
        data = main()
        print(data)
        cur = conn.cursor()
        for item in data:
            print(item)
            index_split = 0 
            if math.isnan(item['amount']):
                item['amount'] = "1kg"

            for i in range(len(item['amount'])):
                if ('0' > item['amount'][i] or item['amount'][i] > '9') and item['amount'][i] != '.' :
                    index_split = i
                    break
            cur.execute("SELECT * FROM pantry WHERE name = %s", (item['item'],))
            rows = cur.fetchall()
            if len(rows) > 0:
                cur.execute("UPDATE pantry SET quantity = quantity + %s WHERE name = %s", (float(item['amount'][:index_split]), item['item'],))
            else:
                cur.execute("INSERT INTO pantry (name, quantity, unit, category) VALUES (%s, %s, %s, %s)", (item['item'], float(item['amount'][:index_split]), item['amount'][index_split:], item['category'].lower()))
        conn.commit()
        cur.close()
        return {'status': 'success', 'data': data}
        


    
    
        
  
api.add_resource(generateRecipe, '/generateRecipe')
api.add_resource(addItems, '/addItems')
api.add_resource(removeItem, '/removeItem')
api.add_resource(updateItem, '/updateItem')
api.add_resource(getAllItems, '/getAllItems')
api.add_resource(getByCategory, '/getByCategory')
api.add_resource(scanReceipt, '/scanReceipt')

if __name__ == '__main__':
    app.run(debug=True)