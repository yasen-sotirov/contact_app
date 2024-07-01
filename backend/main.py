# CRUD APP  create, read, update, delete
# сървъра държи APIто на локалната машина url: localhost:5000/home

from flask import request, jsonify
from config import app, db
from models import Contact



# ALL CONTACTS
@app.get("/contacts")     # decorator     изпуснат метод get
def get_contacts():
    contacts = Contact.query.all()          # ORМ взема всички контакти
    json_contacts = list(map(lambda x: x.to_json(), contacts))    # вместо for loop итерира през всички контакти и подава на to_json
    return jsonify({"contacts": json_contacts})     # връща dict с key "contacts"



# CREATE CONTACT
@app.post("/create_contact")
def create_contact():
    print("hello")
    first_name = request.json.get("firstName")      # get проверява дали го има
    last_name = request.json.get("lastName")        
    email = request.json.get("email")
    print(first_name, last_name, email)               

    if not first_name or not last_name or not email:
        return jsonify({"message" : "You must include first name, last name and email"}, 400)   # 400= bad request
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message" : str(e)}), 400
    
    # ако е минало
    return jsonify({"message" : "User created!"}), 201      # 201 == created



# UPDATE
@app.route("/update_contact/<int:user_id>")
def update_contact(user_id):
    contact = Contact.query.get(user_id)        # ORM-а праща query до db дали има това id
    if not contact:
        return jsonify({"message" : "User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)  # get("ако го има, го запазва", "ако няма слага това0")
    contact.last_name = data.get("lastName", contact.last_name)  
    contact.email = data.get("email", contact.email)  
    
    db.session.commit()     # само commit, защото вече го има
    return jsonify({"message" : "User updated"}), 200



# DELETE
@app.route("/delete_contact/<int:user_id>")
def delete_contact(user_id):
    contact = Contact.query.get(user_id)        # ORM-а праща query до db дали има това id
    if not contact:
        return jsonify({"message" : "User not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message" : "User deleted"}), 200



# RUN FILE
if __name__=="__main__":        # пречи импортнатият код да се изпълни автоматично
    with app.app_context():
        db.create_all()         # създава самата дата база
    app.run(debug=True)

# стартиране от терминала: python3 main.py
 
# https://youtu.be/PppslXOR7TA?t=2668