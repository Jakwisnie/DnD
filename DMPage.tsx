import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Button, Image, Text, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const DMPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

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
      source={theme.background}
      style={styles.container}
    >
      <Text style={[styles.appName, { color: theme.fontColor }]}>DMBook</Text>

      <View style={[styles.buttonContainer, { bottom: '50%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleCampaignsPress}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={theme.icons.yourcamp} style={styles.icons} />
            <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
            {t('Your campaigns')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '40%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleBookPress}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={theme.icons.yourbook} style={styles.icons} />
            <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
            {t('Your book')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '30%' }]}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={theme.icons.library} style={styles.icons} />
            <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
            {t('Library')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { bottom: '20%' }]}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
            <Image source={theme.icons.logout} style={styles.icons} />
            <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
            {t('Log out')}</Text>
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
              <Image source={theme.icons.spells} style={styles.icons} />
              <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
              {t('Spells')}</Text>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Items')}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
              <Image source={theme.icons.items} style={styles.icons} />
              <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
              {t('Items')}</Text>
            </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleLibraryPress('Feats')}>
            <ImageBackground source={require('./assets/font/font1.png')} style={styles.buttonBackground}>
              <Image source={theme.icons.feats} style={styles.icons} />
              <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
              {t('Feats')}</Text>
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

export default DMPage;
