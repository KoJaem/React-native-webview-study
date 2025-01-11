import { useRef } from "react"
import { Alert, Button, SafeAreaView, View } from "react-native"
import type { WebViewMessageEvent } from "react-native-webview"
import { WebView } from "react-native-webview"

export default function App() {
  const webviewRef = useRef<WebView>(null)

  // useEffect(() => {
  //   webviewRef.current?.postMessage("업데이트 하세요")
  // }, [])

  const onMessage = (e: WebViewMessageEvent) => {
    const data = e.nativeEvent.data
    Alert.alert(data)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="back"
          onPress={() => {
            webviewRef.current?.goBack()
          }}
        />
        <Button
          title="Reload"
          onPress={() => {
            webviewRef.current?.reload()
          }}
        />
        <Button
          title="Forward"
          onPress={() => {
            webviewRef.current?.goForward()
          }}
        />
      </View>
      <WebView source={{ uri: "http://naver.com" }} ref={webviewRef} onMessage={onMessage} />
    </SafeAreaView>
  )
}
