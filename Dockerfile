FROM node:16.0.0-alpine
USER node
WORKDIR /usr/src/app
COPY --chown=node . .
RUN ls -a
RUN npm install
RUN npm run build
RUN ls -a
EXPOSE 8000
CMD [ "node", "./dist/app.js" ]