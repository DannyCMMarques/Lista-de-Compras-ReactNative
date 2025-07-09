import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsRegular: require('./../../assets/fonts/Poppins/Poppins-Medium.ttf'),
  });

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Slot />
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
