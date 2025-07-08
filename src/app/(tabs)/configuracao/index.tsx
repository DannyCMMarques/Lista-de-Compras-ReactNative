import BotaoFlutuante from '@/src/components/botao-flutuante';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function ConfigurationScreen() {

   const router = useRouter();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Configurações</Text>
            <BotaoFlutuante onPress={() => router.push("../adicionar-listas")} />
      
    </View>
  );
}
