from flask import Blueprint, jsonify
from app.models import Project
from app.forms.search_form import SearchForm

search_routes = Blueprint("search", __name__)

@search_routes.route("/<string:query>(\\w+)")
def search_projects():
    form = SearchForm()

    if form.validate_on_submit():
        search_query = form.data['search']
        search_results = Project.query.filter(Project.title.ilike(f'%{search_query}%')).all()
        return jsonify([project.to_JSON() for project in search_results])
