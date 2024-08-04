FROM node:18 AS build
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

FROM node:18 AS production
WORKDIR /usr/src/app


COPY --from=build /usr/src/app /usr/src/app

EXPOSE 3001
CMD ["yarn", "start"]
