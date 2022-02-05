from .db import db


class Step(db.Model):
    __tablename__ = "steps"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(
        "projects.id"), nullable=False)
    step_number = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String)

    project = db.relationship("Project", back_populates="step")

    def to_dict(self):
        return {
            "id": self.id,
            "project_id": self.project_id,
            "step_number": self.step_number,
            "title": self.title,
            "description": self.description,
            "image": self.image
        }
