import React, { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ArrowDown from '../../icons/arrows/ArrowDown';
import ArrowUp from '../../icons/arrows/ArrowUp';
import Span from '../../span/Span';

interface MessageInputProps {
  indexScroll: number,
  totalCount: number,
  setIndexScroll: Dispatch<SetStateAction<number>>,
  loading: boolean
}

const MessageSearchFooter = ({ setIndexScroll, indexScroll, totalCount, loading }: MessageInputProps) => {
  const goToNext = () => {
    if (indexScroll === 0) return;
    setIndexScroll(indexScroll - 1);
  };

  const goToPrev = () => {
    if (indexScroll === totalCount - 1) return;
    setIndexScroll(indexScroll + 1);
  };

  return (
    <View style={ styles.container }>
      <View style={ styles.resultsContainer }>
        <Span>{ totalCount > 0 ? `${ indexScroll + 1 } из ${ totalCount }` : 'Ничего не найдено' }</Span>
      </View>
      { !loading &&
        <View style={ styles.arrowsContainer }>
          <Pressable
            onPress={ goToNext }>
            <ArrowDown />
          </Pressable>
          <Pressable
            onPress={ goToPrev }>
            <ArrowUp />
          </Pressable>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 63,
    paddingBottom: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderTopColor: '#D6D8DC',
    borderTopWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    marginTop: 16,
  },
  arrowsContainer: {
    width: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultsContainer: {},
});

export default MessageSearchFooter;

