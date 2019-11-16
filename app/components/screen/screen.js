import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import { offsets, presets } from "./screen.presets.js"

const isIos = Platform.OS === "ios"

function ScreenWithScrolling(props) {
  const preset = presets["scroll"]
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const Wrapper = props.unsafe ? View : SafeAreaView

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <Wrapper style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
        >
          {props.children}
        </ScrollView>
      </Wrapper>
    </KeyboardAvoidingView>
  )
}

function ScreenWithoutScrolling(props) {
  const preset = presets["fixed"]
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const Wrapper = props.unsafe ? View : SafeAreaView

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <Wrapper style={[preset.inner, style]}>{props.children}</Wrapper>
    </KeyboardAvoidingView>
  )
}



export function Screen(props) {
    // return <ScreenWithScrolling {...props} />
    return <ScreenWithoutScrolling {...props} />
}