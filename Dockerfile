FROM node:19-bullseye

RUN yarn global add nodemon

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE ${PORT}

CMD ["yarn", "dev"]
