import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

const feats = require('./assets/Library/feats.json');

const Feats = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [selectedCR, setSelectedCR] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const filterMonsters = () => {
    let filtered = feats;

    if (searchText) {
      filtered = filtered.filter(monster =>
        monster.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCR !== null) {
      filtered = filtered.filter(monster => monster.cr === selectedCR);
    }

    if (selectedType) {
      filtered = filtered.filter(monster => monster.type === selectedType);
    }

    if (selectedEnvironment) {
      filtered = filtered.filter(monster => monster.environment === selectedEnvironment);
    }

    return filtered;
  };

  const resetFilters = () => {
    setSelectedCR(null);
    setSelectedType(null);
    setSelectedEnvironment(null);
  };

  const filteredMonsters = filterMonsters();

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
        placeholder={t('Search monsters')}
        placeholderTextColor="#7F7F7F"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.crFilter}>
          {[0.25, 1, 2, 5, 10, 20, 24].map(cr => (
            <TouchableOpacity
              key={cr}
              style={[
                styles.filterButton,
                selectedCR === cr && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedCR(cr === selectedCR ? null : cr)}
            >
              <Text style={styles.filterButtonText}>{t('CR')} {cr}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.typeFilter}>
          {['Dragon', 'Humanoid', 'Aberration'].map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                selectedType === type && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedType(type === selectedType ? null : type)}
            >
              <Text style={styles.filterButtonText}>{t(type)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.environmentFilter}>
          {['Underground', 'Forest', 'Mountains'].map(environment => (
            <TouchableOpacity
              key={environment}
              style={[
                styles.filterButton,
                selectedEnvironment === environment && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedEnvironment(environment === selectedEnvironment ? null : environment)}
            >
              <Text style={styles.filterButtonText}>{t(environment)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.monsterContainer}>
        {filteredMonsters.length === 0 ? (
          <Text style={styles.noResultsText}>{t('No monsters found')}</Text>
        ) : (
          filteredMonsters.map((monster, index) => (
            <View key={index} style={styles.monsterItem}>
              <Text style={styles.monsterName}>{monster.name}</Text>
              <Text style={styles.monsterDetails}>
                {t('CR')}: {monster.cr} | {t('Type')}: {monster.type} | {t('Environment')}: {monster.environment}
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
  crFilter: {
    marginBottom: 10,
  },
  typeFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  environmentFilter: {
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
  monsterContainer: {
    width: '80%',
    marginTop: 20,
  },
  monsterItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
  },
  monsterName: {
    fontSize: 18,
    color: '#d6d6d6',
  },
  monsterDetails: {
    color: '#a1a1a1',
  },
  noResultsText: {
    color: '#d6d6d6',
    fontSize: 18,
  },
});

export default Feats;
