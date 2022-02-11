from datetime import datetime
from flask import Blueprint, jsonify, make_response, request
from app.models import db, Project

project_routes = Blueprint("projects", __name__)


@project_routes.route("/", methods=["GET"])
def get_projects():
    return jsonify([project.to_JSON() for project in Project.query.all()])


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
                      project_image=request.json["project_image"],
                      created_at=datetime.now(),
                      updated_at=datetime.now())
    db.session.add(project)
    db.session.commit()
    return project.to_JSON()


@project_routes.route("/", methods=["PUT"])
def put_project():
    db.session.query(Project).filter(Project.id == request.json["id"]).update({
        "title": request.json["title"],
        "description": request.json["description"],
        "category_id": request.json["category_id"],
        "supplies_text": request.json["supplies_text"],
        "supplies_image": request.json["supplies_image"],
        "project_image": request.json["project_image"],
        "updated_at": datetime.now()
    }, synchronize_session="fetch")
    db.session.commit()
    project = Project.query.get(request.json["id"])
    if project:
        return project.to_JSON()
    else:
        return make_response({"errors": ["Edit on non-existent project"]}, 404)


@project_routes.route("/", methods=["DELETE"])
def delete_project():
    project_id = request.json["id"]
    project = Project.query.get(project_id)
    if project:
        db.session.delete(project)
        db.session.commit()
        return {"errors": False}
    else:
        return make_response({"errors": ["Delete on non-existent project"]}, 404)
