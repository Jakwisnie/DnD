import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import PlayerCharacter from './PlayerCharacter';

const CharacterDetail = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [characterData, setCharacterData] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState('CharacterDetail');


  const handleGoBack = () => {
     navigation.navigate('Characters');
  };

  return (
  <ImageBackground
         source={require('./assets/dungeon.jpeg')}
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
  dropdownContainer: {
    position: 'absolute',
    top: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '40%',
  },
  picker: {
    height: 50,
    width: '101%',
    color: '#d6d6d6',
  },



  GoBack: {
    position: 'absolute',
    top: 42,
    left: 20,
    width: '20%',
    borderColor: '#7F7F7F',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
  },
      GoBackText: {
        color: '#d6d6d6',
      },
    });

export default CharacterDetail;