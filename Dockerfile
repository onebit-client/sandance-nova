# Serve the pre-built SandDance app from docs folder
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the pre-built app and dependencies
COPY docs/app/ ./
COPY docs/external/ ./external/
COPY docs/sample-data/ ./sample-data/
COPY docs/favicon.ico ./favicon.ico

# Rename index.html if needed (remove Jekyll frontmatter if present)
RUN if [ -f index.html ]; then \
        tail -n +3 index.html > temp.html && mv temp.html index.html; \
    fi

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
