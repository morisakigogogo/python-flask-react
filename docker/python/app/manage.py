import os
import sys
import glob
import subprocess
from flask_script import Manager, Server
from src import application, Logger
from src.models.db_init import db
from src.tasks import MasterDataImporter
from flask_migrate import Migrate, MigrateCommand
from sqlalchemy_seed import (
    load_fixtures,
    load_fixture_files,
)

migrate = Migrate(application, db)
manager = Manager(application)
manager.add_command('db', MigrateCommand)
manager.add_command('runserver', Server(use_debugger=True))


log = Logger('logs/all.log', level='debug')
log.logger.debug('debug')
log.logger.info('info')
log.logger.warning('warning')
log.logger.error('error')
log.logger.critical('critical')

Logger('logs/error.log', level='error').logger.error('error')


@manager.command
def lint():
    print("start lint")
    lint = subprocess.call([
        'flake8', '--ignore=E401, E402, E501', 'src/', 'manage.py', 'pytests/', '--exclude', 'src/codes', 'src/router_apis.py', 'src/db'
    ])
    if lint == 0:
        print('OK')
    sys.exit(lint)


@manager.command
def test():
    tests = subprocess.call(['python', '-c', 'import pytests; tests.run()'])
    sys.exit(tests)


@migrate.configure
def configure_alembic(config):
    # modify config object
    return config


@manager.command
def hello():
    print("hello")


@manager.command
def init_create_db():
    print('start create db')
    db.create_all()
    print('finish create db')


@manager.command
def seed_data(filename=None):
    print("@@@start import data@@@")
    print(filename)
    path = os.path.join(application.root_path, 'fixtures')
    print('path: ', path)
    files = [os.path.split(f)[1] for f in glob.glob("./src/fixtures/*")]
    print('files: ', files)
    if filename is not None:
        files = [filename + '.yaml']
    fixtures = load_fixture_files(path, files)
    print(fixtures)
    load_fixtures(db.session, fixtures)
    print("@@@finish import data@@@")


@manager.command
def import_master_data():
    importer = MasterDataImporter()
    importer.import_documents()  # documentをインポート
    pass


@manager.command
def upload_test():
    from src.services import GoogleCloudStorage
    gcs = GoogleCloudStorage()
    gcs.upload("aaa.txt", "./requirements.txt")


if __name__ == '__main__':
    manager.run()
    # log = Logger('all.log',level='debug')
    # Logger('error.log', level='error').logger.error('error')
