export const EVENT_WS_MESSAGE = 'ws-message'
export const EVENT_WS_CLOSE = 'ws-close'

export enum MessageLevel {
  error = 'error',
  warning = 'warning',
  success = 'success',
  info = 'info'
}

export interface WSMessage {
  message_type: string
}

export class WebsocketClient {
  // ws实例
  messageSocket?: WebSocket
  // 重启ws时间
  retryDelay = 200
  // 实例化的时候执行该方法
  constructor() {
    try {
      this.connect()
    } catch (error) {
      console.warn(`ws: failed to connect to ws ${error}`)
    }
  }
  // 连接ws
  connect(): void {
    if (navigator.webdriver) return
    // 路由
    const wsUrl = `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/ws/client/`
    // 实例化
    this.messageSocket = new WebSocket(wsUrl)
    // 打开
    this.messageSocket.addEventListener('open', () => {
      console.debug(`ws: connected to ${wsUrl}`)
      this.retryDelay = 200
    })
    // 关闭
    this.messageSocket.addEventListener('close', (e) => {
      console.debug(`ws: closed ws connection: ${e}`)
      if (this.retryDelay > 6000) {
        // 触发自定义事件
        window.dispatchEvent(
          /**
           * // 用法
           * window.addEventListener(EVENT_WS_CLOSE, error => {
           *    console.log(error)
           * });
           */
          // 创建一个事件对象
          new CustomEvent(EVENT_WS_CLOSE, {
            bubbles: true,
            composed: true,
            detail: {
              level: MessageLevel.error,
              message: 'ws: Connection error, reconnecting...'
            }
          })
        )
      }
      // 重启ws
      setTimeout(() => {
        console.debug(`ws: reconnecting ws in ${this.retryDelay}ms`)
        this.connect()
      }, this.retryDelay)
      // 定时
      this.retryDelay = this.retryDelay * 2
    })
    // 监听消息
    this.messageSocket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data)
      // 触发自定义事件
      window.dispatchEvent(
        /**
         * // 用法
         * window.addEventListener(EVENT_WS_MESSAGE, detail => {
         *    console.log(detail)
         * });
         */
        // 创建一个事件对象
        new CustomEvent(EVENT_WS_MESSAGE, {
          bubbles: true,
          composed: true,
          detail: data as WSMessage
        })
      )
    })
    // 发生错误的时候
    this.messageSocket.addEventListener('error', () => {
      this.retryDelay = this.retryDelay * 2
    })
  }
}
