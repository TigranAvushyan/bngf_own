import React, { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Touchable from '../touchable/Touchable';

interface CardPropsType {
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
  onPress?: (event: GestureResponderEvent) => void;
}

interface CardChildPropsType {
  style?: StyleProp<ViewStyle>,
  children: ReactNode,
}


const Card = ({ children, style, onPress }: CardPropsType) => {
  const [isActive, setActive] = React.useState(false);
  return (
    <Touchable
      onPress={ onPress }
      style={ [styles.card, style, isActive && styles.active] }
      setActive={ setActive }
    >
      <View>
        { children }
      </View>
    </Touchable>
  );
};

Card.Header = ({ children, style }: CardChildPropsType) => {
  return (
    <View style={ [styles.cardHeader, style] }>
      { children }
    </View>
  );
};


Card.Body = ({ children, style }: CardChildPropsType) => {
  return (
    <View style={ [styles.cardBody, style] }>
      { children }
    </View>
  );
};


Card.Footer = ({ children, style }: CardChildPropsType) => {
  return (
    <View style={ [styles.cardFooter, style] }>
      { children }
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F3F5F7',
    borderRadius: 8,
    marginVertical: 9,
  },
  active: {
    backgroundColor: '#E3EAF0',
  },
  cardHeader: {
    padding: 16,
  },
  cardBody: {
    padding: 18,
  },
  cardFooter: {},

});
export default Card;
