import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';
import { useAuth } from './AuthContext';
import { Appearance } from 'react-native';

Appearance.setColorScheme('light');

const RzutKostka_Bonus = ({ route, navigation }) => {
  const { statValue, statName } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };
  const { t } = useTranslation();
    const { token } = useAuth();
  const { theme } = useContext(ThemeContext);
  const { player,session ={} } = route.params;
  const [diceValue, setDiceValue] = useState(null);
  const [rotateValue] = useState(new Animated.Value(0));
  const [result, setResult] = useState(null);
const [answer, setAnswer] = useState(null);

  const attributes = {
    STR: t('Strength'),
    DEX: t('Dexterity'),
    CON: t('Constitution'),
    INT: t('Intelligence'),
    WIS: t('Wisdom'),
    CHA: t('Charisma'),
  };

  const handleRollDice = () => {
    setDiceValue(null);
    setResult(null);

    const randomValue = Math.floor(Math.random() * 20) + 1;

    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotateValue.setValue(0);
      setTimeout(() => {
        setDiceValue(randomValue);

        const finalStatValue = isNaN(statValue) || statValue === 'None' ? 0 : parseInt(statValue);
        setResult(randomValue + finalStatValue);
        setAnswer(`${player.name} roll for ${statName} ${result} ( ${diceValue} ${statValue >= 0 ? '+' : ''}${statValue})`)

       if (answer && answer.trim().length > 0) {
         fetchData();
       }

      }, 200);
    });
  };
const fetchData = async () => {
          try {
              console.log(answer)
              const sessionResponse = await fetch('http://192.168.0.54:8000/sessions/addToLogs', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                              'accept': 'application/json'
                          },
                          body: JSON.stringify({ token: token.toString(),log:`${answer}`,sessionID:session.id }),
                      });


              if (!sessionResponse.ok) {
                  throw new Error('Failed to fetch data');
              }

                  const ans = await sessionResponse.json();

          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground source={theme.background} style={styles.container}>
      <Text style={[styles.appName, { color: theme.fontColor }]}>DMBook</Text>

      <View style={styles.diceRollLabelContainer}>
        <Text style={[styles.diceRollLabelText, { color: theme.textColor }]}>
          {`${t('Roll for')} ${attributes[statName]}`}
        </Text>
      </View>

      <View style={styles.diceContainer}>
        <TouchableOpacity style={styles.diceContainer} onPress={handleRollDice}>
          <Animated.Image
            source={require('./assets/icons/d20.png')}
            style={[styles.diceKostka, { transform: [{ rotate: spin }] }]}
          />
          {diceValue !== null && <Text style={[styles.diceValue, { color: theme.textColor }]}>{diceValue}</Text>}
        </TouchableOpacity>
      </View>

      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTextKostka}>
            {`${t('Result')}: ${diceValue} ${statValue >= 0 ? '+' : ''}${statValue} = ${result}`}
          </Text>
        </View>
      )}

      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RzutKostka_Bonus;
