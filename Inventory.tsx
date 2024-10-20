import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const Inventory = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [selectedScreen, setSelectedScreen] = useState('Inventory');
  const [items, setItems] = useState([
    { name: 'Arrow', weight: 0.1, quantity: 10, cost: 1 },
    { name: 'Sword', weight: 3, quantity: 1, cost: 15 },
    { name: 'Shield', weight: 6, quantity: 1, cost: 20 },
    { name: 'Helmet', weight: 2, quantity: 1, cost: 10 },
    { name: 'Armor', weight: 15, quantity: 1, cost: 50 },
    { name: 'Boots', weight: 1, quantity: 1, cost: 5 },
    { name: 'Gloves', weight: 0.5, quantity: 1, cost: 2 },
    { name: 'Ring', weight: 0.1, quantity: 1, cost: 25 },
    { name: 'Amulet', weight: 0.2, quantity: 1, cost: 30 },
    { name: 'Boots', weight: 1, quantity: 1, cost: 5 },
    { name: 'Gloves', weight: 0.5, quantity: 1, cost: 2 },
    { name: 'Ring', weight: 0.1, quantity: 1, cost: 25 },
    { name: 'Amulet', weight: 0.2, quantity: 1, cost: 30 },
  ]);

  const handleGoBack = () => {
    navigation.navigate('Characters');
  };

  const calculateTotalWeight = () => {
    return items.reduce((total, item) => total + item.weight * item.quantity, 0).toFixed(2);
  };

  const calculateTotalCost = () => {
    const totalGold = items.reduce((total, item) => total + item.cost * item.quantity, 0);
    return totalGold.toFixed(2);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', weight: 0, quantity: 0, cost: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value === '' ? 0 : value;
    setItems(newItems);
  };

  return (
    <ImageBackground source={theme.background} style={styles.container}>
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

      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Weight</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Cost (gold)</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>
        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <TextInput
              style={styles.tableCell}
              value={item.name}
              onChangeText={(text) => handleItemChange(index, 'name', text)}
            />
            <TextInput
              style={styles.tableCell}
              value={item.weight.toString()}
              onChangeText={(text) => handleItemChange(index, 'weight', parseFloat(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.tableCell}
              value={item.quantity.toString()}
              onChangeText={(text) => handleItemChange(index, 'quantity', parseInt(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.tableCell}
              value={item.cost.toString()}
              onChangeText={(text) => handleItemChange(index, 'cost', parseFloat(text))}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTextLeft}>{calculateTotalWeight()} kg</Text>
        <Text style={styles.summaryTextRight}>{calculateTotalCost()} gold</Text>
      </View>

      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Inventory;
