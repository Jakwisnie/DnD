import React, { useState, useContext } from 'react';
import { ImageBackground, TouchableOpacity, Image, Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation, HeaderBackButton } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { UserData, useUserData } from './UserData';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';


const LogInScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const { updateId } = useUserData();
  const { loginUser } = useContext(UserData);
  const [login, setLogin] = useState('');
  const [answer,setAnswer] = useState(0);
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

      if (login && password) {
            const fetchData = async () => {
                      try {
                          const response = await fetch('http://172.20.10.12:8000/user/login', {
                              method: 'POST',
                              headers: {
                                  'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                  nickname: login,
                                  password: password,
                              }),
                          });
                          if (!response.ok) {
                              const errorDetails = await response.text();
                              throw new Error(`Failed to fetch data: ${errorDetails}`);
                          }
                          const data = await response.json();
                          setAnswer(Number(data));


                          if (answer === 1) {
                              updateId(answer);
                              navigation.navigate('SelectionRole');
                          } else {
                              alert(t(data));
                          }
                      } catch (error) {
                          console.error('Error fetching data:', error);
                      }
                  };
                  fetchData();
              } else {
                  alert(t('Invalid login or password'));
              }
    };

  return (
  <ImageBackground
    style={styles.container}
    source={theme.background}
    resizeMode="cover">

      <Text style={[styles.appName, { color: theme.fontColor }]}>DMBook</Text>

    <Text style={[styles.titleLogin, { color: theme.textColor }]}>{t('Log in')}</Text>

    <View style={styles.newUser}>
       <Text style={[styles.newUserText, { color: theme.textColor }]}>{t('New_user')}?</Text>
       <TouchableOpacity style={styles.buttonUser } onPress={() => {handleRegistrationPress()}}>
           <Text style={styles.buttonUserText}>{t('Create_account')}</Text>
       </TouchableOpacity>
    </View>

    <Text style={[styles.labelLogin, { color: theme.textColor }]}>{t('Login_nick')}</Text>
    <TextInput style={styles.inputLogin}
    value={login}
    onChangeText={setLogin}
    placeholder={t('Login_nick')} />

    <Text style={[styles.labelPassword, { color: theme.textColor }]}>{t('Pass')}</Text>
    <TextInput style={styles.inputPassword}
    value={password}
    onChangeText={setPassword}
    placeholder={t('Pass')} secureTextEntry={true} />

    <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => {handleForgotPassPress()}}>
       <Text style={styles.forgotPasswordButtonText}>{t('Forgot_pass')}?</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.continueButton} onPress={() => {handleKontynuacja()}}>
      <Text style={[styles.continueButtonText, { color: theme.textColor }]}>{t('Continue')}</Text>
    </TouchableOpacity>

    <View style={styles.separator}>
    <View style={styles.separatorLine} />
       <Text style={[styles.separatorText, { color: theme.textColor }]}>{t('or')}</Text>
    <View style={styles.separatorLine} />
    </View>

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
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
};

export default LogInScreen;