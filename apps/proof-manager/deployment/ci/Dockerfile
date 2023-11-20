FROM node:16-slim AS builder

RUN apt-get update
RUN apt-get install -y openssl 
WORKDIR /app

RUN npm i -g pnpm

COPY . .
RUN pnpm install

RUN pnpm -F proof-manager prisma:generate

RUN pnpm -F proof-manager build

FROM node:16-slim 

RUN apt-get update
RUN apt-get install -y openssl


ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/start.sh ./start.sh
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/prisma prisma

EXPOSE 3007

RUN chmod +x ./start.sh

CMD ["./start.sh"]








