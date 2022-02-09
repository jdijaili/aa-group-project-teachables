from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length

class StepForm(FlaskForm):
    step_number = IntegerField("Step Number")
    title = StringField("Title", validators=[DataRequired(message='This field must not be left blank.')])
    description = TextAreaField("Description", validators=[DataRequired(message='This field must not be left blank.')])
    image = StringField("Image")
