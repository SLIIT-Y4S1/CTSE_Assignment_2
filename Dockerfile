FROM --platform=linux/X86_64 node:lts-alpine

WORKDIR /product-service

COPY package*.json ./

RUN npm install --global npm@latest

RUN npm ci --omit=dev

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "build/server.js"]
