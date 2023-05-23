import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 49,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F2F2F2',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  placeholder: {
    color: '#5E637A',
    fontWeight: '600',
    position: 'absolute',
    left: 14,
  },
  textInput: {
    fontSize: 14,
  },
});
