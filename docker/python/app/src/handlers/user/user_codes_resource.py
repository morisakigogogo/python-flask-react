from flask_restful import Resource
from ...utils.utils import get_res_data


class UserCodesResource(Resource):

    def get(self, user_id):
        return get_res_data(), 200

    def patch(self, user_id):
        return get_res_data(), 200
