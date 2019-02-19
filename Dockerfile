FROM node:10.13

WORKDIR /usr/src/app
COPY ["package*.json", "./"]
RUN npm install

COPY src ./src
COPY ["tsconfig.json", ".eslintrc.json", "./"]

RUN npm run build

RUN rm -rf ./src

RUN npm prune --production


# The official node image provides an unprivileged user as a security best practice
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

CMD npm run start