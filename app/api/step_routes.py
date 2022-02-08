from flask import Blueprint, jsonify, request
from app.models import Step

step_routes = Blueprint('steps', __name__)


@step_routes.route("/<int:project_id>", methods=["GET"])
def get_steps(project_id):
    steps = [step.to_dict() for step in Step.query.filter(Step.project_id == project_id).all()]
    return jsonify(steps)
