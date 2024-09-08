import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import PlayerCharacter from './PlayerCharacter';

const Character1 = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [characterData, setCharacterData] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState('Character1');
  const [health, setHealth] = useState(100);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [bonusVisible, setBonusVisible] = useState(false);
  const [reactVisible, setReactVisible] = useState(false);
  const [selectedRomanNumeral, setSelectedRomanNumeral] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/player_characters/get/0');
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

  const handleRollDice = () => {
    navigation.navigate('RzutKostka');
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

  const toggleSkills = () => {
    setSkillsVisible(!skillsVisible);
    setBonusVisible(false);
    setReactVisible(false);
    setActionVisible(false);
    setSelectedRomanNumeral(null);
  };

  const toggleAction = () => {
    setActionVisible(!actionVisible);
    setBonusVisible(false);
    setReactVisible(false);
    setSkillsVisible(false);
    setSelectedRomanNumeral(null);
  };

  const toggleBonus = () => {
    setBonusVisible(!bonusVisible);
    setActionVisible(false);
    setReactVisible(false);
    setSkillsVisible(false);
    setSelectedRomanNumeral(null);
  };

  const toggleReact = () => {
    setReactVisible(!reactVisible);
    setActionVisible(false);
    setBonusVisible(false);
    setSkillsVisible(false);
    setSelectedRomanNumeral(null);
  };

  const handleRomanNumeralPress = (label) => {
    if (selectedRomanNumeral === label) {
      setSelectedRomanNumeral(null);
    } else {
      setActionVisible(false);
      setBonusVisible(false);
      setSkillsVisible(false);
      setReactVisible(false);
      setSelectedRomanNumeral(label);
    }
  };

  const abilitiesData = {
    I: [{ image: require('./assets/skills/bootofspeed.png') }, { image: require('./assets/skills/powershot.png') }],
    II: [{ image: require('./assets/skills/icesword.png') }],
    //...
  };

  const AbilitiesWindow = ({ abilities }) => {
    const [showPowerLevels, setShowPowerLevels] = useState(false);

    const handleImagePress = () => {
      setShowPowerLevels(!showPowerLevels);
    };

    return (
      <View style={styles.abilityWindow}>
        <View style={styles.skillsContainer}>
          {abilities.map((ability, index) => (
            <TouchableOpacity key={index} onPress={handleImagePress}>
              <Image source={ability.image} style={styles.abilityImage} />
            </TouchableOpacity>
          ))}
        </View>

        {showPowerLevels && (
          <View style={styles.powerLevels}>
            {['I', 'II', 'III', 'IV', 'V', 'VI'].map((label, index) => (
              <TouchableOpacity key={index} style={styles.rightButton}>
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const ActionWindow = ({ onClose }) => {
    const [showPowerLevels, setShowPowerLevels] = useState(false);

    const handleImagePress = () => {
      setShowPowerLevels(!showPowerLevels);
    };

    return (
      <View style={styles.abilityWindow}>
        <View style={styles.skillsContainer}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={require('./assets/skills/firearrow.png')} style={styles.abilityImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={require('./assets/skills/powershot.png')} style={styles.abilityImage} />
          </TouchableOpacity>
        </View>

        {showPowerLevels && (
          <View style={styles.powerLevels}>
            {['I', 'II', 'III', 'IV', 'V', 'VI'].map((label, index) => (
              <TouchableOpacity key={index} style={styles.rightButton}>
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const BonusWindow = ({ onClose }) => {
    const [showPowerLevels, setShowPowerLevels] = useState(false);

    const handleImagePress = () => {
      setShowPowerLevels(!showPowerLevels);
    };

    return (
      <View style={styles.abilityWindow}>
        <View style={styles.skillsContainer}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={require('./assets/skills/powershot.png')} style={styles.abilityImage} />
          </TouchableOpacity>
        </View>

        {showPowerLevels && (
          <View style={styles.powerLevels}>
            {['I', 'II', 'III', 'IV', 'V', 'VI'].map((label, index) => (
              <TouchableOpacity key={index} style={styles.rightButton}>
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const ReactWindow = ({ onClose }) => {
    const [showPowerLevels, setShowPowerLevels] = useState(false);

    const handleImagePress = () => {
      setShowPowerLevels(!showPowerLevels);
    };

    return (
      <View style={styles.abilityWindow}>
        <View style={styles.skillsContainer}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={require('./assets/skills/firearrow.png')} style={styles.abilityImage} />
          </TouchableOpacity>
        </View>

        {showPowerLevels && (
          <View style={styles.powerLevels}>
            {['I', 'II', 'III', 'IV', 'V', 'VI'].map((label, index) => (
              <TouchableOpacity key={index} style={styles.rightButton}>
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

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

  const skills = [
    { mod: 'DEX', skill: 'Acrobatics', bonus: 3 },
    { mod: 'WIS', skill: 'Animal Handling', bonus: -1 },
    { mod: 'INT', skill: 'Arcana', bonus: 10 },
    { mod: 'STR', skill: 'Athletics', bonus: 5 },
    { mod: 'CHA', skill: 'Deception', bonus: -1 },
    { mod: 'INT', skill: 'History', bonus: 10 },
    { mod: 'WIS', skill: 'Insight', bonus: -1 },
    { mod: 'CHA', skill: 'Intimidation', bonus: -1 },
    { mod: 'INT', skill: 'Investigation', bonus: 10 },
    { mod: 'WIS', skill: 'Medicine', bonus: -1 },
    { mod: 'INT', skill: 'Nature', bonus: 5 },
    { mod: 'WIS', skill: 'Perception', bonus: -1 },
    { mod: 'CHA', skill: 'Performance', bonus: -1 },
    { mod: 'CHA', skill: 'Persuasion', bonus: -1 },
    { mod: 'INT', skill: 'Religion', bonus: 10 },
    { mod: 'DEX', skill: 'Sleight of Hand', bonus: 3 },
    { mod: 'DEX', skill: 'Stealth', bonus: 3 },
    { mod: 'WIS', skill: 'Survival', bonus: -1 },
  ];

  const getProficiencyColor = (bonus) => {
    if (bonus >= 10) {
      return '#000000';
    } else if (bonus >= 5) {
      return '#555555';
    } else if (bonus >= 0) {
      return '#AAAAAA';
    } else {
      return '#FFFFFF';
    }
  };

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

        <TouchableOpacity style={styles.EditBox}>
          <Text style={styles.EditText}>Edit Character</Text>
        </TouchableOpacity>
      </View>
      </View>


      <TouchableOpacity style={styles.Skills} onPress={toggleSkills}>
        <Text style={styles.SkillsText}>Skills</Text>
      </TouchableOpacity>

      {skillsVisible && (
        <View style={styles.skillsWindow}>
          <View style={styles.skillRow}>
            <Text style={[styles.headerText, {right: '70%' }]}>Prof.</Text>
            <Text style={[styles.headerText, {right: '150%' }]}>Mod.</Text>
            <Text style={[styles.headerText, {right: '60%' }]}>Skill</Text>
            <Text style={[styles.headerText, {left: '320%' }]}>Bonus</Text>
          </View>
          <ScrollView>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillRow}>
                <View
                  style={[
                    styles.circle,
                    { backgroundColor: getProficiencyColor(skill.bonus) },
                  ]}
                />
                <Text style={styles.skillMod}>{skill.mod}</Text>
                <Text style={styles.skillName}>{skill.skill}</Text>
                <View style={styles.bonusBox}>
                  <Text style={styles.skillBonus}>{skill.bonus >= 0 ? `+${skill.bonus}` : skill.bonus}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.rightContainer}>
      <TouchableOpacity style={styles.rightButton} onPress={toggleAction}>
        <Text style={styles.buttonText}>Action</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightButton} onPress={toggleBonus}>
        <Text style={styles.buttonText}>Bonus</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightButton} onPress={toggleReact}>
        <Text style={styles.buttonText}>React</Text>
      </TouchableOpacity>
        {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'].map((label, index) => (
          <TouchableOpacity key={index} style={styles.rightButton} onPress={() => handleRomanNumeralPress(label)}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedRomanNumeral && <AbilitiesWindow abilities={abilitiesData[selectedRomanNumeral] || []} />}

      {actionVisible && <ActionWindow />}
      {bonusVisible && <BonusWindow />}
      {reactVisible && <ReactWindow />}

        <View style={styles.diceTurnContainer}>
          <TouchableOpacity style={styles.TurnDiceButton}>
            <Text style={styles.rightTurnDiceText}>New Turn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TurnDiceButton} onPress={() => {handleRollDice()}}>
            <Text style={styles.rightTurnDiceText}>Roll Dice</Text>
          </TouchableOpacity>
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
    bottom: 0,
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
  Skills: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 25,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderColor: '#7F7F7F',
    borderWidth: 1,
    alignItems: 'center',
  },
  SkillsText: {
    fontSize: 20,
    color: '#d6d6d6',
  },
  skillsWindow: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 30,
    zIndex: 1,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  skillMod: {
    width: 50,
  },
  skillName: {
    flex: 1,
  },
  skillBonus: {
    width: 50,
    textAlign: 'center',
  },
  bonusBox: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 1,
    marginRight: 10,
  },
  headerText: {
    width: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rightContainer: {
    position: 'absolute',
    top: '10%',
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: '#7F7F7F',
    borderWidth: 2,
  },
  rightButton: {
    padding: 10,
    paddingBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 1.0)',
    borderColor: '#7F7F7F',
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#d6d6d6',
  },
  abilityWindow: {
    position: 'absolute',
    top: '25%',
    backgroundColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F7F7F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  abilityImage: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  powerLevels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  diceTurnContainer: {
    position: 'absolute',
    bottom: 10,
    left: '40%',
    width: '100%',
    alignItems: 'center',
  },
  TurnDiceButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderColor: '#7F7F7F',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightTurnDiceText: {
    fontSize: 14,
    color: '#d6d6d6',
  },
});

export default Character1;