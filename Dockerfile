# Build Stage 1

FROM node:22-alpine AS build
WORKDIR /app

# RUN corepack enable

# Copy package.json and lockfile
COPY package.json package-lock.json ./

# Install dependencies
RUN npm i

# Copy the entire project
COPY . ./

# Build the project
RUN npm run build

# Build Stage 2

FROM node:22-alpine
WORKDIR /app

# Set by CI from the git tag (e.g. v2.0.1), exposed as runtimeConfig.public.appVersion
ARG APP_VERSION=dev
ENV NUXT_PUBLIC_APP_VERSION=${APP_VERSION}

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

# Change the port and host
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["node", "/app/server/index.mjs"]