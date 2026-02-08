import { useMemo } from "react";
import { useAsyncStorageState } from "./useAsyncStorageState"; // Path to your hook

export const useVip = () => {

    const [userPlan, setUserPlan] = useAsyncStorageState<string>('userPlan', 'free');

    const userVip = useMemo(() => {
        const vipPlans = ['yearly', 'monthly', 'lifetime'];
        return vipPlans.includes(userPlan);
    }, [userPlan]);

    return {
        userVip,
        userPlan,
        setUserPlan
    };
};