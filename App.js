import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './app/navigation';
import { StoreProvider } from "./app/store";
import { Provider as PaperProvider } from 'react-native-paper';


const App = () => {
    return (
        <StoreProvider>
            <PaperProvider>
                <AppNavigator />
            </PaperProvider>
        </StoreProvider>
)};
// const App = () => (
//     <StoreProvider>
//         <AppNavigator />
//     </StoreProvider>
// );

export default App;
