import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const feats = require('./assets/Library/feats.json');

const Feats = ({ navigation }) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [selectedCR, setSelectedCR] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState(null);
  const [openFilters, setOpenFilters] = useState([]);
  const [selectedFeat, setSelectedFeat] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleFilter = (filterName) => {
    setOpenFilters((prevFilters) =>
      prevFilters.includes(filterName)
        ? prevFilters.filter((filter) => filter !== filterName)
        : [...prevFilters, filterName]
    );
  };

  const filterFeats = () => {
    let filtered = feats;

    if (searchText) {
      filtered = filtered.filter((feat) =>
        feat.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCR !== null) {
      filtered = filtered.filter((feat) => feat.cr === selectedCR);
    }

    if (selectedType) {
      filtered = filtered.filter((feat) => feat.type === selectedType);
    }

    if (selectedEnvironment) {
      filtered = filtered.filter((feat) => feat.environment === selectedEnvironment);
    }

    return filtered;
  };

  const resetFilters = () => {
    setSelectedCR(null);
    setSelectedType(null);
    setSelectedEnvironment(null);
    setOpenFilters([]);
  };

  const filteredFeats = filterFeats();

  const handleFeatPress = (feat) => {
    setSelectedFeat(feat);
  };

  const closeFeatModal = () => {
    setSelectedFeat(null);
  };

  return (
    <ImageBackground source={theme.background} style={styles.container}>
      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder={t('Search feats')}
        placeholderTextColor="#7F7F7F"
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterContainerItemMon}>
        <TouchableOpacity
          onPress={() => toggleFilter('CR')}
          style={[styles.filterToggle, openFilters.includes('CR') && styles.activeFilterToggle]}
        >
          <Text style={styles.filterToggleText}>{t('CR')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFilter('Type')}
          style={[styles.filterToggle, openFilters.includes('Type') && styles.activeFilterToggle]}
        >
          <Text style={styles.filterToggleText}>{t('Type')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleFilter('Environment')}
          style={[styles.filterToggle, openFilters.includes('Environment') && styles.activeFilterToggle]}
        >
          <Text style={styles.filterToggleText}>{t('Environment')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.filterOptionsContainer}>
        {openFilters.map((filter, index) => (
          <View key={index} style={styles.filterBlock}>
            {filter === 'CR' && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.crFilter}>
                {[0.25, 1, 2, 5, 10, 20, 24].map((cr) => (
                  <TouchableOpacity
                    key={cr}
                    style={[styles.filterButton, selectedCR === cr && styles.selectedFilterButton]}
                    onPress={() => setSelectedCR(cr === selectedCR ? null : cr)}
                  >
                    <Text style={styles.filterButtonText}>{t('CR')} {cr}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            {filter === 'Type' && (
              <View style={styles.filterOptions}>
                {['Dragon', 'Humanoid', 'Aberration'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.filterButton, selectedType === type && styles.selectedFilterButton]}
                    onPress={() => setSelectedType(type === selectedType ? null : type)}
                  >
                    <Text style={styles.filterButtonText}>{t(type)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {filter === 'Environment' && (
              <View style={styles.filterOptions}>
                {['Underground', 'Forest', 'Mountains'].map((environment) => (
                  <TouchableOpacity
                    key={environment}
                    style={[styles.filterButton, selectedEnvironment === environment && styles.selectedFilterButton]}
                    onPress={() => setSelectedEnvironment(environment === selectedEnvironment ? null : environment)}
                  >
                    <Text style={styles.filterButtonText}>{t(environment)}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <ScrollView style={styles.monsterContainer}>
        {filteredFeats.length === 0 ? (
          <Text style={styles.noResultsText}>{t('No feats found')}</Text>
        ) : (
          filteredFeats.map((feat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.monsterItem}
              onPress={() => handleFeatPress(feat)}
            >
              <Text style={styles.monsterName}>{feat.name}</Text>
              <Text style={styles.monsterDetails}>
                {t('CR')}: {feat.cr} | {t('Type')}: {feat.type} | {t('Environment')}: {feat.environment}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal
        visible={!!selectedFeat}
        transparent={true}
        animationType="slide"
        onRequestClose={closeFeatModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentSpells}>
            <Text style={styles.modalTitleSpells}>{selectedFeat?.name}</Text>
            <Text style={styles.modalDescription}>{selectedFeat?.description}</Text>
            <Text style={styles.modalDetails}>
              {t('CR')}: {selectedFeat?.cr} | {t('Type')}: {selectedFeat?.type} | {t('Environment')}: {selectedFeat?.environment}
            </Text>
            <TouchableOpacity onPress={closeFeatModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>{t('Close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Feats;
