# フロント起動
front:
	cd client/web && yarn start

# サーバー起動
web_backend:
	cd newapp && pip install -r requirements.txt && python -u manage.py runserver --host 0.0.0.0 --port 5001

# DB
db:
	docker-compose up db

# project
project:
	docker-compose up landing

# pytest
pytest:
	cd newapp && FLASK_ENV=test pytest pytests/

# マスターデータインポート
import_master_data:
	cd newapp && python manage.py import_master_data

# マイグレーション
db_migrate:
	cd newapp && python manage.py db migrate

# upgrade
db_upgrade:
	cd newapp && python manage.py db upgrade

# downgrade
db_downgrade:
	cd newapp && python manage.py db downgrade
