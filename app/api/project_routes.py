from flask import Blueprint, jsonify, request
from app.models import db, Project

project_routes = Blueprint("projects", __name__)

@project_routes.route("/", methods=["GET"])
def get_projects():
    projects = [project.to_dict() for project in Project.query.all()]
    return jsonify(projects)

# @project_routes.route("/", methods=["POST"])
# def post_project():
#     print(request.json)
#     return jsonify({})

# @project_routes.route("/", methods=["PUT"])
# def put_project():
#     pass

# @project_routes.route("/", methods=["DELETE"])
# def delete_project():
#     pass
