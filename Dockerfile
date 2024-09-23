###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine AS development
RUN apk update && apk add --no-cache bash
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --omit=dev && npm cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:20-alpine AS production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package*.json ./

ENV TZ=America/Bahia
RUN ln -s "/usr/share/zoneinfo/$TZ" /etc/localtime && echo "$TZ" > /etc/timezone

CMD [ "node", "dist/web/main.js" ]
