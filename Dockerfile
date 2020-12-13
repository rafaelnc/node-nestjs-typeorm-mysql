FROM node:14.15.1

RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc

WORKDIR /home/node/app

COPY package*.json ./

COPY --chown=node:node . .

RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm i -g @nestjs/cli@7.5.4

RUN npm install

ADD . /nest-app

USER node


