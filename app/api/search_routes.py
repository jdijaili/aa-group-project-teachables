from flask import Blueprint
from app.models import db, Project
from app.forms.search_form import SearchForm

search_routes = Blueprint("search", __name__)

@search_routes.route("/<string:query>(\\w+)", methods=["POST"])
def search_projects():
    form = SearchForm()

    if form.validate_on_submit():
        search_query = form.data['search']
