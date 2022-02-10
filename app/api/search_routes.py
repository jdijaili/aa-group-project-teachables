from flask import Blueprint, jsonify
from app.models import Project

search_routes = Blueprint("search", __name__)

@search_routes.route("/<string:query>")
def search_projects(query):
    search_results = Project.query.filter(Project.title.ilike(f'%{query}%')).all()
    print(search_results)
    return jsonify([project.to_JSON() for project in search_results])
