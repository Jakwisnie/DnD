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
      source={require('./assets/font/background1.jpg')}
      style={styles.container}
    >
      <Text style={styles.appName}>DMBook</Text>

      <View style={[styles.buttonContainer, { bottom: '50%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleCampaignsPress}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={require('./assets/icons/campaign1.png')} style={styles.icons} />
            <Text style={styles.buttonText}>{t('Your campaigns')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '40%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleBookPress}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={require('./assets/icons/book.png')} style={styles.icons} />
            <Text style={styles.buttonText}>{t('Your book')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '30%' }]}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={require('./assets/icons/library.png')} style={styles.icons} />
            <Text style={styles.buttonText}>{t('Library')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '20%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={require('./assets/icons/logout.png')} style={styles.icons} />
            <Text style={styles.buttonText}>{t('Log out')}</Text>
          </ImageBackground>
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
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
              <Image source={require('./assets/icons/spells.png')} style={styles.icons} />
              <Text style={styles.modalButtonText}>{t('Spells')}</Text>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Items')}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
              <Image source={require('./assets/icons/item.png')} style={styles.icons} />
              <Text style={styles.modalButtonText}>{t('Items')}</Text>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Feats')}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
              <Image source={require('./assets/icons/feat.png')} style={styles.icons} />
              <Text style={styles.modalButtonText}>{t('Feats')}</Text>
            </ImageBackground>
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
    fontSize: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    fontWeight: 'bold',
  },
  button: {
     alignItems: 'center',
     width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '35%',
    width: '60%',
    borderColor: 'rgba(60, 60, 60, 0.5)',
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: 'rgba(0, 0, 0, 1)',
  },
  chainOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  buttonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#ffd700',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'center',
  },
  icons: {
    marginRight: -30,
    marginLeft: 10,
    width: 40,
    height: 40,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444',
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#ffd700',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'center',
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
