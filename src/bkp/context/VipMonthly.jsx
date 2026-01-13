import React, { useRef, useState, useContext, useEffect } from 'react';

import { View, Text, StyleSheet, AppState } from 'react-native';
import { DataContext } from './contextData';


export default function VipMonthly() {
    const {

        colors, userVip,
        setUserVip, vipCard, setVipCard,
    } = useContext(DataContext);

    const [timer, setTimer] = useState(7200);
    const timerTimeout = useRef(null)
    // dont forget the timer
    useEffect(() => {
        if (userVip === false) return;
        if (timer > 0 && userVip === 'monthly') {
            timerTimeout.current = setTimeout(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timerTimeout.current);
        } else if (timer === 0) {
            setUserVip(false);

        }
    }, [timer, userVip]);

    const appState = useRef(AppState.currentState);
    const deadline = useRef(Date.now() + timer * 1000); // deadline timestamp
    const [handleTimerBackground, setHandleTimerBackground] = useState(false);

    // Update timer on app foreground
    // dont forget to fix the timer when the ad is shown or 
    // add only if not add work or the ans is checked
    useEffect(() => {
        if (!handleTimerBackground) {
            const subscription = AppState.addEventListener('change', nextAppState => {
                if (
                    appState.current.match(/background|inactive/) &&
                    nextAppState === 'active'
                ) {
                    // Calculate remaining time
                    const remaining = Math.max(0, Math.round((deadline.current - Date.now()) / 1000));
                    setTimer(remaining);
                }
                appState.current = nextAppState;
            });

            return () => subscription.remove();
        }
    }, [handleTimerBackground]);

    // When timer or question resets, update deadline accordingly
    const resetTimer = (newTime) => {
        setTimer(newTime);
        deadline.current = Date.now() + newTime * 1000;
    };

    return (
        <Text style={{ color: "white", fontWeight: '700' }}>{timer} day</Text>
    )
}