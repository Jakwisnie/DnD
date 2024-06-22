import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';

const diceTypes = [
  { sides: 4, image: require('./assets/dice/d4.png') },
  { sides: 6, image: require('./assets/dice/d6.png') },
  { sides: 8, image: require('./assets/dice/d8.png') },
  { sides: 10, image: require('./assets/dice/d10.png') },
  { sides: 12, image: require('./assets/dice/d12.png') },
  { sides: 20, image: require('./assets/dice/d20.png') },
  { sides: 100, image: require('./assets/dice/d100.png') },
];

const RzutKostka_Bonus = ({ navigation }) => {
  const { t } = useTranslation();

  const [diceValues, setDiceValues] = useState(Array(diceTypes.length).fill(null));
  const [rotateValues] = useState(diceTypes.map(() => new Animated.Value(0)));

  const handleRollDice = (index) => {
    const randomValue = Math.floor(Math.random() * diceTypes[index].sides) + 1;

    Animated.timing(rotateValues[index], {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotateValues[index].setValue(0);
      const newDiceValues = [...diceValues];
      newDiceValues[index] = randomValue;
      setDiceValues(newDiceValues);
    });
  };

  const renderDice = (dice, index) => {
    const spin = rotateValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <TouchableOpacity key={index} style={styles.diceContainer} onPress={() => handleRollDice(index)}>
        <Animated.Image source={dice.image} style={[styles.dice, { transform: [{ rotate: spin }] }]} />
        <Text style={styles.diceValue}>{diceValues[index]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={require('./assets/dungeon.jpeg')} style={styles.container}>
      <Text style={styles.appName}>DMBook</Text>
      <View style={styles.diceGrid}>
        {diceTypes.map((dice, index) => renderDice(dice, index))}
      </View>
      <View style={styles.goBack}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoggedScreen')}>
          <Text style={styles.goBackText}>{t('Go_back')}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  appName: {
    position: 'absolute',
    top: '16%',
    fontSize: 24,
    color: '#7F7F7F',
  },
  diceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  diceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  diceValue: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d6d6d6',
  },
  dice: {
    width: 100,
    height: 100,
  },
  goBack: {
    position: 'absolute',
    top: 42,
    left: 20,
    width: '20%',
    borderColor: '#7F7F7F',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
  },
  goBackText: {
    color: '#d6d6d6',
  },
});

export default RzutKostka_Bonus;
