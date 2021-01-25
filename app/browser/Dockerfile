# Image used to build the browser artifacts. This image is not used
# as a service, just a source of versioned static artifacts.

# this special glibc alpine version is needed for deno to run
FROM frolvlad/alpine-glibc:alpine-3.12_glibc-2.32 as browser-builder

RUN apk --no-cache --update add \
    bash \
    curl \
    npm

# justfile for running commands, you will mostly interact with just https://github.com/casey/just
RUN VERSION=0.7.1 ; \
    SHA256SUM=d3d1cb838a8ff727e25d0dcaa01304c2d82d9e7e46b53884175bdce11973aca4 ; \
    curl -L -O https://github.com/casey/just/releases/download/v$VERSION/just-v$VERSION-x86_64-unknown-linux-musl.tar.gz && \
    (echo "$SHA256SUM  just-v$VERSION-x86_64-unknown-linux-musl.tar.gz" | sha256sum  -c -) && \
    mkdir -p /tmp/just && mv just-v$VERSION-x86_64-unknown-linux-musl.tar.gz /tmp/just && cd /tmp/just && \
    tar -xzf just-v$VERSION-x86_64-unknown-linux-musl.tar.gz && \
    mkdir -p /usr/local/bin && mv /tmp/just/just /usr/local/bin/ && rm -rf /tmp/just
# just tweak: unify the just binary location on host and container platforms because otherwise the shebang doesn't work properly due to no string token parsing (it gets one giant string)
ENV PATH $PATH:/usr/local/bin

# watchexec for live reloading in development https://github.com/watchexec/watchexec
RUN VERSION=1.12.0 ; \
    SHA256SUM=1c952ee81d3a790128f536044588a5604d614c6c160a96b0139ddabaef58f32e ; \
    curl -L -O https://github.com/watchexec/watchexec/releases/download/$VERSION/watchexec-$VERSION-i686-unknown-linux-musl.tar.xz && \
    (echo "$SHA256SUM  watchexec-${VERSION}-i686-unknown-linux-musl.tar.xz" | sha256sum -c) && \
    tar xvf watchexec-$VERSION-i686-unknown-linux-musl.tar.xz watchexec-$VERSION-i686-unknown-linux-musl/watchexec -C /usr/bin/ --strip-components=1 && \
    rm -rf watchexec-*

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

RUN npm install -g npm@6.12.0

# ENV NODE_ENV is not set here, it is not needed to set this due to parcel's simplicity

WORKDIR /repo/browser
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm i

FROM browser-builder as browser

WORKDIR /repo/browser

COPY --from=browser-builder /repo/browser/node_modules /repo/browser/node_modules

# This:
# https://github.com/metapages/cloudseed/runs/1083375046
# led to: https://github.com/moby/moby/issues/37965
# See identical statements elsewhere
# MY GOOD BITCH THIS IS MAGIC BULLSHIT THAT I HATE BUT LET'S MOVE ON
RUN true

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN true
COPY justfile ./justfile
COPY public ./public
COPY src ./src

RUN true
COPY justfile ./

RUN true
COPY tsconfig.json ./
# https://github.com/moby/moby/issues/37965
# I don't actually know if this one is needed, once it all works, try removing.
RUN true

# see https://github.com/parcel-bundler/parcel/issues/2031
ENV PARCEL_WORKERS=1
# Build the browser client
# The /repo/browser/dist directory contains the browser files (for consuming or deploying elsewhere)
RUN PARCEL_WORKERS=1 just build
