from flask import jsonify
from flask_restful import Resource
from ..models import Project
from ..schemes import ProjectScheme


class HealthDbResource(Resource):

    def get(self):
        project = Project.query.filter(Project.id == 1).first()
        print(project)
        res = {'success': True, 'data': ProjectScheme().dump(project)}
        return jsonify(res)
