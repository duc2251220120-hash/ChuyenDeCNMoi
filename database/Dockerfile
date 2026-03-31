FROM mysql:8.0

ENV MYSQL_DATABASE=devops_db

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
