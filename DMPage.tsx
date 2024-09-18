import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Button, Image, Text, TouchableOpacity, Modal } from 'react-native';
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
          <Image source={require('./assets/icons/campaign.png')} style={styles.icons} />
          <Text style={styles.buttonText}>{t('Your campaigns')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '40%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleBookPress}>
          <Image source={require('./assets/icons/dmbook.png')} style={styles.icons} />
          <Text style={styles.buttonText}>{t('Your book')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '30%' }]}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Image source={require('./assets/icons/library.png')} style={styles.icons} />
          <Text style={styles.buttonText}>{t('Library')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '20%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Image source={require('./assets/icons/logout.png')} style={styles.icons} />
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
              <Image source={require('./assets/icons/spells.png')} style={styles.icons} />
              <Text style={styles.modalButtonText}>{t('Spells')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Items')}>
              <Image source={require('./assets/icons/items.png')} style={styles.icons} />
              <Text style={styles.modalButtonText}>{t('Items')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Feats')}>
              <Image source={require('./assets/icons/feats.png')} style={styles.icons} />
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
  button: {
     flexDirection: 'row',
     alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '35%',
    width: '50%',
    backgroundColor: 'rgba(112, 128, 144, 0.8)',
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: 'rgba(0, 0, 0, 1)',
  },
  buttonText: {
    color: '#d6d6d6',
  },
  icons: {
    width: 20,
    height: 20,
    marginRight: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
