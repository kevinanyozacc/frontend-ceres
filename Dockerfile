FROM    node:lts-alpine3.14 as builder

WORKDIR /app

COPY    . .

RUN     printf 'REACT_APP_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiYWxlNjE1IiwiYSI6ImNqbDZ5eGt3ZDAxcGszdm83Z3piZ3YwdTcifQ.0dSxbx5BR0aoOsarUYmArQ\nREACT_APP_API_BASE_URL=http://192.168.0.34/api/v1' > .env.production && \
        yarn && \
        yarn build

FROM    nginx:mainline-alpine

COPY    default.conf /etc/nginx/conf.d/default.conf
COPY    --from=builder /app/build /usr/share/nginx/html