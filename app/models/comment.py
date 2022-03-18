from .db import db
from datetime import datetime


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey(
        "projects.id"), nullable=False)
    step_id = db.Column(db.Integer)
    reply = db.Column(db.Integer)
    type = db.Column(db.String(8), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    author = db.relationship("User", back_populates="comment")
    project = db.relationship("Project", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "project_id": self.project_id,
            "step_id": self.step_id,
            "reply": self.reply,
            "type": self.type,
            "content": self.content,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def to_JSON(self):
        return {
            "id": self.id,
            "authorId": self.author_id,
            "projectId": self.project_id,
            "stepId": self.step_id,
            "reply": self.reply,
            "type": self.type,
            "content": self.content,
            "author": self.author.to_JSON(),
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
