from flask import Blueprint, jsonify, request
from app.models import db, Project

category_routes = Blueprint("categories", __name__)

@category_routes.route('/<int:id>', methods=['GET'])
def get_projects_by_category(id):
    projects = Project.query.filter(Project.category_id == request.json["id"]).all()
    return projects
