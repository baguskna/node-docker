FROM node:15

WORKDIR /app

COPY package.json .

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
  then npm i; \
  else npm i --only=production; \
  fi

COPY . .

ENV PORT=3000

EXPOSE ${PORT}

CMD ["node", "index.js"]


# build docker image: docker build -t node-app-image .

# run docker container: docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
# run docker container with overriding port: docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=4000 -p 3000:4000 -d --name node-app node-app-image
# run docker container with .env file: docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
## -v /app/node_modules -> prefent override following folder or file in container
## 'ro' prevents file inside docker send to host machine or read only

# debug on inside container
## open terminal in container and then hit ls
## cat index.js
