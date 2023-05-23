import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Span from '../../span/Span';


const PopupInfo: FC = () => {
  return (
    <Span style={ styles.info }>!</Span>
  );
};

const styles = StyleSheet.create({
  info: {
    color: '#003F96',
    backgroundColor: '#E3EAF0',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    width: 20,
    height: 20,
    fontSize: 16,


    shadowColor: '#003F96',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,

    elevation: 5,

  },
});

export default PopupInfo;
