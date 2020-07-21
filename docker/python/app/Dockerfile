FROM python:3.7
ARG app_dir=/newapp/
ADD requirements.txt $app_dir
WORKDIR $app_dir
RUN pip install -r requirements.txt
