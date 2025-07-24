import { useState, useCallback } from 'react';
import { Toast } from 'toastify-react-native';

export function useErrorHandler() {
    const [error, setError] = useState<Error | null>(null);
    const handleError = useCallback((err: unknown) => {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        Toast.error(errorObj.message || 'Ocorreu um erro inesperado.');
    }, []);

    return { error, handleError };
}
