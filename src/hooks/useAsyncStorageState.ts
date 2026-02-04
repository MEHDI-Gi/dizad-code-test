import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorageState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        AsyncStorage.getItem(key)
            .then(value => {
                if (value !== null) {
                    try {
                        setState(JSON.parse(value) as T);
                    } catch {
                        // Invalid JSON, keep initial value
                    }
                }
            })
            .catch(console.error);
    }, [key]);

    useEffect(() => {
        AsyncStorage.setItem(key, JSON.stringify(state)).catch(console.error);
    }, [key, state]);

    return [state, setState];
}
