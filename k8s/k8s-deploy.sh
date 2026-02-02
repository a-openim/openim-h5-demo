#!/bin/bash

# 1. 进入脚本所在目录并加载配置
cd $(dirname $0)
SCRIPT_DIR=$(pwd)
if [ -f "deploy.confg" ]; then
    source ./deploy.confg
else
    echo "❌ 错误: 找不到 deploy.confg 配置文件"
    exit 1
fi

# 返回项目根目录
cd ..
PROJECT_ROOT=$(pwd)

# 2. 定义变量
TAG=$(date +%Y%m%d%H%M%S)
FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"

# 将镜像版本存入 .version 文件
echo "${FULL_IMAGE_NAME}" > .version
echo "📝 镜像版本已记录到 .version: ${FULL_IMAGE_NAME}"

# 3. 配置 Docker Buildx 以支持 HTTP (关键点)
BUILDER_NAME="h5-builder"
if ! docker buildx inspect $BUILDER_NAME &>/dev/null; then
    echo "📦 创建并配置 buildx builder 以支持 HTTP 仓库..."
    # 创建临时配置文件
    cat <<EOF > buildkitd.toml
[registry."${HARBOR_URL}"]
  http = true
EOF
    docker buildx create --name $BUILDER_NAME --use --config buildkitd.toml
    rm buildkitd.toml
fi
docker buildx use $BUILDER_NAME

# 4. 登录 Harbor (参考你的 linux-amd64 脚本优化登录逻辑)
echo "🔐 正在登录 Harbor..."
echo "${HARBOR_PASS}" | docker login ${HARBOR_URL} -u "${HARBOR_USER}" --password-stdin

# 5. 构建并推送
echo "🔨 正在构建并推送 linux/amd64 镜像..."
docker buildx build --platform linux/amd64 -t ${FULL_IMAGE_NAME} --push -f ${SCRIPT_DIR}/Dockerfile .

# 6. 更新 K8S
echo "☸️ 正在更新 K8S Deployment: ${APP_NAME}..."

# 预先确保 deployment.yaml 存在 revisionHistoryLimit 限制 (建议手动在 yaml 里加)
# 也可以通过脚本强制设置
if kubectl get deployment ${APP_NAME} -n ${NAMESPACE} &>/dev/null; then
    echo "📦 部署已存在，执行滚动更新..."
    kubectl set image deployment/${APP_NAME} ${APP_NAME}=${FULL_IMAGE_NAME} -n ${NAMESPACE}
else
    echo "📦 部署不存在，创建新部署..."
    # 替换 yaml 中的镜像并应用
    sed -i '' "s|image:.*|image: ${FULL_IMAGE_NAME}|g" ${SCRIPT_DIR}/deployment.yaml
    kubectl apply -f ${SCRIPT_DIR}/deployment.yaml -n ${NAMESPACE}
fi

# 7. 自动清理旧的 ReplicaSet (解决你之前满屏 0 的问题)
echo "🧹 清理副本数为 0 的旧版本记录..."
kubectl get rs -n ${NAMESPACE} | grep "${APP_NAME}" | awk '$2=="0" && $3=="0" {print $1}' | xargs kubectl delete rs -n ${NAMESPACE} 2>/dev/null || true

# 8. 应用 Service 和 Ingress
kubectl apply -f ${SCRIPT_DIR}/service.yaml -n ${NAMESPACE}
kubectl apply -f ${SCRIPT_DIR}/ingress.yaml -n ${NAMESPACE}

# 9. 等待状态
echo "⏳ 等待部署状态更新..."
kubectl rollout status deployment/${APP_NAME} -n ${NAMESPACE} --timeout=60s