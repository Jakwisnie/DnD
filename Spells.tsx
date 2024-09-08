import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

const spells = require('./assets/Library/spells.json');

const Spells = ({ navigation }) => {
  const { t } = useTranslation();
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
      source={require('./assets/dungeon.jpeg')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  goBack: {
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '20%',
    borderColor: '#7F7F7F',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
  },
  goBackText: {
    color: '#d6d6d6',
  },
  searchInput: {
    marginTop: 100,
    width: '80%',
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    color: '#d6d6d6',
  },
  filterContainer: {
    width: '80%',
    marginTop: 20,
  },
  levelFilter: {
    marginBottom: 10,
  },
  effectFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#777',
  },
  filterButtonText: {
    color: '#d6d6d6',
  },
  spellContainer: {
    width: '80%',
    marginTop: 20,
  },
  spellItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
  },
  spellName: {
    fontSize: 18,
    color: '#d6d6d6',
  },
  spellDetails: {
    color: '#a1a1a1',
  },
  noResultsText: {
    color: '#d6d6d6',
    fontSize: 18,
  },
});

export default Spells;
