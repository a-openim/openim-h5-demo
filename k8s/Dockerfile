# 使用 Alpine 版 Nginx，体积小且安全
FROM nginx:stable-alpine

# 移除旧内容，确保路径正确
# 注意：在脚本中我们会从项目根目录运行 docker build
COPY ./dist/ /usr/share/nginx/html/

# 拷贝 Nginx 配置文件
COPY ./k8s/nginx.conf /etc/nginx/conf.d/default.conf

# 明确权限（防止某些 K8S 环境下的权限问题）
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]