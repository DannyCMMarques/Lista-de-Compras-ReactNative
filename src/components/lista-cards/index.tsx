import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { BarraDePorcentagem } from "../barra-de-porcentagem";
import TituloComIcone from "../tituloIcone";

import { useContadorDeTempo } from "@/src/hooks/useContadorDeTempo";
import { useDeletarLista } from "@/src/hooks/useListas";
import { useShareLista } from "@/src/hooks/useShareLista";
import { useShareListaCompleta } from "@/src/hooks/useShareListaCompleta";
import { stylesCentral } from "@/src/styles/stylesCentral";
import { ListaCardsProps } from "@/src/utils/types/components/componentsTypes";

export function ListaCards({ lista }: ListaCardsProps) {
  const router = useRouter();
  const tempoFormatado = useContadorDeTempo(lista.createdAt);
  const totalItens = lista.itensDaLista.length;

  const excluirLista = useDeletarLista();
  const shareDeepLink = useShareLista({ id: lista.id, titulo: lista.titulo });
  const shareCompleta = useShareListaCompleta(lista);

  const subtitulo = `${totalItens} ${totalItens === 1 ? "item" : "itens"
    } • ${tempoFormatado}`;

  const handleNavigate = () => {
    router.push({
      pathname: "/lista/[id]",
      params: { id: lista.id },
    });
  };

  const handleDelete = () => {
    excluirLista.mutate(lista.id);
  };

  return (
    <Pressable onPress={handleNavigate}>
      <View style={[stylesCentral.miniContainer, { margin: 10, padding: 10, borderColor:'#cdd4d9'}]}>
        <TituloComIcone
          titulo={lista.titulo}
          iconName={lista.iconeEscolhido}
          color={lista.corEscolhida}
          isCard={true}
          subtitulo={subtitulo}
          onShareDeepLink={shareDeepLink}
          onDelete={handleDelete}
          onShare={shareCompleta}
          temItens={totalItens !== 0}
        />
        <View style={{ marginTop: 20 }}>
          <BarraDePorcentagem itens={lista.itensDaLista} />
        </View>
      </View>
    </Pressable>
  );
}
