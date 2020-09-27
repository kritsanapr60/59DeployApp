FROM node:14.3.0-alpine3.11
# WORKDIR /usr/src
EXPOSE 4000 5001 9000 8080 8085 5000 4200
RUN apk update \
  && apk add --no-cache git openssh openjdk8 bash \
  # && yarn update\
  && yarn global add @angular/cli jest @compodoc/compodoc firebase-tools
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
ENV PATH $PATH:$JAVA_HOME/bin