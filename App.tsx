import { StatusBar } from 'expo-status-bar';
import Root from './src/screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <Root />
          <StatusBar style='auto' />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
