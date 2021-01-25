#################################################################
# Not in the app/server dir because it pulls in client code
#################################################################

#################################################################
# Base image
#################################################################
FROM node:12.19.0-alpine3.12 as api-private-builder


RUN apk --no-cache add \
    bash \
    build-base \
    curl \
    g++ \
    gcc \
    libffi-dev \
    make \
    openssl-dev \
    libsodium-dev \
    libsodium

# justfile https://github.com/casey/just
RUN VERSION=0.7.1 ; \
    SHA256SUM=d3d1cb838a8ff727e25d0dcaa01304c2d82d9e7e46b53884175bdce11973aca4 ; \
    curl -L -O https://github.com/casey/just/releases/download/v$VERSION/just-v$VERSION-x86_64-unknown-linux-musl.tar.gz && \
    (echo "$SHA256SUM  just-v$VERSION-x86_64-unknown-linux-musl.tar.gz" | sha256sum  -c -) && \
    mkdir -p /tmp/just && mv just-v$VERSION-x86_64-unknown-linux-musl.tar.gz /tmp/just && cd /tmp/just && \
    tar -xzf just-v$VERSION-x86_64-unknown-linux-musl.tar.gz && \
    mkdir -p /usr/local/bin && mv /tmp/just/just /usr/local/bin/ && rm -rf /tmp/just
# just tweak: unify the just binary location on host and container platforms because otherwise the shebang doesn't work properly due to no string token parsing (it gets one giant string)
ENV PATH $PATH:/usr/local/bin

# deno for scripting inside justfiles
ENV DENO_VERSION=1.4.1
RUN apk add --virtual .download --no-cache curl ; \
    SHA256SUM=78ceea28bc692836f62423fd90f397daf1f6b49c0bee01cb1605da64e908b0f7 ; \
    curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip --output deno.zip \
    && (echo "$SHA256SUM  deno.zip" | sha256sum -c) \
    && unzip deno.zip \
    && rm deno.zip \
    && chmod 777 deno \
    && mv deno /bin/deno \
    && apk del .download

# RUN npm install -g npm@6.12.0
RUN npm explore npm -g -- npm install node-gyp@latest

#################################################################
# dev api + builder
#################################################################

# setting NODE_ENV=development installs the dependencies needed to actually build
# so you can't change to NODE_ENV=production without build failures
# ENV NODE_ENV=development

WORKDIR /repo/api-private
COPY api-private/package.json ./
COPY api-private/package-lock.json ./
RUN apk add --no-cache make gcc g++ python3-dev python3 && \
    npm install && \
    apk del make gcc g++ python3-dev python3

# RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
#     && npm install \
#     && apk del .build-deps

COPY api-private/tsconfig.json ./
COPY api-private/src ./src
COPY api-private/justfile ./justfile
# Shared src (api-private pulls in client code, not possible the other direction)
# COPY browser/src/shared /repo/browser/src/shared
# compile
# Since tsc requires code outside the src folder, the "src" part of the
# api-private dir structure is preserved (otherwise not). Annoying, and I should
# fix this because the structure is ridic
# https://stackoverflow.com/questions/52121725/maintain-src-folder-structure-when-building-to-dist-folder-with-typescript-3
RUN just build

# Copy health check code
COPY api-private/healthcheck.js /healthcheck.js

# By default we'll be running in hot-reload mode
CMD just dev

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=2s --start-period=15s CMD node /healthcheck.js

#################################################################
# prod api + builder
#################################################################
FROM node:12.19.0-alpine3.12 as api-private

WORKDIR /app/api-private

COPY api-private/package.json /app/api-private/package.json
COPY api-private/package-lock.json /app/api-private/package-lock.json
RUN npm install
COPY --from=api-private-builder /repo/api-private/dist /app/api-private/dist
COPY api-private/healthcheck.js /healthcheck.js

CMD node ./dist/index.js

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=2s --start-period=15s CMD node /healthcheck.js
