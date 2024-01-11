from flask import Flask, jsonify, request
from flask_cors import CORS  
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app) 

##Folio3 Office IP WIFI
client = MongoClient("mongodb://10.210.66.251:27018")
db = client["bookstore"]
books_collection = db["books"]

@app.route('/books', methods=['POST'])
def create_book():
    if isinstance(request.json, list):
        books = request.json
        result = books_collection.insert_many(books)
        return jsonify([str(book_id) for book_id in result.inserted_ids]), 201
    else:  # Single book add
        book = request.json
        result = books_collection.insert_one(book)
        return jsonify(str(result.inserted_id)), 201

@app.route('/books', methods=['GET'])
def get_books():
    books = list(books_collection.find({}))
    for book in books:
        book["_id"] = str(book["_id"])
    return jsonify(books), 200

@app.route('/books/<id>', methods=['GET'])
def get_book(id):
    book = books_collection.find_one({"_id": ObjectId(id)})
    if book:
        book["_id"] = str(book["_id"])
        return jsonify(book), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books/<id>', methods=['PUT'])
def update_book(id):
    updated_book = request.json
    books_collection.update_one({"_id": ObjectId(id)}, {"$set": updated_book})
    return jsonify({"message": "Book updated"}), 200

@app.route('/books/<id>', methods=['DELETE'])
def delete_book(id):
    result = books_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Book deleted"}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello, World!"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
