import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/providers/AuthProvider';
import { ProductProvider } from './src/providers/ProductProvider';
import { CartProvider } from './src/providers/CartProvider';
import { PedidoProvider } from './src/providers/PedidoProvider';


export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#ff6347'} />
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>
            <ProductProvider>
              <PedidoProvider>
                <DrawerNavigator />
              </PedidoProvider>
            </ProductProvider>
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </>

  );
}


