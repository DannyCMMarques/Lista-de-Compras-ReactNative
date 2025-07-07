import { ListaResponse } from '@/service/interfaces/listasInterface';
import React from 'react';
import { View } from 'react-native';
import { stylesCentral } from '../../src/styles/stylesCentral';
import TituloComIcone from '../ui/tituloIcone';
import { useContadorDeTempo } from '@/hooks/useContadorDeTempo';

interface ListaCardsProps {
    lista: ListaResponse;
    [key: string]: any;
}

export function ListaCards({ lista }: ListaCardsProps) {
    return (
        <View style={stylesCentral.miniContainer}>
            <TituloComIcone
                titulo={lista.titulo}
                iconName={lista.iconeEscolhido}
                color={lista.corEscolhida}
                isCard={true}
                subtitulo={`${lista.itensDaLista.length} ${lista.itensDaLista.length === 1 ? 'item' : 'itens'} • ${useContadorDeTempo(lista.createdAt)}`}
            />
        </View>
    );
}
