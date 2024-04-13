FROM --platform=linux/X86_64 node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000

CMD [ "node", "build/app.js"]
