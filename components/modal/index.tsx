import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { styles } from './styles';

type ModalProps = {
    title: string;
    children: React.ReactNode;
};

export default function Modal({ title, children }: ModalProps) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.content}>{children}</View>
        </View>
    );
}

