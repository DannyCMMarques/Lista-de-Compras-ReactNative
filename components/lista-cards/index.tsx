import { ListaResponse } from '@/service/interfaces/listasInterface';
import React from 'react';
import { Text, View } from 'react-native';
import { stylesCentral } from '../../src/styles/stylesCentral';
import TituloComIcone from '../ui/tituloIcone';
import { useContadorDeTempo } from '@/hooks/useContadorDeTempo';
import { BarraDePorcentagem } from '../barra-de-porcentagem';

interface ListaCardsProps {
    lista: ListaResponse;
    [key: string]: any;
}

export function ListaCards({ lista }: ListaCardsProps) {
    const tempoFormatado = useContadorDeTempo(lista.createdAt);
    const totalItens = lista.itensDaLista.length;
    const subtitulo = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'} • ${tempoFormatado}`;

    return (
        <View style={stylesCentral.miniContainer}>
            <TituloComIcone
                titulo={lista.titulo}
                iconName={lista.iconeEscolhido}
                color={lista.corEscolhida}
                isCard={true}
                subtitulo={subtitulo}
            />
            <View>
                <BarraDePorcentagem itens={lista.itensDaLista} />
            </View>
        </View>
    );
}
