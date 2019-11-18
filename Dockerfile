FROM node:12-alpine
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
ENV PORT="8080"
COPY dist .
CMD npm start
USER node