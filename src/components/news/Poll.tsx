import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Span from '../ui/span/Span';
import Checkbox from '../ui/checkbox/Checkbox';
import moment from 'moment';
import { FONTS } from '../../style/global.style';

const Poll = ({ item }) => {
  const [isCheckedOption, setCheckedOption] = useState(false);

  return (
    <View style={ styles.textTime }>
      <View style={styles.titleContainer}>
        <Span style={styles.titleText}>
          Вопрос
        </Span>
      </View>
      <View style={styles.answersContainer}>
        <View style={styles.answerItem}>
          <View style={styles.checkBox}>
            <Checkbox
              onPress={setCheckedOption}
              isChecked={isCheckedOption}/>
          </View>
          <View style={styles.optionContainer}>
            <Span style={styles.optionText}>
              Вариант 1
            </Span>
          </View>
        </View>
      </View>
      <Span style={ styles.time }>{ `${ moment(item.time).format('HH:mm') }` }</Span>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
  },
  textTime: {
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    padding: 6,
    paddingBottom: 25,
    position: 'relative',
    marginTop: 5,
  },
  titleText: {
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 14,
  },
  answersContainer: {
    marginTop: 9,
  },
  answerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    marginRight: 5,
  },
  optionContainer: {},
  optionText: {},
  time: {
    position: 'absolute',
    bottom: 5,
    right: 6,
    color: '#5E637A',
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
  },
});

export default Poll;
