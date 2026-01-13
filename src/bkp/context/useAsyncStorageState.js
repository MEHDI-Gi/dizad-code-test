// useAsyncStorageState.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorageState(key, initialValue) {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        AsyncStorage.getItem(key)
            .then(value => {
                if (value !== null) setState(JSON.parse(value));
            })
            .catch(console.error);
    }, [key]);

    useEffect(() => {
        AsyncStorage.setItem(key, JSON.stringify(state)).catch(console.error);
    }, [key, state]);

    return [state, setState];
}
