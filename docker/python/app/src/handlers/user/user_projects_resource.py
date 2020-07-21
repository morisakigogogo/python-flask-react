# coding: UTF-8
from flask import g, request
from flask_restful import Resource
from ...models import Project, db
from ...schemes import ProjectScheme
# from ...services import ProjectFiles
from flask_jwt_extended import (jwt_required)
from ...utils.utils import listUnderline2hump, get_res_data


class UserProjectsResource(Resource):
    @jwt_required
    def get(self, project_id=None):
        if project_id is None:
            id = ProjectScheme.get_cur_user_info(self)
            limit = int(request.args.get('pageSize'))
            offset = int(request.args.get('pageNumber'))
            offset = 0 if offset == 1 else (offset - 1) * limit

            projects = Project.query.filter(
                Project.user_id == id
            ).order_by(Project.id.desc()).limit(limit).offset(offset).all()
            count = Project.query.filter(Project.user_id == id).order_by(Project.id.desc()).count()
            _data = ProjectScheme().dump(projects, many=True)
            _list = listUnderline2hump(_data)
            page_info = {'pageSize': limit, 'total': count}
            data = {
                'list': _list,
                'pageInfo': page_info
            }
        else:
            project = Project.query.get(project_id)
            data = ProjectScheme().dump(project)
        return get_res_data(data=data), 200

    @jwt_required
    def post(self):
        data = request.get_json()
        res_title = data.get('title')
        id = ProjectScheme.get_cur_user_info(self)
        db.create(Project, title=res_title, user_id=id)
        project = Project.query.filter(Project.user_id == id).order_by(Project.id.desc()).first()
        if res_title == '':
            return g.get_res_data(rmg="タイトルがnullです"), 400
        # プロジェクトに使うファイルを作成とか
        # project_files_service = ProjectFiles(project)
        # project_files_service.create()

        projects = Project.query.filter(Project.user_id == id).order_by(Project.id.desc()).all()
        _data = ProjectScheme().dump(projects, many=True)
        data = listUnderline2hump(_data)
        return get_res_data(data=data), 200

    @jwt_required
    def put(self, project_id):
        g.abort_doesnt_exist(db, Project, Project.id, project_id)
        data = request.get_json()
        res_title = data.get("title")
        project = Project.query.filter(Project.id == project_id).first()

        if project is None:
            return g.get_res_data(rmg="プロジェクトが存在しません。"), 404
        project.title = res_title
        db.session.commit()

        project = Project.query.filter(Project.id == project_id).first()
        data = {**ProjectScheme().dump(project)}
        return g.get_res_data(rmg="編集しました。", data=data), 200

    @jwt_required
    def delete(self, project_id):
        g.abort_doesnt_exist(db, Project, Project.id, project_id)
        project = Project.query.get(project_id)
        if project is None:
            return g.get_res_data(rmg="プロジェクトが存在しません。"), 404
        db.session.delete(project)
        db.session.commit()
        return g.get_res_data(rmg="削除しました。"), 200
