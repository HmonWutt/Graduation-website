import string
import sqlite3
import random

with open("invite.txt", 'r') as file:
    lines = file.readlines()

alphabet = string.ascii_letters
for username in lines:
    username = username.strip()
    random_string = "".join(random.choices(alphabet, k=8))
    print(f"{username}: {random_string}")
