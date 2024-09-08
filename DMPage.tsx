import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';

const DMPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginPress = () => {
    navigation.navigate('LogIn');
  };

  const handleCampaignsPress = () => {
    navigation.navigate('YourCampaigns');
  };

  const handleBookPress = () => {
    navigation.navigate('YourBook');
  };

  const handleLibraryPress = (page) => {
    setModalVisible(false);
    navigation.navigate(page);
  };

  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require('./assets/dungeon.jpeg')}
      style={styles.container}
    >
      <Text style={styles.appName}>DMBook</Text>

      <View style={[styles.buttonContainer, { bottom: '50%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleCampaignsPress}>
          <Text style={styles.buttonText}>{t('Your campaigns')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '40%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleBookPress}>
          <Text style={styles.buttonText}>{t('Your book')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '30%' }]}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>{t('Library')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '20%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>{t('Log out')}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('Library')}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Spells')}>
              <Text style={styles.modalButtonText}>{t('Spells')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Items')}>
              <Text style={styles.modalButtonText}>{t('Items')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Feats')}>
              <Text style={styles.modalButtonText}>{t('Feats')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>{t('Close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  appName: {
    position: 'absolute',
    top: '16%',
    fontSize: 24,
    color: '#7F7F7F',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '35%',
    width: '50%',
    backgroundColor: 'transparent',
    borderColor: '#7F7F7F',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
  },
  buttonText: {
    color: '#d6d6d6',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '60%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    color: '#d6d6d6',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#444',
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#d6d6d6',
    fontSize: 18,
  },
  modalCloseButton: {
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: '#d6d6d6',
    fontSize: 16,
  },
});

export default DMPage;
