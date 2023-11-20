FROM ubuntu:18.04 as base

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y && apt-get install -y \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    libsodium-dev \
    libzmq3-dev \
    git \
    openssl \
    libssl-dev \
    pkg-config \
    build-essential

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash

## install depdencies
RUN apt-get install -y \
    nodejs

RUN npm install -g pnpm

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain '1.58.0'

RUN git clone https://github.com/hyperledger/indy-sdk

RUN cd indy-sdk/libindy && ~/.cargo/bin/cargo build --release

RUN cd indy-sdk/libindy && mv target/release/libindy.so /usr/lib/libindy.so

WORKDIR /ssi

COPY . .

RUN pnpm install

RUN pnpm -F ssi-abstraction build
RUN echo "test"
RUN ls -la

FROM base as final

COPY --from=base  /ssi/start.sh  /apps/ssi-abstraction/start.sh
COPY --from=base /ssi/node_modules/ /apps/ssi-abstraction/node_modules
COPY --from=base /ssi/dist /apps/ssi-abstraction/dist

WORKDIR /apps/ssi-abstraction

EXPOSE 3009
EXPOSE 3010
EXPOSE 4000

RUN chmod +x ./start.sh

CMD ["./start.sh"]

