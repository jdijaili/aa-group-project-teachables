from datetime import datetime
from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route("/<int:project_id>", methods=["GET"])
def get_comments(project_id):
    comments = [comment.to_JSON() for comment in Comment.query.filter(
        Comment.project_id == project_id).all()]
        
    return jsonify(comments)


@comment_routes.route("/", methods=["POST"])
@login_required
def post_comment():
    print('did we make it backend')
    comment = Comment(
        author_id=request.json["author_id"],
        project_id=request.json["project_id"],
        step_id=request.json["step_id"],
        reply=request.json["reply"],
        type=request.json["type"],
        content=request.json["content"]
    )
    print('here is the new comment', comment)
    db.session.add(comment)
    db.session.commit()
    return comment.to_JSON()


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
    comment = Comment.query.get(id)
    if comment:
        return comment.to_JSON()
    else:
        return make_response({"errors": ["Edit on non-existent comment"]})


@comment_routes.route('/', methods=["DELETE"])
@login_required
def delete_comment():
    comment_id = request.json["id"]
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.query(Comment).filter(Comment.id == comment_id).delete(
            synchronize_session="fetch")
        db.session.commit()
        return {"errors": False}
    else:
        return make_response({"errors": ["Delete on non-existent comment"]})
