FROM node:16-alpine AS build

ARG DATABASE_URL
ARG NEXT_PUBLIC_CLOUDINARY_NAME
ARG SESSION_SECRET_KEY
ENV DATABASE_URL ${DATABASE_URL}
ENV NEXT_PUBLIC_CLOUDINARY_NAME ${NEXT_PUBLIC_CLOUDINARY_NAME}
ENV SESSION_SECRET_KEY ${SESSION_SECRET_KEY}

WORKDIR /app

COPY package.json yarn.lock ./
COPY db/ ./db/
RUN yarn install --frozen-lockfile
RUN yarn blitz prisma migrate deploy --preview-feature

COPY . .
RUN yarn blitz prisma generate && yarn build

EXPOSE 3001

CMD  yarn start

