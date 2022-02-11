from random import choices
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length

class PublishForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(message='This field must not be left blank.'), Length(max=50, message='Title must not be greater than 50 character.')])
    description = TextAreaField("Description", validators=[DataRequired(message='This field must not be left blank.')])
    category_id = SelectField("Category", choices=[(1, 'Chess Openings'), (2, 'Game Development'), (3, 'Jewelry Design'), (4, 'Knitting')], coerce=int, validators=[DataRequired(message='This field must not be left blank.')])
    supplies_text = TextAreaField("Supplies")
    supplies_image = StringField("Supplies Image")
