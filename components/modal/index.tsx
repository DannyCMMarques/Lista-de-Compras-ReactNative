import { stylesCentral } from '@/src/styles/stylesCentral';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type ModalProps = {
    title: string;
    children: React.ReactNode;
};

export default function Modal({ title, children }: ModalProps) {
    const router = useRouter();

    return (
    <ScrollView>
        <View style={[styles.modal]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
                <View style={styles.content}>{children}</View>
        </View>
            </ScrollView>


    );
}

