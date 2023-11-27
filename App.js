import 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { StackNavigator } from './src/navigators/StackNavigator';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/providers/AuthProvider';
import { ProductProvider } from './src/providers/ProductProvider';
import { CartProvider } from './src/providers/CartProvider';
import { PedidoProvider } from './src/providers/PedidoProvider';
import { useEffect } from 'react';


export default function App() {

  useEffect(() => {
    onFetchUpdateAsync();
  }, [])

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return (
    <>
      <StatusBar backgroundColor={'#ff6347'} />
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <ProductProvider>
              <PedidoProvider>
                <StackNavigator />
              </PedidoProvider>
            </ProductProvider>
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </>

  );
}


