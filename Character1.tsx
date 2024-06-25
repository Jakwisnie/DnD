import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import PlayerCharacter from './PlayerCharacter';

const Character1 = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [characterData, setCharacterData] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState('Character1');
  const [health, setHealth] = useState(100);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/player_characters/0');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCharacterData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error fetching data
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Characters');
  };

  const handleStatPress = (statValue) => {
    navigation.navigate('RzutKostka_Bonus', { statValue });
  };

  const calculateLargerNumber = (value) => {
    const largerNumber = Math.floor((value - 10) / 2);
    return largerNumber >= 0 ? `${largerNumber}` : `${largerNumber}`;
  };

  const handleHealthChange = (amount) => {
    setHealth(prevHealth => Math.max(0, Math.min(100, prevHealth + amount)));
  };

  if (!characterData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const player = new PlayerCharacter(
    characterData.strScore,
    characterData.dexScore,
    characterData.conScore,
    characterData.intScore,
    characterData.wisScore,
    characterData.chaScore,
    characterData.armorClass,
    calculateLargerNumber(characterData.dexScore)
  );

  return (
    <ImageBackground source={require('./assets/dungeon.jpeg')} style={styles.container}>
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
      <View style={styles.imageContainer}>
        <Image source={require('./assets/assasin.jpeg')} style={styles.image} />
      </View>

      <View style={styles.healthContainer}>
       <Text style={styles.statText}>Health: {health}</Text>
        <View style={styles.healthBar}>
          <View style={[styles.healthFill, { width: `${health}%` }]} />
        </View>
        <TouchableOpacity style={styles.healthButton} onPress={() => handleHealthChange(10)}>
          <Text style={styles.healthText}>Heal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.damageButton} onPress={() => handleHealthChange(-10)}>
          <Text style={styles.damageText}>Damage</Text>
        </TouchableOpacity>
       </View>

      <View style={styles.statsContainer}>
      <View style={styles.blackLeftContainer}>
        <TouchableOpacity onPress={() => handleStatPress(calculateLargerNumber(player.STR))}>
          <View style={styles.statBox}>
            <Text style={styles.largeText}>{calculateLargerNumber(player.STR)}</Text>
            <Text style={styles.statText}>{`STR: ${player.STR}`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatPress(calculateLargerNumber(player.DEX))}>
          <View style={styles.statBox}>
            <Text style={styles.largeText}>{calculateLargerNumber(player.DEX)}</Text>
            <Text style={styles.statText}>{`DEX: ${player.DEX}`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatPress(calculateLargerNumber(player.CON))}>
          <View style={styles.statBox}>
            <Text style={styles.largeText}>{calculateLargerNumber(player.CON)}</Text>
            <Text style={styles.statText}>{`CON: ${player.CON}`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatPress(calculateLargerNumber(player.INT))}>
          <View style={styles.statBox}>
            <Text style={styles.largeText}>{calculateLargerNumber(player.INT)}</Text>
            <Text style={styles.statText}>{`INT: ${player.INT}`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatPress(calculateLargerNumber(player.WIS))}>
          <View style={styles.statBox}>
            <Text style={styles.largeText}>{calculateLargerNumber(player.WIS)}</Text>
            <Text style={styles.statText}>{`WIS: ${player.WIS}`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleStatPress(calculateLargerNumber(player.CHA))}>
          <View style={styles.statBox}>
            <Text style={styles.largeText}>{calculateLargerNumber(player.CHA)}</Text>
            <Text style={styles.statText}>{`CHA: ${player.CHA}`}</Text>
          </View>
        </TouchableOpacity>

      <View style={styles.leftContainer}>
        <View style={styles.circleBox}>
          <Text style={styles.circleText}>{player.AC}</Text>
          <Text style={styles.circleLabel}>AC</Text>
        </View>
        <View style={styles.circleBox}>
          <Text style={styles.circleText}>{player.INIT}</Text>
          <Text style={styles.circleLabel}>Initiative</Text>
        </View>
        <View style={styles.circleBox}>
          <Text style={styles.circleText}>{player.Proficiency}</Text>
          <Text style={styles.circleLabel}>Proficiency</Text>
        </View>
      </View>

        <TouchableOpacity >
        <View style={styles.EditBox}>
          <Text style={styles.EditText}>Edit Character</Text>
        </View>
        </TouchableOpacity>

      </View>
      </View>



      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
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
  blackLeftContainer: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderColor: '#7F7F7F',
    borderWidth: 1,
  },
  statsContainer: {
    position: 'absolute',
    top: 80,
    left: 0,
  },
  statBox: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 1.0)',
    borderColor: '#7F7F7F',
    borderWidth: 1,
    alignItems: 'center',
  },
  largeText: {
    fontSize: 24,
    color: '#d6d6d6',
    marginBottom: 5,
  },
  statText: {
    color: '#d6d6d6',
  },
  circleBox: {
      width: 70,
      height: 70,
      borderRadius: 100,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      borderColor: '#7F7F7F',
      borderWidth: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleText: {
      fontSize: 24,
      color: '#ffffff',
    },
    circleLabel: {
      marginBottom: 10,
      fontSize: 12,
      color: '#d6d6d6',
    },
imageContainer: {
    position: 'absolute',
    top: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  healthContainer: {
    position: 'absolute',
    top: '19%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthBar: {
    width: '120%',
    height: 15,
    backgroundColor: '#555',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  healthText: {
    color: 'green',
  },
  damageText: {
    color: 'red',
  },
  healthFill: {
    height: '100%',
    backgroundColor: 'red',
  },
  healthButton: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'green',
    padding: 10,
    right: 90,
    bottom: 60,
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
    borderRadius: 10,
    width: 75,
    height: 50,
    alignItems: 'center',
  },
  damageButton: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    padding: 10,
    left: 90,
    bottom: 110,
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
    borderRadius: 10,
    width: 75,
    height: 50,
    alignItems: 'center',
  },
  EditBox: {
    marginTop: 25,
    padding: 10,
    width: 70,
    backgroundColor: 'rgba(0, 0, 0, 1.0)',
    borderColor: '#7F7F7F',
    borderWidth: 1,
    alignItems: 'center',
  },
  EditText: {
    fontSize: 10,
    color: '#d6d6d6',
  },
});

export default Character1;