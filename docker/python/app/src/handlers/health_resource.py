from flask import jsonify
from flask_restful import Resource


class HealthResource(Resource):

    def get(self):
        res = {'success': True, 'message': 'health check ok.......'}
        return jsonify(res)
