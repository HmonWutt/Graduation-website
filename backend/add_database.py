import string
import sqlite3
import random

with open("invite.txt", 'r') as file:
    lines = file.readlines()

alphabet = string.ascii_letters
con = sqlite3.connect("form.sql")
curser = con.cursor()
for username in lines:
    username = username.strip()
    password = "".join(random.choices(alphabet, k=8))
    query = "INSERT INTO form (username, password) VALUES(?, ?);"
    curser.execute(query, (username, password))

con.commit()
con.close()
