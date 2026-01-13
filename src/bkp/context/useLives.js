// useLives.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_LIVES = 5;
const LIFE_RESTORE_INTERVAL = 1 * 60 * 60 * 1000;

export function useLives() {
    const [livesHeart, setLivesHeart] = useState(MAX_LIVES);
    const [livesHeartEnd, setLivesHeartEnd] = useState(false);
    const [timeLeft, setTimeLeft] = useState(LIFE_RESTORE_INTERVAL);
    const [lastLifeUpdate, setLastLifeUpdate] = useState(Date.now());

    useEffect(() => {
        async function loadData() {
            try {
                const livesStored = await AsyncStorage.getItem('LivesHeart');
                const lastUpdateStored = await AsyncStorage.getItem('lastLifeUpdate');

                const lives = livesStored ? JSON.parse(livesStored) : MAX_LIVES;
                setLivesHeart(lives);

                const now = Date.now();

                if (lastUpdateStored) {
                    const lastUpdate = parseInt(lastUpdateStored, 10);
                    setLastLifeUpdate(lastUpdate);

                    if (lives < MAX_LIVES) {
                        const elapsed = now - lastUpdate;
                        const livesToAdd = Math.floor(elapsed / LIFE_RESTORE_INTERVAL);

                        if (livesToAdd > 0) {
                            const newLives = Math.min(lives + livesToAdd, MAX_LIVES);
                            setLivesHeart(newLives);

                            // Calculate leftover time for next life restore
                            const remainder = elapsed % LIFE_RESTORE_INTERVAL;
                            const newLastUpdate = now - remainder;
                            setLastLifeUpdate(newLastUpdate);
                            await AsyncStorage.setItem('lastLifeUpdate', newLastUpdate.toString());
                        }
                    } else {
                        // If lives are full, reset lastLifeUpdate to now
                        setLastLifeUpdate(now);
                        await AsyncStorage.setItem('lastLifeUpdate', now.toString());
                    }
                } else {
                    // No last update stored, initialize it
                    setLastLifeUpdate(now);
                    await AsyncStorage.setItem('lastLifeUpdate', now.toString());
                }
            } catch (e) {
                console.error('Failed to load lives data', e);
            }
        }
        loadData();
    }, []);

    // Save livesHeart to AsyncStorage whenever it changes
    useEffect(() => {
        AsyncStorage.setItem('LivesHeart', JSON.stringify(livesHeart));
        setLivesHeartEnd(livesHeart === 0);
    }, [livesHeart]);


    // Timer to restore one life after the remaining time
    useEffect(() => {
        if (livesHeart < MAX_LIVES) {
            const now = Date.now();
            const elapsed = now - lastLifeUpdate;
            const timeRemaining = LIFE_RESTORE_INTERVAL - elapsed;

            const timerId = setTimeout(async () => {
                setLivesHeart(prev => {
                    const newLives = Math.min(prev + 1, MAX_LIVES);
                    return newLives;
                });
                const newLastUpdate = Date.now();
                setLastLifeUpdate(newLastUpdate);
                await AsyncStorage.setItem('lastLifeUpdate', newLastUpdate.toString());
            }, timeRemaining > 0 ? timeRemaining : 0);

            return () => clearTimeout(timerId);
        } else {
            // If lives are full, reset timeLeft to 0
            setTimeLeft(0);
        }

    }, [livesHeart, lastLifeUpdate]);

    // Interval to update timeLeft every second
    useEffect(() => {
        if (livesHeart < MAX_LIVES) {
            const intervalId = setInterval(() => {
                const now = Date.now();
                const elapsed = now - lastLifeUpdate;
                const timeRemaining = LIFE_RESTORE_INTERVAL - elapsed;


                setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
            }, 1000);

            return () => clearInterval(intervalId);
        } else {
            setTimeLeft(0);
        }
    }, [livesHeart, lastLifeUpdate]);




    return { livesHeart, setLivesHeart, livesHeartEnd, timeLeft };
}
