FROM nginx
RUN mkdir /etc/nginx/ssl
COPY ./example.key /etc/nginx/ssl/example.key
COPY ./example.crt /etc/nginx/ssl/example.crt
COPY ./default.conf /etc/nginx/conf.d/default.conf
