import { POSTMESSAGE_TYPE } from "@/constants/postMessage.type"
import type { PostMessageType } from "@/types/postmessageType"
import type { RouteProp } from "@react-navigation/native"
import { StackActions } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useRef } from "react"
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import type { WebViewMessageEvent } from "react-native-webview"
import { WebView } from "react-native-webview"

const statusBarHeight = StatusBar.currentHeight
const baseUrl = "https://bbd9-182-225-81-146.ngrok-free.app"

export type StackParamList = {
  Screen: { url: string }
}

type WebViewScreenNavigationProp = StackNavigationProp<StackParamList, "Screen">
type WebViewScreenRouteProp = RouteProp<StackParamList, "Screen">

interface Params {
  navigation: WebViewScreenNavigationProp
  route: WebViewScreenRouteProp
}

export default function WebViewContainer({ navigation, route }: Params) {
  const webviewRef = useRef<WebView>(null)

  // 메시지 보내기
  const sendMessageToWeb = () => {
    if (webviewRef.current) {
      webviewRef.current?.postMessage("Hello from React Native!")
    }
  }

  const handleMessage = (event: WebViewMessageEvent) => {
    const message: PostMessageType = JSON.parse(event.nativeEvent.data)

    if (message.type === POSTMESSAGE_TYPE.ROUTER_EVENT) {
      if (message.path === "") {
      } else {
        // Alert.alert("2", message.path)
        const pushAction = StackActions.push("Screen", {
          url: `${baseUrl}${message.path}`,
          isStack: true
        })

        navigation.dispatch(pushAction)

        // const pushAction = StackActions.push("Screen", {
        //   url: `${message.path}`,
        //   isStack: true
        // })
        // navigation.dispatch(pushAction)
      }
    } else {
      Alert.alert("Message received from WebView:", event.nativeEvent.data)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Send Message to Web" onPress={sendMessageToWeb} />
      <WebView
        ref={webviewRef}
        source={{
          uri: route.params?.url ? route.params?.url : baseUrl,
          headers: {
            "Accept-Language": "ko"
          }
        }}
        onMessage={handleMessage}
        onContentProcessDidTerminate={() => {
          webviewRef.current?.reload()
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.select({
      android: statusBarHeight
    })
  }
})
