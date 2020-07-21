# coding: UTF-8
from flask import request
from flask_restful import Resource
from flask_jwt_extended import (jwt_required)
from ...utils.utils import get_res_data
import os
from werkzeug import secure_filename
# from ...services import GoogleCloudStorage


class UserProjectAssetsResource(Resource):
    @jwt_required
    def get(self, project_id):
        pass
        # gcs = GoogleCloudStorage()
        # list = gcs.get_list()
        # return get_res_data(data=list), 200

    @jwt_required
    def post(self, project_id):
        # file = request.files['file']
        # if file:
        #     filename = secure_filename(file.filename)
        #     file.save(os.path.join('src/assets/uploadfile', filename))
        #     gcs = GoogleCloudStorage()
        #     gcs.upload(filename, os.path.join('src/assets/uploadfile', filename))
        #     list = gcs.get_list()
        #     return get_res_data(rmg="アップロード成功しました", data=list), 200
        return get_res_data(rmg="ファイルの形式が不正です。"), 200
