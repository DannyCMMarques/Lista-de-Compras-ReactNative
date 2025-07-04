import Modal from "@/components/modal";
import TituloComIcone from "@/components/ui/tituloIcone/index";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import * as z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/input-field";
import { stylesCentral } from "@/styles/stylesCentral";

const schema = z.object({
    titulo: z.string().min(2, { message: "O títuloé obrigatório" }),
});
export default function FormularioListas() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Modal title="Adicionar Listas">

                <View style={stylesCentral.miniContainer}>

                    <View style={{ justifyContent: 'flex-start', marginTop: 12, marginBottom: 12 }}>
                        <TituloComIcone title="Nome da Lista" iconName="list" />
                        <InputField
                            name="titulo"
                            placeholder="Digite o título da sua lista"
                            control={control}
                            error={errors.titulo}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titulo: {
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 16,
        justifyContent: 'center',
    },

});