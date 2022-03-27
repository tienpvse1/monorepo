FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
RUN npm i -g pm2
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["pm2-runtime", "start" ,"dist/main.js"]
