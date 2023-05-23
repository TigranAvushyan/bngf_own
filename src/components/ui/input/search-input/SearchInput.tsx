import React, { FC } from 'react';
import { inputStyles } from '../style';
import { StyleSheet, TextInput, TextStyle, View } from 'react-native';
import { FONTS } from '../../../../style/global.style';
import SearchIcon from '../../icons/search/SearchIcon';


interface InputPropsType {
  setValue: ((text: string) => void);
  placeholder?: string;
  style?: TextStyle;
  editable?: boolean;
  onSubmitEditing?: () => void;
  returnKeyType?: 'done' | 'search' | 'next' | 'send' | 'go';
}

const SearchInput: FC<InputPropsType> = ({
  setValue,
  placeholder = 'Поиск',
  returnKeyType = 'search',
  onSubmitEditing = undefined,
  style = null,
  editable = true,
}) => {
  return (
    <View style={ [inputStyles.container, styles.container, style] }>
      <SearchIcon color={ '#9498AB' } />
      <TextInput
        editable={editable}
        returnKeyType={ returnKeyType }
        onSubmitEditing={ onSubmitEditing }
        onChangeText={ setValue }
        style={ styles.textInput }
        placeholder={ placeholder }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: FONTS['500'],
    flex: 1,
    marginLeft: 10,
  },
});

export default SearchInput;
