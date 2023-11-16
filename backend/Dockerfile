FROM python:3.9.0
EXPOSE 8000
WORKDIR /project

COPY . .
ADD backend/ backend/
ADD api/ api/

RUN pip3 install -r requirements.txt --no-cache-dir