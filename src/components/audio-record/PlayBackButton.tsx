import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import TriangleIcon from '../ui/icons/triangle/TriangleIcon';
import RectangleIcon from '../ui/icons/rectangle/RectangleIcon';

type PlayBackButtonProps = {
  isLoading?: boolean
  onPress: () => void
  onPressToActive: () => void
  isActive?: boolean
}

const PlayBackButton = ({
  onPress,
  isLoading,
  isActive,
  onPressToActive,
}: PlayBackButtonProps) => (
  <TouchableOpacity
    onPress={ () => {
      if (!isActive) {
        onPress();

        return;
      }
      onPressToActive();
    } }
    style={ [styles.button, isLoading ? styles.loading : null] }
  >
    { (() => {
      if (isLoading) return <ActivityIndicator size={ 30 } color={ '#4F6A87' } />;
      if (isActive) return <RectangleIcon width={10} height={10} color={ 'white' } />;
      return (
        <TriangleIcon style={ styles.playIcon } color={ 'white' } width={10} height={12} />
      );
    })() }
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4F6A87',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    backgroundColor: 'transparent',
  },
  playIcon: {
    marginLeft: 3,
  },
});
export default PlayBackButton;
