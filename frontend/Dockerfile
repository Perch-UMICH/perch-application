FROM node

RUN mkdir -p /code
WORKDIR /code

ADD package.json /code
RUN npm install

ADD . /code

CMD npm start
