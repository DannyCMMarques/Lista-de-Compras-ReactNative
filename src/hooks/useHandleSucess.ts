import { useCallback } from "react";
import { Toast } from "toastify-react-native";
import { useHandleVoltar } from "./useHandleVoltar";

 export function useHandleSucess(fraseSucesso:string):()=>void{
     const handleVoltar = useHandleVoltar();

const handleSucess = useCallback(() => {
        Toast.success(fraseSucesso);
        handleVoltar();
    }, [
        handleVoltar,fraseSucesso
    ]);

    return handleSucess
 }


