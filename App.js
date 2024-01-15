import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
    const [limitLo, setLimitLo] = useState("");
    const [limitHi, setLimitHi] = useState("");
    const [age, setAge] = useState("");
    const [ageError, setAgeError] = useState(false);

    const handleAgeChange = (text) => {
        let value = parseInt(text);

        if ((value >= 0 && value <= 150) || text === "" ) {
            setAgeError(false);
            if(text === ""){
                setAge("");
                setLimitLo("");
                setLimitHi("");
                return;
            }
            setAge(value.toString());
        } else {
            setAgeError(true);
        }
    };


    function calculate() {
        if(age === ""){
            setLimitLo("");
            setLimitHi("");
            return;
        }

        const limitLo = (220 - age) * 0.65;
        const limitHi = (220 - age) * 0.85;
        setLimitLo(limitLo.toFixed(0));
        setLimitHi(limitHi.toFixed(0));
    }
    useEffect(() => {
        calculate();
    }, [age]);

    return (
        <View style={styles.container}>
            <Text>Age</Text>
            <TextInput
                style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
                onChangeText={(text) => handleAgeChange(text)}
                keyboardType="number-pad"
                value={age}
                />
            {ageError && <Text
                    style={{ color: "red" }}
                >Please enter a valid age. (0-150)</Text>}
            <Text>
                Limit: {limitLo} - {limitHi}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
