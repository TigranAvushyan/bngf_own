import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SCREEN_PADDING } from '../../../style/global.style';
import { SkeletonLoader } from '../pagination-loading/SkeletonLoader';

const ChatItemSkeleton: FC = () => {
  return (
    <View style={ styles.itemsContainer }>
      <SkeletonLoader width={44} height={44} borderRadius={22}/>
      <View style={ styles.nameMessage }>
        <View style={styles.chatTitle}>
          <SkeletonLoader width={150} height={15} borderRadius={6}/>
        </View>
        <SkeletonLoader width={100} height={20} borderRadius={6}/>
      </View>
      <View style={ styles.messageCountTime }>
        <SkeletonLoader width={30} height={10} borderRadius={6}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
  },
  chatTitle: {
    marginBottom: 5,
  },
  nameMessage: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 8,
    maxWidth: '71%',
    marginRight: 'auto',
  },
  messageCountTime: {
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
});

export default ChatItemSkeleton;
