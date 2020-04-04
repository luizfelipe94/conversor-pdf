FROM ubuntu:18.04

RUN apt-get update && apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash 
RUN apt-get install nodejs -y
RUN node -v
RUN npm -v
RUN apt-get install libreoffice-core --no-install-recommends -y
RUN apt -y install libreoffice-base

VOLUME /files_teste
RUN echo 'FUNCIONAAAAAAAA' > /files_teste/xd.txt

WORKDIR /usr/src/conversor
COPY package.json .
RUN npm install
COPY . ./

EXPOSE 3500

CMD ["npm", "start"]
