from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/<int:project_id>", methods=["GET"])
def get_comments(project_id):
    comments = [comment.to_dict() for comment in Comment.query.filter(
        Comment.project_id == project_id).all()]
    return jsonify(comments)

@comment_routes.route("/", methods=["POST"])
@login_required
def post_comment():
    comment = Comment(
        author_id=request.json["author_id"],
        project_id=request.json["project_id"],
        step_id=request.json["step_id"],
        reply=request.json["reply"],
        type= request.json["type"],
        content= request.json["content"]
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict())

@comment_routes.route('/', methods=["PUT"])
@login_required
def put_comment():
    id = request.json["id"]
    db.session.query(Comment).filter(Comment.id == id).update({
        "author_id": request.json["author_id"],
        "project_id": request.json["project_id"],
        "step_id": request.json["step_id"],
        "reply": request.json["reply"],
        "type": request.json["type"],
        "content": request.json["content"],
        "updated_at": datetime.now()
    }, synchronize_session="fetch")
    db.session.commit()
    return jsonify(Comment.query.get(id).to_dict())


@comment_routes.route('/', methods=["DELETE"])
@login_required
def delete_comment():
    db.session.query(Comment).filter(Comment.id == request.json["id"]).delete(
        synchronize_session="fetch")
    db.session.commit()
    return jsonify({"errors": False})