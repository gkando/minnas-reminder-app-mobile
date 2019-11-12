import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './app/navigation';
import { StoreProvider } from "./app/store";

const App = () => (
    <StoreProvider>
        <AppNavigator />
    </StoreProvider>
);

export default App;
