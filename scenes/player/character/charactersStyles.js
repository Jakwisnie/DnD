import {StyleSheet} from 'react-native';

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
  characterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  characterImage: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'gold',
    fontSize: 16,
  },
  characterStatus: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    textAlign: 'center',
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
});

export default styles;
