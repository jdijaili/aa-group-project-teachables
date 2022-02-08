from flask import Blueprint, jsonify, request
from app.models import db, Category

category_routes = Blueprint("categories", __name__)

@category_routes.route("/", methods=["GET"])
def get_categories():
    categories = [category.to_dict() for category in Category.query.all()]
    return jsonify(categories)
