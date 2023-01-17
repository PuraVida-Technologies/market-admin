FROM node:18-alpine

ENV PORT=3000
EXPOSE ${PORT}

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]
