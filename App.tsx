import React, { useState, useEffect } from 'react';
import {Text, TextInput, StyleSheet, View} from "react-native"
import { Colors } from 'react-native/Libraries/NewAppScreen';
const MAX_AGE = 150;
const MIN_AGE = 0;

  const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: '#000000',  
        alignItems: 'center',  
        justifyContent: 'center',
    }
  });


export default function App() {
  const [limitLow, setLimitLow] = useState<string>("0");
  const [limitHigh, setLimitHigh] = useState<string>("0");
  const [age, setAge] = useState<string>('');
  const [ageError, setAgeError] = useState<boolean>(false);

  const handleAgeChange = (text:string) => {
    let value = parseInt(text);

    if ((value >= MIN_AGE && value <= MAX_AGE) || text === "" ) {
        setAgeError(false);
        if(text === ""){
            setAge("");
            setLimitLow("");
            setLimitHigh("");
            return;
        }
        setAge(value.toString());
    } else {
        setAgeError(true);
    }
};


  const calculate = () => {
    if(age === ""){
      setLimitLow("");
      setLimitHigh("");
      return;
  }
    const calculatedLimitLow = ((220 - parseInt(age, 10)) * 0.65).toFixed(1);
    const calculatedLimitHigh = ((220 - parseInt(age, 10)) * 0.85).toFixed(1);
    setLimitLow(calculatedLimitLow);
    setLimitHigh(calculatedLimitHigh);
  };

  useEffect(() => {
    calculate();
  }, [age]);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
      >Age</Text>
      <TextInput
        style={{ width: 200,color: 'white', borderColor: 'gray', borderWidth: 1 }}
        onChangeText= {(age)=>handleAgeChange(age)}
        value={age}
        keyboardType="numeric"
        />
        {ageError && <Text
                    style={{ color: "red" }}
                >{`Please enter a valid age. (${MIN_AGE}- ${MAX_AGE}`}</Text>}
      <Text
      style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}
      >Limit: {limitLow} - {limitHigh}</Text>
    </View>
  );
};

