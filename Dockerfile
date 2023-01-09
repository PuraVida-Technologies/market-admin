FROM node:18-alpine

ENV PORT=3000
EXPOSE ${PORT}

WORKDIR /app
COPY . .

RUN yarn build

CMD ["yarn", "start"]
