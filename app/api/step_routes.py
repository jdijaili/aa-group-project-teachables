from flask import Blueprint, jsonify, request
from app.models import Step
from app.models import db

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
