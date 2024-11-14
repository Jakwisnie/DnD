import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Button, ScrollView, ImageBackground } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const MonsterCreationDescription = ({ navigation }) => {

  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [descriptionType, setDescriptionType] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [isLegendary, setIsLegendary] = useState(false);
  const [monsterDescriptions, setMonsterDescriptions] = useState({
    monsterDescription: '',
    actionsDescription: '',
    bonusActionsDescription: '',
    reactionsDescription: '',
    specialTraitsDescription: '',
    legendaryActionsDescription: '',
  });

  const openDescriptionModal = (type) => {
    setDescriptionType(type);
    setDescriptionText(monsterDescriptions[type]);
    setDescriptionModalVisible(true);
  };

  const closeDescriptionModal = () => setDescriptionModalVisible(false);

  const saveDescription = () => {
    setMonsterDescriptions((prev) => ({ ...prev, [descriptionType]: descriptionText }));
    closeDescriptionModal();
  };

  return (
    <ImageBackground source={theme.background} style={styles.containerMonCre}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.labelMonCre}>{t('Monster Description')}</Text>
        <TouchableOpacity style={styles.inputMonCre} onPress={() => openDescriptionModal('monsterDescription')}>
          <Text>{monsterDescriptions.monsterDescription || t('Enter monster description')}</Text>
        </TouchableOpacity>

        <Text style={styles.labelMonCre}>{t('Actions Description')}</Text>
        <TouchableOpacity style={styles.inputMonCre} onPress={() => openDescriptionModal('actionsDescription')}>
          <Text>{monsterDescriptions.actionsDescription || t('Enter actions description')}</Text>
        </TouchableOpacity>

        <Text style={styles.labelMonCre}>{t('Bonus Action Description')}</Text>
        <TouchableOpacity style={styles.inputMonCre} onPress={() => openDescriptionModal('bonusActionsDescription')}>
          <Text>{monsterDescriptions.bonusActionsDescription || t('Enter bonus action description')}</Text>
        </TouchableOpacity>

        <Text style={styles.labelMonCre}>{t('Reactions Description')}</Text>
        <TouchableOpacity style={styles.inputMonCre} onPress={() => openDescriptionModal('reactionsDescription')}>
          <Text>{monsterDescriptions.reactionsDescription || t('Enter reactions description')}</Text>
        </TouchableOpacity>

        <Text style={styles.labelMonCre}>{t('Special Traits Description')}</Text>
        <TouchableOpacity style={styles.inputMonCre} onPress={() => openDescriptionModal('specialTraitsDescription')}>
          <Text>{monsterDescriptions.specialTraitsDescription || t('Enter special traits description')}</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isLegendary}
              onValueChange={setIsLegendary}
              tintColors={{ true: theme.checkboxActive, false: theme.checkboxInactive }}
            />
            <Text style={styles.label}>{t('Legendary?')}</Text>
          </View>
        </View>

        <Modal visible={descriptionModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainerMonCre}>
            <View style={styles.modalContentMonCre}>
              <Text style={styles.modalTitleMonCre}>{t(descriptionType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))}</Text>
              <TextInput
                style={styles.modalInputMonCre}
                multiline
                placeholder={t(`Enter ${descriptionType.replace(/([A-Z])/g, ' $1').toLowerCase()}`)}
                value={descriptionText}
                onChangeText={setDescriptionText}
              />
              <Button title={t('Save')} onPress={saveDescription} />
              <Button title={t('Cancel')} onPress={closeDescriptionModal} />
            </View>
          </View>
        </Modal>
      </ScrollView>

      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go back')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MonsterCreationDescription;