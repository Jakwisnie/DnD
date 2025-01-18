import React, { useRef, useState, useEffect, useContext } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity,length, TextInput, ScrollView, Alert, Image, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './theme/ThemeContext';
import styles from './styles';
import { Appearance } from 'react-native';

Appearance.setColorScheme('light');

const PlayerSessionDetails = ({ route,navigation }) => {
    const { campaign,player} = route.params;
    const { session } = route.params || {};
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
  const [playerActual, setPlayerActual] = useState(player);
  const [notes, setNotes] = useState(player.sharedNotes);
  const [newSessionName, setNewSessionName] = useState('');
  const [newSessionContent, setNewSessionContent] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteImage, setNewNoteImage] = useState(null);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);
  const [addingNewSession, setAddingNewSession] = useState(false);
  const [addingNewNote, setAddingNewNote] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [noteVisibility, setNoteVisibility] = useState(new Array(notes?.length || 0).fill(false));
  const [modalVisible, setModalVisible] = useState(false);
  const [actualSession,setActualSession]= useState(session)

  const scrollViewRef = useRef(null);


 useEffect(() => {

    if (scrollViewRef.current && actualSession?.logs?.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [actualSession?.logs]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playerActual && actualSession) {
        fetchData();
      } else {
        console.warn('Cannot fetch data: playerActual or actualSession is empty');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playerActual, actualSession]);
 const fetchData = async () => {
      try {
          const sessionsResponse = await fetch('http://192.168.0.54:8000/user/characters/session', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'accept': 'application/json'
              },
              body: JSON.stringify({
                  character_id: playerActual?.id ? parseInt(playerActual?.id) : null,
                  session_id: actualSession?.id ? parseInt(actualSession?.id) : null
              }),
          });

          if (!sessionsResponse.ok) {
              throw new Error('Failed to fetch data');
          }

           const data = await sessionsResponse.json();
                  setPlayerActual(data.character);
                  setActualSession(data.session);

      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  const handleSelectPlayer = (playerActual) => {
    if (selectedPlayers.includes(playerActual.id)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerActual.id));
    } else {
      setSelectedPlayers([...selectedPlayers, playerActual.id]);
    }
  };

  const handleAddPlayer = () => {
    const newPlayer = {
      id: playerActual.length + 1,
      name: `PlayerActual ${playerActual.length + 1}`,
      image: require('./assets/adventurer.jpeg'),
      coins: 0,
      level: 1,
      hp: 100,
    };
    setPlayers([...playerActual, newPlayer]);
  };

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes !== null) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes', error);
      }
    };
    loadNotes();
  }, []);


  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to save notes', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRoll = () => {
    navigation.navigate('RzutKostka',{player:playerActual,session:actualSession});
  };

    const handlePressPortrait = () => {
      navigation.navigate('Character1',{characterData:playerActual,session:actualSession});
    };

  const handleSaveEdit = () => {
    if (editingSession !== null) {
      const updatedSessions = [...sessions];
      updatedSessions[editingSession] = { name: newSessionName, content: newSessionContent };
      saveSessions(updatedSessions);
      setEditingSession(null);
      setNewSessionName('');
      setNewSessionContent('');
    }
  };

  const handleNewSessionTab = () => {
    setAddingNewSession(true);
    setActiveSessionIndex(sessions.length);
  };

  const toggleNoteVisibility = (index) => {
    setNoteVisibility(prevVisibility => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const handleShareNote = (note) => {
    Alert.alert(`Sharing note: ${note.title}`);
    handleCloseNote();
  };

  const handleAddNote = () => {
    setAddingNewNote(!addingNewNote);
    setEditingNoteIndex(null);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteImage(null);
    setModalVisible(true);
  };

  const handleSaveNote = async () => {
    if (newNoteTitle && newNoteContent) {
      const newNote = {
        title: newNoteTitle,
        content: newNoteContent,
        image: newNoteImage ? { uri: newNoteImage } : require('./assets/Human-W-Mage.jpg'),
      };
      const updatedNotes = [...notes, newNote];
      await saveNotes(updatedNotes);
      setNewNoteTitle('');
      setNewNoteContent('');
      setNewNoteImage(null);
      setAddingNewNote(false);
    } else {
      Alert.alert(t('Please enter both title and content for the note.'));
    }
  };

  const handleEditNote = (index) => {
    handleCloseNote();
    setEditingNoteIndex(index);
    setNewNoteTitle(notes[index].title);
    setNewNoteContent(notes[index].content);
    setNewNoteImage(notes[index].image.uri || null);
    setAddingNewNote(!addingNewNote);
    setModalVisible(true);
  };

  const handleSaveEditNote = () => {
    if (editingNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingNoteIndex] = {
        title: newNoteTitle,
        content: newNoteContent,
        image: newNoteImage ? { uri: newNoteImage } : require('./assets/Human-W-Mage.jpg')
      };
      setNotes(updatedNotes);
      setEditingNoteIndex(null);
      setNewNoteTitle('');
      setNewNoteContent('');
      setNewNoteImage(null);
      setAddingNewNote(false);
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setNoteVisibility(noteVisibility.filter((_, i) => i !== index));
    setAddingNewNote(false);
    handleCloseNote();
    saveNotes(updatedNotes);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewNoteImage(result.assets[0].uri);
    }
  };

  const handleOpenNote = (note, index) => {
    setSelectedNote(note);
    setEditingNoteIndex(index);
    setIsModalVisible(true);
  };

  const handleCloseNote = () => {
    setSelectedNote(null);
    setAddingNewNote(null);
    setIsModalVisible(false);
  };

return (
    <ImageBackground
      source={theme.background}
      style={styles.containerCamp}
    >

     <View style={styles.CampaignOneContainerMainA}>
      <View style={styles.CampaignOneContainerMain}>
        <Text style={[styles.CampName, { color: theme.fontColor }]}>{campaign.title}</Text>

      </View>

      <View style={styles.mainCampaignContainer}>
        <View style={styles.leftCampaignContainer}>

    <View style={styles.playersSessionDetailStatsContainer}>
        <View key={playerActual.id} style={styles.playerSessionDetailStatsRow}>
          <Text style={[styles.playerSessionDetailStatHP, styles.statWithBorder]}>{t('HP')}: {playerActual.actualHP}</Text>
          <Text style={styles.playerSessionDetailStatAC}>{t('AC')}: {playerActual.armorClass}</Text>
        </View>

    </View>

    <TouchableOpacity style={styles.rollSessionDetailButton} onPress={() => handleRoll()}>
      <Text style={styles.rollSessionDetailButtonText}>{t('Roll')}</Text>
    </TouchableOpacity>

          <ScrollView>



      {!addingNewSession && (
      <View style={styles.noteContent}>
       {notes && notes.length > 0 ? (
         notes.map((note, index) => (
           <View key={index} style={styles.noteHeader}>
             <TouchableOpacity onPress={() => handleOpenNote(note, index)}>
               <View style={styles.noteActions}>
                 <Text style={styles.noteTitle}>{note.title}</Text>
               </View>
             </TouchableOpacity>
             {noteVisibility[index] && (
               <>
                 <Text style={styles.noteContent}>{note.content}</Text>
                 <Image source={note.image} style={styles.noteImage} />
               </>
             )}
           </View>
         ))
       ) : (
         <Text style={styles.emptyResultText}>No notes available</Text>
       )}



        {selectedNote && (
         <Modal
           visible={isModalVisible}
           animationType="slide"
           transparent={true}
           onRequestClose={handleCloseNote}
         >
           <View style={styles.modalNoteCampaignContainer}>
             <View style={styles.modalNoteCampaignContent}>
               <Text style={styles.modalNoteCampaignTitle}>{selectedNote?.title}</Text>
               <Text style={styles.modalNoteCampaignText}>{selectedNote?.content}</Text>
               <Image source={selectedNote?.image} style={styles.modalImageNoteCampaign} />
               <View style={styles.modalActionsNoteCampaign}>
                 <TouchableOpacity style={styles.editButtonCamp} onPress={() => handleEditNote(editingNoteIndex)}>
                   <Text style={styles.editTextCamp}>{t('Edit')}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.shareButtonCamp} onPress={() => handleShareNote(selectedNote)}>
                   <Text style={styles.shareText}>{t('Share')}</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.deleteButtonCamp} onPress={() => handleDeleteNote(editingNoteIndex)}>
                   <Text style={styles.deleteTextCamp}>{t('Delete')}</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </View>
                 <TouchableOpacity onPress={handleCloseNote}>
                   <Text style={styles.closeNoteButtonCampaign}>{t('Close')}</Text>
                 </TouchableOpacity>
         </Modal>
        )}

          <TouchableOpacity
            style={styles.addButtonCamp}
            onPress={handleAddNote}
          >
            <Text style={styles.addButtonTextCamp}>{t('+ Add Note')}</Text>
          </TouchableOpacity>
        </View>
      )}

          </ScrollView>
      </View>

        {addingNewNote && !addingNewSession && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
          <View style={styles.newNoteContainer}>
            <TextInput
              style={styles.inputCampNote}
              placeholder={t('Enter note title')}
              placeholderTextColor="#d6d6d6"
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
            />
            <TextInput
              style={[styles.inputCampNote, styles.contentInput]}
              placeholder={t('Enter note content')}
              placeholderTextColor="#d6d6d6"
              multiline
              value={newNoteContent}
              onChangeText={setNewNoteContent}
            />
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={pickImage}
            >
              <Text style={styles.imagePickerText}>
                {t('Pick an image')}
              </Text>
            </TouchableOpacity>
            {newNoteImage && (
              <Image source={{ uri: newNoteImage }} style={styles.newNoteImage} />
            )}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={editingNoteIndex !== null ? handleSaveEditNote : handleSaveNote}
            >
              <Text style={styles.saveText}>
                {editingNoteIndex !== null ? t('Save') : t('Add Note')}
              </Text>
            </TouchableOpacity>
            {editingNoteIndex !== null && (
              <TouchableOpacity
                style={styles.deleteButtonCampNote}
                onPress={() => handleDeleteNote(editingNoteIndex)}
              >
                <Text style={styles.deleteTextCampNote}>{t('Delete Note')}</Text>
              </TouchableOpacity>
            )}
          </View>
            <TouchableOpacity onPress={handleCloseNote}>
              <Text style={styles.closeNoteButtonCampaign}>{t('Close')}</Text>
            </TouchableOpacity>
        </Modal>
        )}

        <View style={styles.rightCampaignContainer}>
          <View style={styles.playerSessionDetailAvatarContainer}>
           <TouchableOpacity onPress={handlePressPortrait}>
            <Image source={{uri: playerActual.image}} style={styles.playerSessionDetailAvatar} />
            <Text style={styles.playerSessionDetailName}>{playerActual.name}</Text>
           </TouchableOpacity>
          </View>
          <ScrollView style={styles.rightCampaignContainerScrollArea} ref={scrollViewRef}>
            {actualSession?.logs?.length > 0 ? (
              <>
                {actualSession.logs.map((logs, index) => (
                  <Text key={index} style={styles.diceResult}>
                    {logs}
                  </Text>
                ))}
                <Text style={styles.diceResult}>{"\n\n"}</Text>
              </>
            ) : (
              <Text style={styles.emptyResultText}>No logs available</Text>
            )}
          </ScrollView>
        </View>
      </View>

     </View>

      <View style={styles.GoBack}>
        <TouchableOpacity style={styles.button} onPress={() => {handleGoBack()}} >
          <ImageBackground source={theme.backgroundButton} style={styles.buttonBackground}>
            <Text style={styles.GoBackText}>{t('Go_back')}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PlayerSessionDetails;
