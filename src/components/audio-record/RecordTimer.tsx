import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import Span from '../ui/span/Span';
import ArrowIcon from '../ui/icons/arrows/ArrowIcon';

type RecordTimerProps = {
  onCount?: (value: number, duration: number) => void
}

const RecordTimer = ({ onCount }: RecordTimerProps) => {
  const [time, setTime] = useState(0);
  const startTime = useRef(new Date().valueOf());

  useEffect(() => {
    const timer = setInterval(() => {
      const nextValue = new Date().valueOf() - startTime.current;
      setTime(nextValue);
      if (onCount) onCount(nextValue, 100);
    }, 100);
    return () => clearInterval(timer);
  }, [onCount]);

  return (
    <View style={ styles.container }>
      <View style={ styles.redDot } />
      <Span style={ styles.text }>{ `${ moment(time).format('mm:ss:S') }` }</Span>
      <ArrowIcon color={ '#1F2934' } width={6} height={12} />
      <Span style={ styles.cancelText }>{ 'Отмена' }</Span>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 12,
    height: 12,
    backgroundColor: '#FC4343',
    borderRadius: 10,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 5,
    width: 70,
  },
  cancelText: {
    marginLeft: 5,
  },
});
export default RecordTimer;
