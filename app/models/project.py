from .db import db
from datetime import datetime

class Project(db.Model):
	__tablename__ = "projects"

	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
	title = db.Column(db.String(50), nullable=False)
	description = db.Column(db.Text, nullable=False)
	category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
	views = db.Column(db.Integer, nullable=False, default=0)
	favorites = db.Column(db.Integer, nullable=False, default=0)
	supplies_text = db.Column(db.Text)
	supplies_image = db.Column(db.String)
	created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
	updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

	user = db.relationship("Project", back_populates="author")
	category = db.relationship("Category", back_populates="projects")
	step = db.relationship("Step", back_populates="project")

	def to_dict(self):
		return {
			"id": self.id,
			"user_id": self.user_id,
			"title": self.title,
			"description": self.description,
			"category_id": self.category_id,
			"views": self.views,
			"favorites": self.favorites,
			"supplies_text": self.supplies_text,
			"supplies_image": self.supplies_image,
			"created_at": self.created_at,
			"updated_at": self.updated_at
		}
