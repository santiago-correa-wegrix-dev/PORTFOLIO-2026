# syntax=docker/dockerfile:1

# -------- Base --------
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# -------- Dev Dependencies --------
FROM base AS development-dependencies-env

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# -------- Production Dependencies --------
FROM base AS production-dependencies-env

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

# -------- Build --------
FROM base AS build-env

COPY . .
COPY --from=development-dependencies-env /app/node_modules ./node_modules

RUN pnpm build

# -------- Runtime --------
FROM node:24-alpine

ENV NODE_ENV=production
ENV PORT=8080

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY --from=production-dependencies-env /app/node_modules ./node_modules

COPY --from=build-env /app/build ./build
COPY --from=build-env /app/public ./public

EXPOSE 8080

CMD ["pnpm", "start"]