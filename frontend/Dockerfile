FROM node:18-alpine as build
WORKDIR /build
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /build/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]