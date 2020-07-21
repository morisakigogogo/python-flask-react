import os
import csv
from ..models import db, Document


class MasterDataImporter:

    def __init__(self):
        self.master_data_dir = os.getcwd() + "/src/master_data"
        pass

    def import_documents(self):
        print("")
        print("* import document data")
        print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
        csv_path = self.master_data_dir + "/master_data_documents.csv"
        with open(csv_path) as f:
            rows = csv.reader(f)
            scheme = next(rows)
            # descriptions = next(rows)
            next(rows)  # description使う場合はこの行いらない
            for row in rows:
                self.create_or_update_documents(scheme, row)

    def create_or_update_documents(self, scheme, data):
        item = {}
        for i in range(len(data)):
            item[scheme[i]] = data[i]
        document = db.session.query(Document).filter(Document.id == int(item['id'])).first()

        # markdown
        document_id = item.get("id")
        markdown_path = self.master_data_dir + "/documents/" + document_id + ".md"
        if not os.path.exists(markdown_path):
            with open(markdown_path, 'w'):
                pass
        with open(markdown_path) as f:
            content = f.read()

        if document is None:
            document = Document()
            document.id = item.get('id')
            document.title = item.get('title')
            document.description = item.get('description')
            document.content = content
            document.type = item.get('type')
            document.video_url = item.get('video_url')
            document.thumbnail_url = item.get('thumbnail_url')
            document.order = item.get('order')
            db.session.add(document)
            db.session.commit()
        else:
            document.id = item.get('id')
            document.title = item.get('title')
            document.description = item.get('description')
            document.content = content
            document.type = item.get('type')
            document.video_url = item.get('video_url')
            document.thumbnail_url = item.get('thumbnail_url')
            document.order = item.get('order')
            db.session.commit()

    # def import_courses(self):
    #     print("")
    #     print("* import course data")
    #     print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
    #     csv_path = self.master_data_dir + "/master_data_courses.csv"
    #     with open(csv_path) as f:
    #         rows = csv.reader(f)
    #         scheme = next(rows)
    #         # descriptions = next(rows)
    #         next(rows)  # description使う場合はこの行いらない
    #         for row in rows:
    #             self.create_or_update_courses(scheme, row)

    # @staticmethod
    # def create_or_update_courses(scheme, data):
    #     item = {}
    #     for i in range(len(data)):
    #         item[scheme[i]] = data[i]
    #     course = db.session.query(Course).filter(Course.id == int(item['id'])).first()

    #     if course is None:
    #         course = Course()
    #         course.id = item.get('id')
    #         course.title = item.get('title')
    #         course.description = item.get('description')
    #         course.color = item.get('color')
    #         course.order = item.get('order')
    #         db.session.add(course)
    #         db.session.commit()
    #     else:
    #         course.id = item.get('id')
    #         course.title = item.get('title')
    #         course.description = item.get('description')
    #         course.color = item.get('color')
    #         course.order = item.get('order')
    #         db.session.commit()

    # def import_lessons(self):
    #     print("")
    #     print("* import lesson data")
    #     print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
    #     csv_path = self.master_data_dir + "/master_data_lessons.csv"
    #     with open(csv_path) as f:
    #         rows = csv.reader(f)
    #         scheme = next(rows)
    #         # descriptions = next(rows)
    #         next(rows)  # description使う場合はこの行いらない
    #         for row in rows:
    #             self.create_or_update_lessons(scheme, row)

    # @staticmethod
    # def create_or_update_lessons(scheme, data):
    #     item = {}
    #     for i in range(len(data)):
    #         item[scheme[i]] = data[i]
    #     lesson = db.session.query(Lesson).filter(Lesson.id == int(item['id'])).first()

    #     if lesson is None:
    #         lesson = Lesson()
    #         lesson.id = item.get('id')
    #         lesson.title = item.get('title')
    #         lesson.description = item.get('description')
    #         lesson.order = item.get('order')
    #         db.session.add(lesson)
    #         db.session.commit()
    #     else:
    #         lesson.id = item.get('id')
    #         lesson.title = item.get('title')
    #         lesson.description = item.get('description')
    #         lesson.order = item.get('order')
    #         db.session.commit()

    def import_studies(self):
        print("")
        print("* import study data")
        print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
        csv_path = self.master_data_dir + "/master_data_studies.csv"
        with open(csv_path) as f:
            rows = csv.reader(f)
            scheme = next(rows)
            # descriptions = next(rows)
            next(rows)  # description使う場合はこの行いらない
            for row in rows:
                self.create_or_update_studies(scheme, row)

    # @staticmethod
    # def create_or_update_studies(scheme, data):
    #     item = {}
    #     for i in range(len(data)):
    #         item[scheme[i]] = data[i]
    #     study = db.session.query(Study).filter(Study.id == int(item['id'])).first()

    #     if study is None:
    #         study = Study()
    #         study.id = item.get('id')
    #         study.title = item.get('title')
    #         study.description = item.get('description')
    #         study.order = item.get('order')
    #         db.session.add(study)
    #         db.session.commit()
    #     else:
    #         study.id = item.get('id')
    #         study.title = item.get('title')
    #         study.description = item.get('description')
    #         study.order = item.get('order')
    #         db.session.commit()

    # def import_questions(self):
    #     print("")
    #     print("* import question data")
    #     print("-*-*-*-*-*-*-*-*-*-*-*-*-*")
    #     csv_path = self.master_data_dir + "/master_data_questions.csv"
    #     with open(csv_path) as f:
    #         rows = csv.reader(f)
    #         scheme = next(rows)
    #         # descriptions = next(rows)
    #         next(rows)  # description使う場合はこの行いらない
    #         for row in rows:
    #             self.create_or_update_questions(scheme, row)

    # @staticmethod
    # def create_or_update_questions(scheme, data):
    #     item = {}
    #     for i in range(len(data)):
    #         item[scheme[i]] = data[i]
    #     question = db.session.query(Question).filter(Question.id == int(item['id'])).first()

    #     if question is None:
    #         question = Question()
    #         question.id = item.get('id')
    #         question.title = item.get('title')
    #         question.description = item.get('description')
    #         question.study_id = item.get('study_id')
    #         question.no = item.get('no')
    #         question.order = item.get('order')
    #         db.session.add(question)
    #         db.session.commit()
    #     else:
    #         question.id = item.get('id')
    #         question.title = item.get('title')
    #         question.description = item.get('description')
    #         question.study_id = item.get('study_id')
    #         question.no = item.get('no')
    #         question.order = item.get('order')
    #         db.session.commit()
