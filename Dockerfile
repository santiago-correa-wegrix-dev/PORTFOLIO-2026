# syntax=docker/dockerfile:1

# -------- Base --------
FROM node:24-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@10.17.1 --activate

WORKDIR /app

# -------- Dependencies --------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY .npmrc .npmrc

# Cache pnpm store between builds
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# -------- Build --------
FROM base AS build

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN pnpm build

# -------- Production Dependencies --------
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./
COPY .npmrc .npmrc

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --prod --frozen-lockfile

# -------- Runtime --------
FROM base AS runtime

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY --from=prod-deps /app/node_modules ./node_modules

COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/content ./content

EXPOSE 3000

CMD ["pnpm", "start"]