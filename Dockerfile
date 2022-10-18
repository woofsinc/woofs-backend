FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN npx prisma generate

EXPOSE 3333

CMD [ "yarn", "run", "start" ]