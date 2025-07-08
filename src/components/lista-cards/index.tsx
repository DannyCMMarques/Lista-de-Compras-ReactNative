import React from 'react';
import { Pressable, View } from 'react-native';
import { BarraDePorcentagem } from '../barra-de-porcentagem';
import TituloComIcone from '../ui/tituloIcone';
import { useRouter } from "expo-router";
import * as Linking from 'expo-linking';
import { Share } from 'react-native';
import { ListaResponse } from '@/src/service/interfaces/listasInterface';
import { useContadorDeTempo } from '@/src/hooks/useContadorDeTempo';
import { stylesCentral } from '@/src/styles/stylesCentral';
interface ListaCardsProps {
    lista: ListaResponse;
    [key: string]: any;
}

export function ListaCards({ lista }: ListaCardsProps) {
    const router = useRouter();
    const tempoFormatado = useContadorDeTempo(lista.createdAt);
    const totalItens = lista.itensDaLista.length;
    const subtitulo = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'} • ${tempoFormatado}`;
    const handleNavigate = () => {
        router.push({
            pathname: "/lista/[id]",
            params: { id: lista.id },
        });
    };


    const handleShareUrl = () => {


        const redirecionartUrl = Linking.createURL(`lista/${lista.id}`);
        console.log(redirecionartUrl)
        Share.share({
            title: 'Confira minha lista de Compras',
            message: `Veja minha lista de compras "${lista.titulo}" no app: ${redirecionartUrl}`,
        });
    }


    return (
        <Pressable onPress={handleNavigate}>

            <View style={stylesCentral.miniContainer}>
                <TituloComIcone
                    titulo={lista.titulo}
                    iconName={lista.iconeEscolhido}
                    color={lista.corEscolhida}
                    isCard={true}
                    subtitulo={subtitulo}
                    onPress={handleShareUrl}
                />
                <View style={{ marginTop: 20 }} >
                    <BarraDePorcentagem itens={lista.itensDaLista} />
                </View>
            </View>
        </Pressable>
    );
}
