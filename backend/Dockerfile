FROM node:24-alpine
RUN apk add --no-cache git
WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]