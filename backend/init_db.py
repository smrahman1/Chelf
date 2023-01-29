import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


# Connect to an existing database
conn = psycopg2.connect(
    host=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD')
)


# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS pantry;')
# Execute a command: this creates a new table called pantry that has 6 columns and 1 row of data in it (id, name, quantity, unit, category, expiration_date). id is the primary key, unit can be null, and expiration_date has a default value of null.
cur.execute('CREATE TABLE pantry (id serial PRIMARY KEY,'
                                  'name varchar (150) NOT NULL,'                      
                                  'quantity decimal NOT NULL,'
                                  'unit varchar (50) NOT NULL,'
                                  'category varchar (50) NOT NULL,'
                                  'expiration_date date);'
                                  )

# Insert data into the table

cur.execute('INSERT INTO pantry (name, quantity, unit, category, expiration_date)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('apple', 2, 'kg', 'fruit', '2020-12-31')
            )

cur.execute('INSERT INTO pantry (name, quantity, unit, category, expiration_date)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('banana', 3, 'kg', 'fruit', '2020-12-31')
            )

cur.execute('INSERT INTO pantry (name, quantity, unit, category, expiration_date)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('orange', 4, 'kg', 'fruit', '2020-12-31')
            )


conn.commit()

cur.close()
conn.close()