import WebView from "react-native-webview"

type SendMessageToWebViewType<T> = {
  webViewRef: React.RefObject<WebView<{}>>
  type: string
  data: T
}

export const sendMessageToWebView = <T>({ webViewRef, type, data }: SendMessageToWebViewType<T>) => {
  const message = JSON.stringify({ type, data })
  webViewRef.current?.postMessage(message)
}
