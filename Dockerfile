# Don't use as is, might need configuration as per project's needs.

# Stage 1: Install Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
ARG NEXT_PUBLIC_PROD_API_BASE_URL
ENV NEXT_PUBLIC_PROD_API_BASE_URL=$NEXT_PUBLIC_PROD_API_BASE_URL

# Copy package files
COPY package.json yarn.lock ./
RUN yarn install --force

# Stage 2: Build Application
FROM node:20-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL


# Copy source code and dependencies
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build Next.js application
RUN yarn build && \
    mkdir -p .next/standalone/.next && \
    cp -r public .next/standalone/ && \
    cp -r .next/static .next/standalone/.next/

# Stage 3: Run Production Server
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy built application
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/standalone/.next ./.next
COPY --from=builder /app/.next/standalone/public ./public

EXPOSE 3000

# Use exec form of CMD for proper signal handling
CMD ["node", "server.js"]
