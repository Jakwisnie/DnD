import React, { useState, useContext, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, Text, View, Button, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
import { useNavigation, HeaderBackButton } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';
import { Appearance } from 'react-native';

Appearance.setColorScheme('light');

const PlayerSessions = () => {
const { token } = useAuth();
    const [characters,setCharacters] = useState([]);
    const [result, setResult] = useState([]);
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);


    useEffect(() => {
             fetchData();
           }, []);
         const fetchData = async () => {
              try {
                  console.log('Token:', token.toString());
                  const sessionsResponse = await fetch('http://192.168.0.54:8000/user/characters/sessions', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'accept': 'application/json'
                      },
                      body: JSON.stringify({ token: token.toString() }),
                  });

                  if (!sessionsResponse.ok) {
                      throw new Error('Failed to fetch data');
                  }
                  const data = await sessionsResponse.json();
                  setResult(data.result)


              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          };
    const openSessionDetails = (sResult) => {
        navigation.navigate('PlayerSessionDetails', {campaign: sResult[1], player:sResult[0],session:sResult[1].sessions[sResult[1].sessions.length - 1] });
    };


    return (
      <ImageBackground
        style={styles.containerCamp}
        source={theme.background}
        resizeMode="cover"
      >

      <View style={styles.characterRow}>
                    {result.map((sResult, index) => (
                      <View key={index} style={styles.buttonContainerCamp}>
                        <TouchableOpacity style={styles.button} onPress={() => openSessionDetails(sResult)}>
                          <Text style={[styles.characterStatus, {color:'white' }]}>{sResult[1].title}</Text>
                        </TouchableOpacity>

                      </View>
                    ))}
                  </View>

        <View style={styles.GoBack}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
              <Text style={styles.GoBackText}>{t('Go_back')}</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    );
};

export default PlayerSessions;
