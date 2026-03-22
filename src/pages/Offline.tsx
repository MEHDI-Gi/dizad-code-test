import { View } from "react-native";
import { DataContext } from "../context/contextData";
import { useContext } from "react";
import { useColors } from "../hooks/useColors";


export default function Offline() {

    const colors = useColors();
    return (
        <View style={{
            flex: 1,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary
        }}>

        </View>
    )
}