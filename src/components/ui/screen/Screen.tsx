import React, { FC } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ScreenPropsType {
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Screen: FC<ScreenPropsType> = ({
  style,
  children,
  scroll = true,
}) => {
  return (
    <>


      {
          scroll ?
              <ScrollView
                style={ [styles.scroll, style] }
              >{ children }</ScrollView> :
              <View style={ styles.scroll }>{ children }</View>
      }

    </>

  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: 16,
  },
});

export default Screen;
