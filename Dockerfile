FROM node:16-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn blitz prisma migrate deploy --preview-feature
RUN yarn blitz prisma generate && yarn build

# RUN npm prune --production

# create a production image
FROM node:16-alpine
COPY --from=build /app /
EXPOSE 3000

CMD yarn blitz prisma generate && yarn start



# note for docker command
# docker build . -t blitzslim[image name]
# docker run -d --restart unless-stopped -p 3001:3000 -it --volume //d/blitz:/public/media  --name blitzdock ekaluk52003/blitzblog


# docker run -d --restart unless-stopped -p 3600:3000 --name blitzblog[container name] ekaluk52003/blitzblog[imagename]
