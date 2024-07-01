from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)   # създава аппа
CORS(app)               # изключва грешка
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"     # задава база данни
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False                # спира тракинга

db = SQLAlchemy(app)
