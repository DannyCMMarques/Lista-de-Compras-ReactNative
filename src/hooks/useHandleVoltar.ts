import { useRouter } from "expo-router";
import { useCallback } from "react";

export function useHandleVoltar() {
    const router = useRouter();

    return useCallback(() => {
        router.back();
    }, [router]);
}