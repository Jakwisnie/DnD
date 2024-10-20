import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';

const languages = [
  { code: 'en', label: 'English', flag: require('./assets/flags/English.png') },
  { code: 'pl', label: 'Polski', flag: require('./assets/flags/Polish.png') },
  { code: 'ua', label: 'Українська', flag: require('./assets/flags/Ukraine.png') },
  { code: 'ru', label: 'Русский', flag: require('./assets/flags/russia.png') }
];

const themes = [
  { name: 'theme1', label: 'Dark', preview: require('./assets/font/theme1.png') },
  { name: 'theme2', label: 'Light', preview: require('./assets/font/theme2.png') }
];

const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isThemeDropdownVisible, setThemeDropdownVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const { theme, changeTheme } = useContext(ThemeContext);
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setCurrentLang(code);
    setDropdownVisible(false);
  };

  const handleLoginPress = () => {
    navigation.navigate('LogIn');
  };

  const handleRegistrationPress = () => {
    navigation.navigate('Registration');
  };

  const handleChangeTheme = (themeName) => {
    changeTheme(themeName);
    setThemeDropdownVisible(false);
  };

  return (
    <ImageBackground source={theme.background} style={styles.container}>
      <Text style={[styles.appName, { color: theme.fontColor }]}>DMBook</Text>

      <View style={styles.buttonContainerUsu}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Image source={theme.icons.login} style={styles.icons} />
            <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
              {t('Login')}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainerUsu, { bottom: 250 }]}>
        <TouchableOpacity style={styles.button} onPress={handleRegistrationPress}>
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Image source={theme.icons.register} style={styles.icons} />
            <Text style={[styles.buttonText, { color: theme.fontColor, fontSize: theme.fontSize, fontStyle: theme.fontStyle, textShadowColor: theme.textShadowColor, textShadowOffset: theme.textShadowOffset, textShadowRadius: theme.textShadowRadius, flex: theme.flex, textAlign: theme.textAlign}]}>
            {t('Registration')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.flagsContainer}>
        <TouchableOpacity onPress={() => setDropdownVisible(!isDropdownVisible)}>
          <Image source={languages.find(lang => lang.code === currentLang).flag} style={styles.flag} />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            {languages.filter(lang => lang.code !== currentLang).map((lang) => (
              <TouchableOpacity key={lang.code} onPress={() => changeLanguage(lang.code)} style={styles.flagButton}>
                <Image source={lang.flag} style={styles.flag} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.themeContainer}>
        <TouchableOpacity onPress={() => setThemeModalVisible(true)}>
          <Image source={theme.icons.settings} style={styles.gearIcon} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setThemeModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('Select Theme')}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                {themes.map((themeItem) => (
                  <TouchableOpacity key={themeItem.name} onPress={() => handleChangeTheme(themeItem.name)} style={styles.themeOption}>
                    <Image source={themeItem.preview} style={styles.themePreview} />
                    <Text style={styles.themeLabel}>{themeItem.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setThemeModalVisible(false)}>
                <Text style={{ color: 'white', fontSize: 20 }}>{t('Close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ImageBackground>
  );
};

export default HomeScreen;
