### Build Docker
FROM node:10.13 as build

# Set NODE_ENV to development for build
ENV NODE_ENV development

# Install the dependencies (i.e. install its dependencies by running npm install)
# Do this first since it take more time and doesn't tend to change (but after setting NODE_ENV so
# that it will either install devDependencies or not depending on NODE_ENV)
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "npm-shrinkwrap.json*", "./"]
RUN npm install

# Copy the app's files
COPY src ./src
COPY ["tsconfig.json", ".eslintrc.json", "./"]

# Build the app
RUN npm run build

### Production Docker
FROM node:10.13 as production


# Set NODE_ENV to production
ENV NODE_ENV production

# Run npm install again instead of copying node_modules, since we don't want any of the devDependencies modules
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "npm-shrinkwrap.json*", "./"]
COPY --from=build /usr/src/app/node_modules ./node_modules
RUN npm prune --production

# Copy the built files from build Docker
COPY --from=build /usr/src/app/dist ./dist

# The official node image provides an unprivileged user as a security best practice
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

CMD npm run start