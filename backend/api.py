from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from main import generate_recipe

import json
import os
from dotenv import load_dotenv
import psycopg2

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
            cur.execute("SELECT * FROM pantry WHERE name = %s", (item['name'],))
            rows = cur.fetchall()
            if len(rows) > 0:
                cur.execute("UPDATE pantry SET quantity = quantity + %s WHERE name = %s", (item['quantity'], item['name'],))
            else:
                cur.execute("INSERT INTO pantry (name, quantity, unit, category, expiration_date) VALUES (%s, %s, %s, %s, %s)", (item['name'], item['quantity'], item['unit'], item['category'], item['expiration_date']))
        conn.commit()
        cur.close()

        return {'status': 'success'}

class removeItem(Resource):
    def post(self):
        cur = conn.cursor()
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
                'data': json.dumps(rows, default=str, sort_keys=True)}
        
  
api.add_resource(generateRecipe, '/generateRecipe')
api.add_resource(addItems, '/addItems')
api.add_resource(removeItem, '/removeItem')
api.add_resource(updateItem, '/updateItem')
api.add_resource(getAllItems, '/getAllItems')

if __name__ == '__main__':
    app.run(debug=True)