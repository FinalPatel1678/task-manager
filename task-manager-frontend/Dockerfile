FROM node:18 AS build
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

FROM nginx:stable-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["yarn", "start"]
