FROM --platform=$BUILDPLATFORM node:lts-alpine as base
WORKDIR /app
COPY package.json /
EXPOSE 5000

FROM base as production
ENV NODE_ENV=production
RUN npm i vite && npm i pm2 -g && npm i
COPY . /app
CMD npm run dev

FROM base as dev
ENV NODE_ENV=devlopment
RUN npm install pm2 -g && npm i && npm i vite
COPY . /app
CMD npm run dev
