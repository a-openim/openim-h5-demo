const BASE_DOMAIN = 'backend-openim.36x9.com'
// Use full URLs for OpenIM SDK (WASM module needs direct connections)
const CHAT_URL = `https://api-chat-openim.36x9.com`
const API_URL = `https://api-openim.36x9.com`
const WS_URL = `wss://msggateway-openim.36x9.com`

export default {
  NODE_ENV: 'development',
  CHAT_URL,
  API_URL,
  WS_URL,
  LOG_LEVEL: 5,
  VERSION: 'H5-Demo',
}
