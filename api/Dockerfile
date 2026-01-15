FROM node:22-alpine

WORKDIR /usr/src/app

# OS deps (prisma often needs openssl)
RUN apk add --no-cache openssl

# Install deps first (better layer caching if you have package-lock)
# COPY package.json ./
# RUN npm i -g @nestjs/cli && npm install

EXPOSE 3000

# Start Nest in watch mode
CMD ["sh","/usr/src/app/scripts/start.sh"]
