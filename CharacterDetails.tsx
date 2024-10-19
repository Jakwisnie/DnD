import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import PlayerCharacter from './PlayerCharacter';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const CharacterDetail = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [characterData, setCharacterData] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState('CharacterDetail');
  const { theme } = useContext(ThemeContext);

  const handleGoBack = () => {
     navigation.navigate('Characters');
  };

  return (
    <ImageBackground
      source={theme.background}
      style={styles.container}
    >

    <Text style={styles.appName}>CharacterDetails</Text>

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedScreen}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedScreen(itemValue);
            navigation.navigate(itemValue);
          }}
        >
          <Picker.Item label="Main Scene" value="Character1" />
          <Picker.Item label="Inventory" value="Inventory" />
          <Picker.Item label="Character Details" value="CharacterDetails" />
        </Picker>
      </View>

       <View style={styles.GoBack}>
      <TouchableOpacity style={styles.button} onPress={() => {handleGoBack()}} >
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
      </TouchableOpacity>
     </View>
      </ImageBackground>
);
};

export default CharacterDetail;