import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const alignments = [
  'Chaotic Evil',
  'Chaotic Good',
  'Chaotic Neutral',
  'Lawful Evil',
  'Lawful Good',
  'Lawful Neutral',
  'Neutral Evil',
  'Neutral Good',
  'True Neutral'
];

const CreateCharacter4 = ({ navigation, route }) => {
  const handleGoBack = () => {
    navigation.navigate('CreateCharacter');
  };

  const { t, i18n } = useTranslation();
  const { selectedClassInfo, nickname } = route.params;

  const handleContinue = () => {
    navigation.navigate('CreateCharacter5', { selectedClassInfo, nickname });
  };

  const [alignment, setAlignment] = useState('');
  const [fate, setFate] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [isCharacterDetailsVisible, setCharacterDetailsVisible] = useState(true);
  const [isPhysicalCharacteristicsVisible, setPhysicalCharacteristicsVisible] = useState(false);
  const [isPersonalCharacteristicsVisible, setPersonalCharacteristicsVisible] = useState(false);
  const [isNotesVisible, setNotesVisible] = useState(false);

  return (
    <ImageBackground
         source={require('./assets/font/dungeon.jpeg')}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Харки */}
        <TouchableOpacity onPress={() => setCharacterDetailsVisible(!isCharacterDetailsVisible)}>
          <Text style={styles.blockTitle}>{t('Character_Details')}</Text>
        </TouchableOpacity>
        {isCharacterDetailsVisible && (
          <View style={styles.blockContent}>
            <Text>Alignment:</Text>
            <Picker
              selectedValue={alignment}
              style={styles.picker}
              onValueChange={(itemValue) => setAlignment(itemValue)}
            >
              {alignments.map((align) => (
                <Picker.Item key={align} label={align} value={align} />
              ))}
            </Picker>

            <Text>Fate:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your fate"
              value={fate}
              onChangeText={setFate}
            />

            <Text>Lifestyle:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your lifestyle"
              value={lifestyle}
              onChangeText={setLifestyle}
            />
          </View>
        )}

        {/* Физ дан */}
        <TouchableOpacity onPress={() => setPhysicalCharacteristicsVisible(!isPhysicalCharacteristicsVisible)}>
          <Text style={styles.blockTitle}>Physical Characteristics</Text>
        </TouchableOpacity>
        {isPhysicalCharacteristicsVisible && (
          <View style={styles.blockContent}>
            <Text>Hair:</Text>
            <TextInput style={styles.input} placeholder="Enter hair description" />

            <Text>Skin:</Text>
            <TextInput style={styles.input} placeholder="Enter skin description" />

            <Text>Eyes:</Text>
            <TextInput style={styles.input} placeholder="Enter eye description" />

            <Text>Height:</Text>
            <TextInput style={styles.input} placeholder="Enter height" />

            <Text>Weight:</Text>
            <TextInput style={styles.input} placeholder="Enter weight" />

            <Text>Age:</Text>
            <TextInput style={styles.input} placeholder="Enter age" />
          </View>
        )}

        {/* Перса */}
        <TouchableOpacity onPress={() => setPersonalCharacteristicsVisible(!isPersonalCharacteristicsVisible)}>
          <Text style={styles.blockTitle}>Personal Characteristics</Text>
        </TouchableOpacity>
        {isPersonalCharacteristicsVisible && (
          <View style={styles.blockContent}>
            <Text>Ideals:</Text>
            <TextInput style={styles.input} placeholder="Enter ideals" />

            <Text>Preferences:</Text>
            <TextInput style={styles.input} placeholder="Enter preferences" />

            <Text>Other:</Text>
            <TextInput style={styles.input} placeholder="Enter other personal characteristics" />
          </View>
        )}

        {/* Заметки */}
        <TouchableOpacity onPress={() => setNotesVisible(!isNotesVisible)}>
          <Text style={styles.blockTitle}>Notes</Text>
        </TouchableOpacity>
        {isNotesVisible && (
          <View style={styles.blockContent}>
            <Text>Organizations:</Text>
            <TextInput style={styles.input} placeholder="Enter organizations" />

            <Text>Enemies:</Text>
            <TextInput style={styles.input} placeholder="Enter enemies" />

            <Text>Allies:</Text>
            <TextInput style={styles.input} placeholder="Enter allies" />

            <Text>Backstory:</Text>
            <TextInput style={styles.input} placeholder="Enter backstory" multiline />

            <Text>Other Notes:</Text>
            <TextInput style={styles.input} placeholder="Enter other notes" multiline />
          </View>
        )}

        <View style={styles.ConButton}>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.ConButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.GoBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CreateCharacter4;
