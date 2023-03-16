FROM node:19.4.0
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3008
CMD ["yarn","dev"]