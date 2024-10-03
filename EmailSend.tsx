import React from 'react';
import { ImageBackground, TouchableOpacity, Text, View, Button, StyleSheet, TextInput } from 'react-native';
import { useNavigation, HeaderBackButton } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const EmailSend = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOkPress = () => {
    navigation.navigate('LogIn');
  };

  return (
  <ImageBackground
    style={styles.container}
    source={require('./assets/dungeon.jpeg')}
    resizeMode="cover">

    <Text style={styles.appName}>DMBook</Text>

    <Text style={styles.message}>{t('Password_reset')}</Text>

    <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
       <Text style={styles.okButtonText}>Ok</Text>
    </TouchableOpacity>

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
    message: {
      position: 'absolute',
      top: '41%',
      textAlign: 'center',
      fontSize: 16,
      color: '#d6d6d6',
      width: '80%',
    },
    okButton: {
      position: 'absolute',
      backgroundColor: 'transparent',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 50,
      alignItems: 'center',
      bottom: '40%',
    },
    okButtonText: {
      color: '#d6d6d6',
      fontSize: 20,
      fontWeight: 'bold',
    },
});
 export default EmailSend;