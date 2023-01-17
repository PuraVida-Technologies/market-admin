FROM node:18-alpine

ENV PORT=3000
EXPOSE ${PORT}

WORKDIR /app
RUN yarn install

COPY . .
RUN yarn build

CMD ["npm", "start"]
