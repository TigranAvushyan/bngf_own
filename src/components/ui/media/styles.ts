import { StyleSheet } from 'react-native';
import { FONTS, SCREEN_WIDTH } from '../../../style/global.style';


const IMAGE_MARGIN = 2;
const IMAGE_WIDTH = SCREEN_WIDTH / 3 - IMAGE_MARGIN * 3;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.9;


export const mediaSelectStyles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  contentContainer: {},
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    position: 'relative',
  },
  image: {
    margin: IMAGE_MARGIN,
    borderRadius: 2,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width: 17,
    height: 17,
    borderRadius: 7,
    borderColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    right: 6,
    top: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  buttonsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    backgroundColor: '#003F96',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaButton: {
    marginRight: 25,
    alignItems: 'center',
  },
  sendButton: {
    marginLeft: 'auto',
  },
  buttonText: {
    color: '#003F96',
    fontSize: 12,
    fontFamily: FONTS['500'],
    fontWeight: '500',
  },

});
