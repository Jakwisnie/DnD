import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const items = require('./assets/Library/items.json');

const Items = ({ navigation }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [openFilters, setOpenFilters] = useState([]);

  const priceRanges = [
    [0, 50],
    [51, 500],
    [501, 5000],
    [5001, 10000]
  ];

  const toggleFilter = (filterName) => {
    setOpenFilters((prevFilters) => {
      if (prevFilters.includes(filterName)) {
        return prevFilters.filter((filter) => filter !== filterName);
      } else {
        return [...prevFilters, filterName];
      }
    });
  };

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
    setOpenFilters([]);
  };

  const filteredItems = filterItems();

  return (
    <ImageBackground
         source={theme.background}
      style={styles.container}
    >
      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
          </ImageBackground>
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
        <TouchableOpacity onPress={() => toggleFilter('Type')} style={[styles.filterToggle, openFilters.includes('Type') && styles.activeFilterToggle]}>
          <Text style={styles.filterToggleText}>{t('Type')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFilter('Rarity')} style={[styles.filterToggle, openFilters.includes('Rarity') && styles.activeFilterToggle]}>
          <Text style={styles.filterToggleText}>{t('Rarity')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFilter('Price')} style={[styles.filterToggle, openFilters.includes('Price') && styles.activeFilterToggle]}>
          <Text style={styles.filterToggleText}>{t('Price')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.filterOptionsContainer}>
        {openFilters.map((filter, index) => (
          <View key={index} style={styles.filterBlock}>
            {filter === 'Type' && (
              <View style={styles.filterOptions}>
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
              </View>
            )}
            {filter === 'Rarity' && (
              <View style={styles.filterOptions}>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                {['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'].map(rarity => (
                  <TouchableOpacity
                    key={rarity}
                    style={[styles.filterButton, selectedRarity === rarity && styles.selectedFilterButton]}
                    onPress={() => setSelectedRarity(rarity === selectedRarity ? null : rarity)}
                  >
                    <Text style={styles.filterButtonText}>{t(rarity)}</Text>
                  </TouchableOpacity>
                ))}
               </ScrollView>
              </View>
            )}
            {filter === 'Price' && (
              <View style={styles.filterOptions}>
               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                {priceRanges.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.filterButton, selectedPriceRange === index && styles.selectedFilterButton]}
                    onPress={() => setSelectedPriceRange(index === selectedPriceRange ? null : index)}
                  >
                    <Text style={styles.filterButtonText}>{t('Price')} {range[0]} - {range[1]}</Text>
                  </TouchableOpacity>
                ))}
               </ScrollView>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

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

export default Items;
