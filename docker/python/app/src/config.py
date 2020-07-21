import os


class BaseConfig:
    # DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    DEBUG = True


class LocalConfig(BaseConfig):
    # SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@db/pythonreact"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:1111qqqq~~@db/pythonreact"


class LocalDockerConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:1111qqqq~~@db/pythonreact"


class TestConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@db/test"


class TestCiConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@db/test"


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:1111qqqq~~@db/pythonreact"


config = {
    "local": LocalConfig,
    "local-docker": LocalDockerConfig,
    "test": TestConfig,
    "test_ci": TestCiConfig,
    "development": "DevelopmentConfig",
    "production": ProductionConfig,
}


def configure_app(application):
    config_name = os.getenv('FLASK_ENV', 'local')
    print("==================")
    print(" * DB Setting")
    print(" config_name", config_name)
    print("==================")
    application.config.from_object(config[config_name])
    application.config.from_pyfile('config.cfg', silent=True)
    application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    application.config['SQLALCHEMY_ECHO'] = True
    application.config['JSON_AS_ASCII'] = False
    application.config['JWT_SECRET_KEY'] = 'jwt-secret-test'
    application.config['JWT_BLACKLIST_ENABLED'] = True
    application.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
