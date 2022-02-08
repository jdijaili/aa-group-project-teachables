from datetime import datetime
from flask import Blueprint, jsonify, request
from app.models import db, Project

project_routes = Blueprint("projects", __name__)

@project_routes.route("/", methods=["GET"])
def get_projects():
    projects = [project.to_dict() for project in Project.query.all()]
    return jsonify(projects)

@project_routes.route("/", methods=["POST"])
def post_project():
    project = Project(user_id=request.json["user_id"],
	title=request.json["title"],
	description=request.json["description"],
	category_id=request.json["category_id"],
	views=0,
	favorites=0,
	supplies_text=request.json["supplies_text"],
	supplies_image=request.json["supplies_image"],
	created_at=datetime.now(),
	updated_at=datetime.now())
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict())

# @project_routes.route("/", methods=["PUT"])
# def put_project():
#     pass

# @project_routes.route("/", methods=["DELETE"])
# def delete_project():
#     pass
