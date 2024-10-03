import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Button, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', flag: require('./assets/flags/English.png') },
  { code: 'pl', label: 'Polski', flag: require('./assets/flags/Polish.png') },
  { code: 'ua', label: 'Українська', flag: require('./assets/flags/Ukraine.png') },
  { code: 'ru', label: 'Русский', flag: require('./assets/flags/russia.png') }
];

const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setCurrentLang(code);
    setDropdownVisible(false);
  };

  const handleLoginPress = () => {
        navigation.navigate('LogIn');
  };
  const handleRegistrationPress = () => {
        navigation.navigate('Registration');
  };
  return (
  <ImageBackground
         source={require('./assets/dungeon.jpeg')}
         style={styles.container}
       >
       <Text style={styles.appName}>DMBook</Text>
       <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {handleLoginPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={require('./assets/icons/login.png')} style={styles.icons} />
                <Text style={styles.buttonText}>{t('Login')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>

       <View style={[styles.buttonContainer, { bottom: 180 }]}>
          <TouchableOpacity style={styles.button} onPress={() => {handleRegistrationPress()}}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
                <Image source={require('./assets/icons/register.png')} style={styles.icons} />
                <Text style={styles.buttonText}>{t('Registration')}</Text>
            </ImageBackground>
          </TouchableOpacity>
       </View>

      <View style={styles.flagsContainer}>
        <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
          <Image source={languages.find(lang => lang.code === currentLang).flag} style={styles.flag} />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            {languages.filter(lang => lang.code !== currentLang).map((lang) => (
              <TouchableOpacity key={lang.code} onPress={() => changeLanguage(lang.code)} style={styles.flagButton}>
                <Image source={lang.flag} style={styles.flag} />
              </TouchableOpacity>
            ))}
          </View>
        )}

      </View>
      </ImageBackground>
);
};
//  <Text style={styles.flagLabel}>{lang.label}</Text>
//  ; console.log('Кнопка "Регистрация" нажата')

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
    fontSize: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    fontWeight: 'bold',
  },
  flagsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 5,
    padding: 5,
    elevation: 5,
  },
  flagButton: {
    marginVertical: 5,
  },
  flag: {
    width: 50,
    height: 30,
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

export default HomeScreen;
