FROM ubuntu:24.04
LABEL authors="jss"

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

RUN curl --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/nektos/act/master/install.sh | bash \
    && mv /bin/act /usr/local/bin/act

WORKDIR /workspace

COPY . .

CMD ["tail", "-f", "/dev/null"]