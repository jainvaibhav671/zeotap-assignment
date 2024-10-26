# client/Dockerfile

# Step 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

ENV NODE_ENV production
ENV VITE_API_URL https://zeotap-api.fly.dev

# Copy the rest of the code and build the app
COPY . .
RUN pnpm run build

# Step 2: Production stage
FROM nginx:alpine

# Copy the build output to the Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html


# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
