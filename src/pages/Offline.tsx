import { View } from "react-native";
import { DataContext } from "../context/contextData";
import { useContext } from "react";


export default function Offline() {

    const { colors } = useContext(DataContext);

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