import { ButtonStyle } from '../components/ui/buttons/buttonStyles';
import { StyleSheet } from 'react-native';


export const buttonBlueStyle: ButtonStyle = {
  container: {
    backgroundColor: '#4F6A87',
  },
  text: {
    color: '#fff',
  },
  active: {
    container: {
      backgroundColor: '#445a73',
    },
  },
};

export const buttonLiteStyle: ButtonStyle = {
  container: {
    borderColor: '#4F6A87',
  },
  text: {
    color: '#4F6A87',
  },
  active: {
    container: {
      borderColor: '#445a73',
    },
    text: {
      color: '#445a73',
    },
  },
};


export const popupStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginVertical: 25,
  },
});
