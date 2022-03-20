FROM nginx

# 移动到工作目录：/build
WORKDIR /build

# 将代码复制到容器中

EXPOSE 80

COPY ./dist /usr/share/nginx/html

ENTRYPOINT nginx -g "daemon off;"