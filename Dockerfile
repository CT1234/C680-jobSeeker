FROM node

RUN apt-get update -qq && apt-get install -y build-essential
RUN npm install sails -g

WORKDIR /home/sails

ADD package.json /home/sails/package.json
RUN npm install
RUN npm rebuild node-sass

ADD . /home/sails

ENV NODE_ENV development

EXPOSE 1337
CMD ["sails", "lift"]