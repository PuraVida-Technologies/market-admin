FROM node:16-alpine

ENV PORT=3000
EXPOSE ${PORT}

WORKDIR /app
COPY . .

RUN yarn ci-build

CMD ["yarn", "start"]
