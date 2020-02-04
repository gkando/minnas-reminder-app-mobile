import React from 'react';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import AppNavigator from './app/navigation';
import { StoreProvider } from "./app/store";
import { Provider as PaperProvider } from 'react-native-paper';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const App = () => {
    return (
    <Root>
      <StoreProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </StoreProvider>
    </Root>
)};
// const App = () => (
//     <StoreProvider>
//         <AppNavigator />
//     </StoreProvider>
// );

export default App;
