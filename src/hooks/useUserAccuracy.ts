import { useContext, useEffect, useMemo } from "react";
import { DataContext } from "../context/contextData";

export const useUserAccuracy = () => {
    const { userAccuracy, setUserAccuracy, lessonsData, accuracyProgress } = useContext(DataContext);

    const itemsContent = lessonsData?.content;
    const globalItems = useMemo(() => {
        let totalPri = 0;
        (itemsContent?.priority?.content || []).forEach(
            (current: { items: any }) => {
                totalPri += Object.keys(current?.items || {}).length;
            },
        );

        let totalSgn = 0;
        (itemsContent?.signs?.content || []).forEach(
            (current: { items: any }) => {
                totalSgn += Object.keys(current?.items || {}).length;
            },
        );

        const totalQst = Object.keys(itemsContent?.questions?.content || {}).length;

        return totalPri + totalQst + totalSgn;
    }, [lessonsData]);

    const globalViewedItems = useMemo(() => {
        const qst = Object.keys(accuracyProgress?.questions || {}).length;
        const sgn = Object.keys(accuracyProgress?.signs || {}).length;
        const pri = Object.keys(accuracyProgress?.priority || {}).length;

        return qst + sgn + pri;
    }, [accuracyProgress]);

    useEffect(() => {
        const calculatedAccuracy = globalItems > 0
            ? (globalViewedItems / globalItems) * 100
            : 0;
        const finalValue = calculatedAccuracy.toFixed(1);

        if (userAccuracy !== finalValue) {
            setUserAccuracy(finalValue);
            console.log(`Hook update: Total Views: ${globalViewedItems} -> Accuracy: ${finalValue}%`);
        }
    }, [globalViewedItems, globalItems, userAccuracy]);

    return { userAccuracy, setUserAccuracy, };
};