import { useRef } from "react"
import { Alert, Button, Platform, SafeAreaView, StyleSheet } from "react-native"
import { WebView } from "react-native-webview"

const App = () => {
  const webviewRef = useRef<WebView>(null)

  // 메시지 보내기
  const sendMessageToWeb = () => {
    if (webviewRef.current) {
      webviewRef.current?.postMessage("Hello from React Native!")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Send Message to Web" onPress={sendMessageToWeb} />
      <WebView
        ref={webviewRef}
        source={{
          uri: "https://6cb2-118-47-160-139.ngrok-free.app",
          headers: {
            "Accept-Language": "ko"
          }
        }}
        onMessage={(event) => {
          Alert.alert("Message received from WebView:", event.nativeEvent.data)
          // Alert.alert("Message received from WebView:", JSON.parse(event.nativeEvent.data).type)
        }}
        onContentProcessDidTerminate={() => {
          webviewRef.current?.reload()
        }}
      />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.select({
      android: "10%"
    })
  }
})
