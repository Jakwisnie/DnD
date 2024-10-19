import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const spells = require('./assets/Library/spells.json');

const Spells = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedEffect, setSelectedEffect] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filterSpells = () => {
    let filtered = spells;

    if (searchText) {
      filtered = filtered.filter(spell =>
        spell.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedLevel !== null) {
      filtered = filtered.filter(spell => spell.level === selectedLevel);
    }

    if (selectedEffect) {
      filtered = filtered.filter(spell => spell.effect === selectedEffect);
    }

    return filtered;
  };

  const resetFilters = () => {
    setSelectedLevel(null);
    setSelectedEffect(null);
  };

  const filteredSpells = filterSpells();

  return (
    <ImageBackground
         source={theme.background}
      style={styles.container}
    >
      <View style={styles.goBack}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.goBackText}>{t('Go_back')}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder={t('Search spells')}
        placeholderTextColor="#7F7F7F"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelFilter}>
          {[...Array(10).keys()].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.filterButton,
                selectedLevel === level && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedLevel(level === selectedLevel ? null : level)}
            >
              <Text style={styles.filterButtonText}>{t('Level')} {level}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.effectFilter}>
          {['Attack', 'Defense', 'Support'].map(effect => (
            <TouchableOpacity
              key={effect}
              style={[
                styles.filterButton,
                selectedEffect === effect && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedEffect(effect === selectedEffect ? null : effect)}
            >
              <Text style={styles.filterButtonText}>{t(effect)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.spellContainer}>
        {filteredSpells.length === 0 ? (
          <Text style={styles.noResultsText}>{t('No spells found')}</Text>
        ) : (
          filteredSpells.map((spell, index) => (
            <View key={index} style={styles.spellItem}>
              <Text style={styles.spellName}>{spell.name}</Text>
              <Text style={styles.spellDetails}>
                {t('Level')}: {spell.level} | {t('School')}: {spell.school} | {t('Effect')}: {t(spell.effect)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default Spells;
