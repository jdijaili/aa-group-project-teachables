from datetime import datetime
from flask import Blueprint, jsonify, request
from app.models import db, Step

step_routes = Blueprint('steps', __name__)


@step_routes.route("/<int:project_id>", methods=["GET"])
def get_steps(project_id):
    steps = [step.to_dict() for step in Step.query.filter(
        Step.project_id == project_id).all()]
    return jsonify(steps)


@step_routes.route("/", methods=["POST"])
def post_step():
    project_id = request.json["project_id"]
    prev_steps = [step for step in Step.query.filter(
        Step.project_id == project_id).all()]
    step = Step(
        project_id=project_id,
        step_number=len(prev_steps),
        title=request.json["title"],
        description=request.json["description"],
        image=request.json["image"]
    )
    db.session.add(step)
    db.session.commit()
    return jsonify(step.to_dict())


@step_routes.route("/", methods=["PUT"])
def put_step():
    id = request.json["id"]
    db.session.query(Step).filter(Step.id == id).update({
        "title": request.json["title"],
        "description": request.json["description"],
        "image": request.json["image"],
        "updated_at": datetime.now()
    }, synchronize_session="fetch")
    return jsonify(Step.query.get(id).to_dict())


@step_routes.route("/", methods=["DELETE"])
def delete_step():
    step = db.session.query(Step).filter(Step.id == request.json["id"])
    # for later_step in db.session.query(Step).all(): #TODO #64 cascading step number adjustment
    #     later_step_dict = later_step.to_dict()
    #     step_dict = step.to_dict()
    #     if later_step_dict["project_id"] == step_dict["project_id"] and later_step_dict["step_number"] > step_dict["step_number"]:
    #         later_step.update({
    #             "step_number": later_step_dict["step_number"] - 1
    #         }, synchronize_session="fetch")
    step.delete(synchronize_session="fetch")
    return jsonify({"errors": False})
