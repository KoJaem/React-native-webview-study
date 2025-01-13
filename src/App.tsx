import WebViewContainer from "@/components/WebViewContainer"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"

import type { StackParamList } from "@/components/WebViewContainer"

const Stack = createStackNavigator<StackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false
        }}
      >
        <Stack.Screen
          // options={{
          //   transitionSpec: {
          //     open: {
          //       animation: "spring",
          //       config: {
          //         stiffness: 2000,
          //         damping: 1000
          //       }
          //     },
          //     close: {
          //       animation: "spring",
          //       config: {
          //         stiffness: 1000,
          //         damping: 500
          //       }
          //     }
          //   }
          // }}
          name="Screen"
          component={WebViewContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
