# coding: UTF-8
import os
import glob
import shutil
from flask import g, request
from flask_restful import Resource
from ...models import Project, db
from flask_jwt_extended import (jwt_required)
from ...utils.utils import get_res_data
# from ...services import GoogleCloudStorage


def get_review_url(project_id):
    return 'https://storage.googleapis.com/python-react/local/' + str(project_id) + '/index.html'


def down_files(project_id):
    pass
    # template_dir = 'src/assets/project_templates/getFiles/' + str(project_id)
    # os.makedirs(template_dir)
    # gcs = GoogleCloudStorage()
    # gcs.download_blob(str(project_id) + '/main.js', template_dir + '/main.js')
    # gcs.download_blob(str(project_id) + '/index.html', template_dir + '/index.html')
    # gcs.download_blob(str(project_id) + '/style.css', template_dir + '/style.css')
    # project_main = open(template_dir + '/main.js', 'r+')
    # project_index = open(template_dir + '/index.html', 'r+')
    # project_css = open(template_dir + '/style.css', 'r+')
    # main = project_main.read()
    # index = project_index.read()
    # style = project_css.read()
    # project_main.close()
    # project_index.close()
    # project_css.close()
    # get_files_dir = os.getcwd() + '/src/assets/project_templates/getFiles/' + str(project_id)
    # shutil.rmtree(os.path.join(get_files_dir))
    # return {'main': main, 'index': index, 'style': style}


class UserProjectFilesResource(Resource):
    @jwt_required
    def get(self, project_id):
        url = get_review_url(project_id)
        files = down_files(project_id)
        return get_res_data(data={'reviewUrl': url, **files}), 200

    @jwt_required
    def put(self, project_id):
        pass
        # g.abort_doesnt_exist(db, Project, Project.id, project_id)
        # data = request.get_json()
        # res_source = data.get("source")

        # template_dir = 'src/assets/project_templates/enchantjs1'

        # project_dir = os.getcwd() + '/tmp/' + str(project_id)
        # shutil.copytree(template_dir, project_dir)
        # project_main = open(project_dir + '/' + 'main.js', 'w+')
        # project_index = open(project_dir + '/' + 'index.html', 'w+')
        # project_css = open(project_dir + '/' + 'style.css', 'w+')
        # project_main.write(res_source['1'])
        # project_index.write(res_source['2'])
        # project_css.write(res_source['3'])
        # project_main.close()
        # project_index.close()
        # project_css.close()

        # gcs = GoogleCloudStorage()
        # files = glob.glob(project_dir + "/**", recursive=True)
        # for file in files:
        #     f = file.replace(project_dir + '/', '')
        #     gcs.upload(str(project_id) + '/' + f, file)
        # shutil.rmtree(os.path.join(project_dir))
        # url = get_review_url(project_id)
        # return g.get_res_data(rmg="プロジェクトが実行しました。", data={'reviewUrl': url}), 200
