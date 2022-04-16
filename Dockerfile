FROM node:16-alpine AS build

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

WORKDIR /app

COPY package.json yarn.lock ./
COPY db/ ./db/
RUN yarn install --frozen-lockfile
RUN yarn blitz prisma migrate deploy --preview-feature

COPY . .
RUN yarn blitz prisma generate && yarn build

EXPOSE 3001

CMD  yarn start

