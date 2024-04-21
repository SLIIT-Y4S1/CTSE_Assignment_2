FROM --platform=linux/X86_64 node:20-alpine

WORKDIR /home/product-service

COPY package.json ./

RUN npm install --global npm@latest

RUN npm ci --omit=dev

COPY . .

ENV PORT=5000

RUN npm run build

EXPOSE 5000

CMD [ "node", "build/server.js"]
