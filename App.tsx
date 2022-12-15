import { useRef, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppState } from 'react-native';
import { timer } from './utils';

export default function App() {
  const appState = useRef(AppState.currentState);

  let tmr = timer();

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      appState.current = next;
      console.log('AppState', appState.current);

      if (appState.current === 'active') tmr = timer();
      else if (appState.current === 'background') {
        console.log(tmr.seconds);
        // Make an API call here to send the timer data somewhere
      }
    });

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Close the app to send the timer data</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
