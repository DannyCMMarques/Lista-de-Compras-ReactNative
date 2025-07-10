import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsRegular: require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor:"#FFF" }}       
          edges={['top', 'left', 'right']} 
        >
          <Slot />
        </SafeAreaView>

        <ToastManager
          position="top"
          theme="light"
          animationStyle="slide-in"
          duration={4000}
          useModal={false}
        />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
