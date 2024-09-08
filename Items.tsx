import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

const items = require('./assets/Library/items.json');

const Items = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const priceRanges = [
    [0, 50],
    [51, 500],
    [501, 5000],
    [5001, 10000]
  ];

  const filterItems = () => {
    let filtered = items;

    if (searchText) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    if (selectedRarity) {
      filtered = filtered.filter(item => item.rarity === selectedRarity);
    }

    if (selectedPriceRange !== null) {
      const [min, max] = priceRanges[selectedPriceRange];
      filtered = filtered.filter(item => item.price >= min && item.price <= max);
    }

    return filtered;
  };

  const resetFilters = () => {
    setSelectedType(null);
    setSelectedRarity(null);
    setSelectedPriceRange(null);
  };

  const filteredItems = filterItems();

  return (
    <ImageBackground
      source={require('./assets/dungeon.jpeg')}
      style={styles.container}
    >
      <View style={styles.goBack}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>{t('Go_back')}</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder={t('Search items')}
        placeholderTextColor="#7F7F7F"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['Weapon', 'Armor', 'Potion', 'Scroll', 'Tool'].map(type => (
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
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'].map(rarity => (
            <TouchableOpacity
              key={rarity}
              style={[
                styles.filterButton,
                selectedRarity === rarity && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedRarity(rarity === selectedRarity ? null : rarity)}
            >
              <Text style={styles.filterButtonText}>{t(rarity)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {priceRanges.map((range, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                selectedPriceRange === index  && styles.selectedFilterButton
              ]}
              onPress={() => setSelectedPriceRange(index  === selectedPriceRange ? null : index )}
            >
              <Text style={styles.filterButtonText}>{t('Price')} {range[0]} - {range[1]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.itemContainer}>
        {filteredItems.length === 0 ? (
          <Text style={styles.noResultsText}>{t('No items found')}</Text>
        ) : (
          filteredItems.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {t('Type')}: {item.type} | {t('Rarity')}: {item.rarity} | {t('Price')}: {item.price} gp
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
  filterScroll: {
    marginBottom: 10,
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
  itemContainer: {
    width: '80%',
    marginTop: 20,
  },
  item: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
  },
  itemName: {
    fontSize: 18,
    color: '#d6d6d6',
  },
  itemDetails: {
    color: '#a1a1a1',
  },
  noResultsText: {
    color: '#d6d6d6',
    fontSize: 18,
  },
});

export default Items;
