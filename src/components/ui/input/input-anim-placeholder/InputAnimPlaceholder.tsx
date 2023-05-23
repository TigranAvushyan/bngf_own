import React, { FC, useRef } from 'react';
import { Animated, StyleSheet, TextInput, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';
import { inputStyles } from '../style';

const InputAnimPlaceholder: FC<TextInputProps> = (inputProps) => {
  const fadeAnim = useRef(new Animated.Value(inputProps.value === '' ? 0 : 1));

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const inputRef = React.useRef<TextInput>(null);


  React.useEffect(() => {
    Animated.timing(
        fadeAnim.current,
        {
          toValue: isFocused || inputProps.value !== '' ? 1 : 0,
          duration: 150,
          useNativeDriver: false,
        },
    ).start();
  }, [isFocused]);


  const onFocusHandler = () => {
    setIsFocused(true);
  };
  const onBlurHandler = () => {
    setIsFocused(false);
  };

  const onPressHandler = () => {
    inputRef.current?.focus();
  };

  const placeholderStyle = {
    fontSize: fadeAnim.current.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 12],
    }),
    top: isFocused || inputProps.value !== '' ? 6 : undefined,
  };


  return (
    <TouchableWithoutFeedback onPress={ onPressHandler }>
      <View style={ [inputStyles.container, styles.container] }>

        <Animated.Text style={ [inputStyles.placeholder, placeholderStyle] }>
          { inputProps.placeholder }
        </Animated.Text>

        <TextInput
          { ...inputProps }
          value={ inputProps.value }
          onChangeText={ inputProps.onChangeText }
          style={ inputStyles.textInput }
          onFocus={ onFocusHandler }
          onBlur={ onBlurHandler }
          placeholder={ '' }
          ref={ inputRef }
        />

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 12,
  },
});

export default InputAnimPlaceholder;
