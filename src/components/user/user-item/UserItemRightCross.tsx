import React, { FC } from 'react';
import CrossIcon from '../../ui/icons/cross/CrossIcon';
import Touchable from '../../ui/touchable/Touchable';
import { StyleSheet } from 'react-native';

interface UserItemRightCrossPropsType {
  onPress: () => void;
}

const UserItemRightCross: FC<UserItemRightCrossPropsType> = ({ onPress }) => {
  return (
    <Touchable onPress={ onPress } style={ styles.container }>
      <CrossIcon />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});

export default UserItemRightCross;
