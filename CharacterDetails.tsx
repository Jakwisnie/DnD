import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity,ScrollView, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import PlayerCharacter from './PlayerCharacter';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';
import { Appearance } from 'react-native';

Appearance.setColorScheme('light');

const CharacterDetail = ({ route,navigation }) => {
  const { characterData } =  route.params;
  const { t, i18n } = useTranslation();
  const [character, setCharacter] = useState(characterData);
  const [selectedScreen, setSelectedScreen] = useState('CharacterDetail');
  const { theme } = useContext(ThemeContext);

  const handleGoBack = () => {
     navigation.navigate('Characters',{characterData:character});
  };

  return (
    <ImageBackground
      source={theme.background}
      style={styles.container}
    >

    <Text style={[styles.appName, { color: theme.fontColor }]}>{t('CharacterDetails')}</Text>

      <View style={styles.dropdownContainerCharacter}>
        <Picker
          selectedValue={selectedScreen}
          style={styles.pickerChooseChar}
          onValueChange={(itemValue) => {
            setSelectedScreen(itemValue);
            navigation.navigate(itemValue,{characterData:character});
          }}
        >
          <Picker.Item label={t('Main Scene')} value="Character1" />
          <Picker.Item label={t('Inventory')} value="Inventory" />
          <Picker.Item label={t('Character Details')} value="CharacterDetails" />
        </Picker>
      </View>

      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={() => {handleGoBack()}} >
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

                        <View style={styles.featsContainerColumn}>
                      <View style={styles.additionalInfoTitle}>
                        <Text style={styles.modalSubTitleFeats}>{character.name}</Text>
                        </View>
                        </View>
                      <View style={styles.additionalInfo}>
                            <Text style={styles.featStatSmall}>{character.description}</Text>
                          </View>
                      <View style={styles.additionalInfo}>
                            <Text style={styles.featStatSmall}>{character.alignment}</Text>
                          </View>
                      <View style={styles.additionalInfo}>
                            <Text style={styles.featStatSmall}>{t('Speed')}: {character.playerSpecies[0].speed}</Text>
                          </View>
                       <View style={styles.additionalInfo}>
                         <Text style={styles.featStatSmall}>{t('Species')}:</Text>
                         {Array.isArray(character.playerSpecies) && character.playerSpecies.length > 0 ? (
                           character.playerSpecies.map((species, index) => (
                             <View key={index} style={{ marginBottom: 10 }}>
                               <Text style={styles.featStatSmall}>Name: {species.name}</Text>

                               {species.description && species.description.trim() !== '' && (
                                 <Text style={styles.featStatSmall}>Description: {species.description}</Text>
                               )}

                               <Text style={styles.featStatSmall}>Size: {species.size}</Text>

                               {species.mainSpecies && species.mainSpecies.trim() !== '' && (
                                 <Text style={styles.featStatSmall}>Main species: {species.mainSpecies}</Text>
                               )}

                               {Array.isArray(species.feats) && species.feats.length > 0 ? (
                                 <View style={{ marginLeft: 10 }}>
                                   <Text style={styles.featStatSmall}>Feats:</Text>
                                   {species.feats.map((feat, featIndex) => (
                                     <Text key={featIndex} style={styles.featStatSmall}>
                                       - {feat}
                                     </Text>
                                   ))}
                                 </View>
                               ) : (
                                 <Text style={styles.featStatSmall}>No feats available</Text>
                               )}
                             </View>
                           ))
                         ) : (
                           <Text style={styles.featStatSmall}>{t('No species available')}</Text>
                         )}
                       </View>
      </ImageBackground>
);
};

export default CharacterDetail;