import React from 'react';
import { ImageBackground, StyleSheet, View, Button, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

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

  return (
  <ImageBackground
         source={require('./assets/dungeon.jpeg')}
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
  button: {
     alignItems: 'center',
     width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '35%',
    width: '60%',
    borderColor: 'rgba(60, 60, 60, 0.5)',
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: 'rgba(0, 0, 0, 1)',
    },
  buttonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#ffd700',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'center',
  },
  icons: {
    marginRight: -30,
    marginLeft: 10,
    width: 40,
    height: 40,
  },
});

export default LoggedScreen;
