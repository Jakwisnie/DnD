import React, { useState, useContext } from 'react';
import { ImageBackground, TouchableOpacity, Image, Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation, HeaderBackButton } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { UserData } from './UserData';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const LogInScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const { loginUser } = useContext(UserData);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistrationPress = () => {
    navigation.navigate('Registration');
  };
  const handleGoBack = () => {
    navigation.navigate('Home');
  };
  const handleForgotPassPress = () => {
    navigation.navigate('ForgotPass');
  };

  const handleKontoGoogle = () => {
    navigation.navigate('KontoGoogle');
  };

  const handleKontoFacebook = () => {
    navigation.navigate('KontoFacebook');
  };

  const handleKontoApple = () => {
    navigation.navigate('KontoApple');
  };

  const handleKontynuacja = () => {
      const user = loginUser(login, password);
      if (user) {
            navigation.navigate('SelectionRole');
      } else {
        alert(t('Invalid login or password'));
      }
    };

  return (
  <ImageBackground
    style={styles.container}
         source={theme.background}
    resizeMode="cover">

    <Text style={styles.appName}>DMBook</Text>

    {/* Залогинься */}
    <Text style={styles.title}>{t('Log_in')}</Text>

    {/* Новый пользователь */}
    <View style={styles.newUser}>
       <Text style={styles.newUserText}>{t('New_user')}?</Text>
       <TouchableOpacity style={[styles.buttonUser, {width: '200%' }]} onPress={() => {handleRegistrationPress()}}>
           <Text style={styles.buttonUserText}>{t('Create_account')}</Text>
       </TouchableOpacity>
    </View>

    {/* Поле для логина */}
    <Text style={styles.labelLogin}>{t('Login_nick')}</Text>
    <TextInput style={styles.inputLogin}
    value={login}
    onChangeText={setLogin}
    placeholder={t('Login_nick')} />

    {/* Поле для пароля */}
    <Text style={styles.labelPassword}>{t('Pass')}</Text>
    <TextInput style={styles.inputPassword}
    value={password}
    onChangeText={setPassword}
    placeholder={t('Pass')} secureTextEntry={true} />

    {/* Забыл пароль */}
    <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => {handleForgotPassPress()}}>
       <Text style={styles.forgotPasswordButtonText}>{t('Forgot_pass')}?</Text>
    </TouchableOpacity>

    {/* Продолжить */}
    <TouchableOpacity style={styles.continueButton} onPress={() => {handleKontynuacja()}}>
      <Text style={styles.continueButtonText}>{t('Continue')}</Text>
    </TouchableOpacity>

    {/* Разделитель */}
    <View style={styles.separator}>
    <View style={styles.separatorLine} />
       <Text style={styles.separatorText}>{t('or')}</Text>
    <View style={styles.separatorLine} />
    </View>

    {/* аккаунты */}
    <View style={styles.media}>
       <TouchableOpacity style={styles.socialGoogle} onPress={() => {handleKontoGoogle()}}>
          <Image source={require('./assets/google.webp')} style={styles.googleicon} />
          <Text style={styles.socialButtonText}>{t('Use_Google')}</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.socialFacebook} onPress={() => {handleKontoFacebook()}}>
          <Image source={require('./assets/facebook.jpg')} style={styles.facebookicon} />
          <Text style={styles.socialButtonText}>{t('Use_Facebook')}</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.socialApple} onPress={() => {handleKontoApple()}}>
          <Image source={require('./assets/apple.webp')} style={styles.appleicon} />
          <Text style={styles.socialButtonText}>{t('Use_Apple')}</Text>
       </TouchableOpacity>
    </View>

    <View style={styles.GoBack}>
      <TouchableOpacity style={styles.button} onPress={() => {handleGoBack()}} >
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
            </ImageBackground>
      </TouchableOpacity>
     </View>
    </ImageBackground>
  );
};

export default LogInScreen;