from flask import Blueprint
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    return {'users': [user.to_JSON() for user in User.query.all()]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    return User.query.get(id).to_JSON()
