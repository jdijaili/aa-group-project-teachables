from flask import Blueprint, jsonify, make_response, request
from app.models import db, Step

step_routes = Blueprint('steps', __name__)


@step_routes.route("/<int:project_id>", methods=["GET"])
def get_steps(project_id):
    return jsonify([step.to_JSON() for step in Step.query.filter(
        Step.project_id == project_id).all()])


@step_routes.route("/", methods=["POST"])
def post_step():
    project_id = request.json["project_id"]
    step = Step(
        project_id=project_id,
        step_number=request.json["step_number"],
        title=request.json["title"],
        description=request.json["description"],
        image=request.json["image"]
    )
    db.session.add(step)
    db.session.commit()
    return step.to_JSON()


@step_routes.route("/", methods=["PUT"])
def put_step():
    id = request.json["id"]
    db.session.query(Step).filter(Step.id == id).update({
        "title": request.json["title"],
        "description": request.json["description"],
        "image": request.json["image"]
    }, synchronize_session="fetch")
    db.session.commit()
    step = Step.query.get(id)
    if step:
        return step.to_JSON()
    else:
        return make_response({"errors": ["Edit on non-existent step"]}, 404)


@step_routes.route("/", methods=["DELETE"])
def delete_step():
    step_id = request.json["id"]
    step = Step.query.get(step_id)
    if step:
        step_dict = step.to_dict()
        for later_step in db.session.query(Step).all():
            later_step_dict = later_step.to_dict()
            if later_step_dict["project_id"] == step_dict["project_id"] and later_step_dict["step_number"] > step_dict["step_number"]:
                db.session.query(Step).filter(Step.id == later_step_dict["id"]).update({
                    "step_number": later_step_dict["step_number"] - 1
                }, synchronize_session="fetch")
        db.session.query(Step).filter(Step.id == step_id).delete(
            synchronize_session="fetch")
        db.session.commit()
        return {"errors": False}
    else:
        return make_response({"errors": ["Delete on non-existent step"]}, 404)
