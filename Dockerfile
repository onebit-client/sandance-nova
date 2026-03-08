# =============================================================================
# Stage 1 – Builder
# Install all npm dependencies and produce the production build
# =============================================================================
FROM node:22-alpine AS builder

# Install build tools required by some native addons
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy root manifest files first for better layer caching
COPY package.json package-lock.json ./

# Copy workspace package manifests so npm workspaces can resolve them
COPY packages/ ./packages/
COPY extensions/ ./extensions/
COPY streamlit/ ./streamlit/
COPY scripts/ ./scripts/

# Install all workspace dependencies (ci = reproducible, respects lock-file)
RUN npm ci --prefer-offline

# Copy the rest of the source tree
COPY . .

# Build every workspace step in sequence (matches root build script)
RUN npm run build

# Build the final app bundle into ./dist
# Entry: ./test/sanddance-app.html  →  output: ./dist/sanddance-app.html
RUN npm run build-app

# =============================================================================
# Stage 2 – Production image
# Serve the compiled static assets from Nginx
# =============================================================================
FROM nginx:1.27-alpine AS production

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled app from the builder stage
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Parcel names the output after the entry file (sanddance-app.html).
# Rename it to index.html so Nginx can serve it as the default page.
RUN if [ -f /usr/share/nginx/html/sanddance-app.html ]; then \
        mv /usr/share/nginx/html/sanddance-app.html /usr/share/nginx/html/index.html; \
    fi

# Copy sample data (only if it was built/present)
COPY --from=builder /app/docs/sample-data/ /usr/share/nginx/html/sample-data/

# Fix file permissions so Nginx (nginx user) can read everything
RUN chmod -R 755 /usr/share/nginx/html

# Use our custom Nginx server config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
