import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Button, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const LoggedScreen = ({ navigation }) => {
  const handleLoginPress = () => {
        navigation.navigate('LogIn');
  };
  const handleRegistrationPress = () => {
        navigation.navigate('RzutKostka');
  };
  const handleCharactersPress = () => {
        navigation.navigate('Characters');
  };
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
  <ImageBackground
         source={theme.background}
         style={styles.container}
       >
       <Text style={styles.appName}>DMBook</Text>


       <View style={[styles.buttonContainer, {bottom: '50%' }]}>
          <TouchableOpacity style={styles.button} onPress={() => {handleCharactersPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={require('./assets/icons/characters.png')} style={styles.icons} />
                <Text style={styles.buttonText}>{t('Characters')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>
       <View style={[styles.buttonContainer, {bottom: '30%' }]}>
          <TouchableOpacity style={styles.button} onPress={() => {handleLoginPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={require('./assets/icons/logout.png')} style={styles.icons} />
                <Text style={styles.buttonText}>{t('Log_out')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>
       <View style={[styles.buttonContainer, { bottom: '40%' }]}>
          <TouchableOpacity style={styles.button} onPress={() => {handleRegistrationPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={require('./assets/icons/rolldice.png')} style={styles.icons} />
                <Text style={styles.buttonText}>{t('Roll_dice')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>


      </ImageBackground>
);
};

export default LoggedScreen;
