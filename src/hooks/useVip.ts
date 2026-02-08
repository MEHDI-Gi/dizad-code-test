// useVip.ts
import { useMemo, useContext } from "react";
import { DataContext } from "../context/contextData";

export const useVip = () => {
    const context = useContext(DataContext);

    // GUARD: If context is null, return default values instead of crashing
    if (!context) {
        return { userVip: false, userPlan: 'free', setUserPlan: () => { } };
    }

    const { userPlan, setUserPlan } = context;

    const userVip = useMemo(() => {
        const vipPlans = ['yearly', 'monthly', 'lifetime'];
        return vipPlans.includes(userPlan || 'free');
    }, [userPlan]);

    return { userVip, userPlan, setUserPlan: context?.setUserPlan };
};