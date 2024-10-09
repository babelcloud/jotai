FROM ghcr.io/babelcloud/sandbox-unit-tester:2409d88

WORKDIR /opt

COPY . .

RUN pnpm install