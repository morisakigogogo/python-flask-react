FROM python:3.7
MAINTAINER Hirose.morisaki <hirose.morisaki@gmail.com>
ARG rundir=/app
COPY app $rundir

ENV FLASK_ENV production
# ENV GOOGLE_APPLICATION_CREDENTIALS /app/gcs-service-account.json
ENV GCS_BUCKET_NAME python-react
ENV GCS_BUCKET_PREFIX production


WORKDIR $rundir
RUN pip install -r requirements.txt
#ENV UWSGI_AUTORELOAD 0
# EXPOSE 5000
# CMD ["python", "manage.py", "runserver", "--host", "0.0.0.0"]