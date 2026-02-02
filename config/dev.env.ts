const BASE_DOMAIN = 'backend-openim.36x9.com'
// Use local proxy for development to avoid CORS issues
const CHAT_URL = '/chat'
const API_URL = '/api'
const WS_URL = '/msg_gateway'

export default {
  NODE_ENV: 'development',
  CHAT_URL,
  API_URL,
  WS_URL,
  LOG_LEVEL: 5,
  VERSION: 'H5-Demo',
}
