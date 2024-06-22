import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from "./characterStyles";
import {useTranslation} from 'react-i18next';

const Character2 = ({navigation}) => {
  const handleGoBack = () => {
    navigation.navigate('Characters');
  };

  const {t, i18n} = useTranslation();

  return (
    <ImageBackground
      source={require('../../../assets/Char2.jpg')}
      style={styles.container}>
      <View style={styles.GoBack}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleGoBack();
          }}>
          <Text style={styles.GoBackText}>{t('Go_back')}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};



export default Character2;
