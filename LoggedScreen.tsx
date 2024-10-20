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
      <Text style={[styles.appName, { color: theme.fontColor }]}>DMBook</Text>


       <View style={[styles.buttonContainerUsu, {bottom: '50%' }]}>
          <TouchableOpacity style={styles.button} onPress={() => {handleCharactersPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={theme.icons.characters} style={styles.icons} />
                <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
                {t('Characters')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>
       <View style={[styles.buttonContainerUsu, {bottom: '30%' }]}>
          <TouchableOpacity style={styles.button} onPress={() => {handleLoginPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={theme.icons.logout} style={styles.icons} />
                <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
                {t('Log_out')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>
       <View style={[styles.buttonContainerUsu, { bottom: '40%' }]}>
          <TouchableOpacity style={styles.button} onPress={() => {handleRegistrationPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={theme.icons.rolldice} style={styles.icons} />
                <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
                {t('Roll_dice')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>


      </ImageBackground>
);
};

export default LoggedScreen;
