import { useContadorDeTempo } from '@/hooks/useContadorDeTempo';
import { ListaResponse } from '@/service/interfaces/listasInterface';
import React from 'react';
import { Pressable, View } from 'react-native';
import { stylesCentral } from '../../src/styles/stylesCentral';
import { BarraDePorcentagem } from '../barra-de-porcentagem';
import TituloComIcone from '../ui/tituloIcone';
import { useRouter } from "expo-router";

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
    return (
        <Pressable onPress={handleNavigate}>

            <View style={stylesCentral.miniContainer}>
                <TituloComIcone
                    titulo={lista.titulo}
                    iconName={lista.iconeEscolhido}
                    color={lista.corEscolhida}
                    isCard={true}
                    subtitulo={subtitulo}
                />
                <View style={{ marginTop: 20 }} >
                    <BarraDePorcentagem itens={lista.itensDaLista} />
                </View>
            </View>
        </Pressable>
    );
}
