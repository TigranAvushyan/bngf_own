import React, { FC, useCallback, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FONTS, SCREEN_PADDING } from '../../style/global.style';
import UserItem from '../../components/user/UserItem';
import Span from '../../components/ui/span/Span';
import { useStore } from 'effector-react';
import { $news, fetchNews, getNextNews, NEWS_PORTION_LIMIT } from '../../store/news/newsStore';
import moment from 'moment';
import { fromNow } from '../../lib/utils';
import Hr from '../../components/ui/hr/Hr';
import useKeyExtractor from '../../lib/hooks/useKeyExtractor';
import PaginationLoading from '../../components/ui/pagination-loading/PaginationLoading';
import { useLoadMoreItems } from '../../lib/hooks/useLoadMoreItems';

const NewsScreen: FC = () => {
  const { news, totalItems, nextPortionUrl } = useStore($news);
  const { isLoadingPortion, getNextPortion } = useLoadMoreItems(totalItems, news.length, nextPortionUrl, getNextNews, NEWS_PORTION_LIMIT);
  const timeRef = useRef('');
  const keyExtractor = useKeyExtractor();

  const timeRender = useCallback((time: string | Date) => {
    const currentDate = fromNow(time);
    if (timeRef.current === currentDate) return null;
    timeRef.current = currentDate;
    return <Span style={ styles.date }>{ currentDate }</Span>;
  }, [timeRef]);

  const renderItem = useCallback(({ item }) => {
    return <View>
      { timeRender(item.time) }
      <UserItem
        avatar={ item.from_bitrix_user.avatar }
        style={ styles.userContainer }
        name={ `${ item.from_bitrix_user.first_name } ${ item.from_bitrix_user.last_name }` }
        bottomSide={
          <>
            <View style={ styles.textTime }>
              <Span style={ styles.text }>{ item.title || '' }</Span>
              <Span style={ styles.text }>{ item.detail_text || '' }</Span>
              <Span style={ styles.time }>{ `${ moment(item.time).format('HH:mm') }` }</Span>
            </View>
          </>
        } />
    </View>;
  }, [timeRender]);

  useEffect(() => {
    fetchNews().then();
  }, []);

  return (
    <View style={ styles.itemsContainer }>
      <View>
        <FlatList
          keyExtractor={ keyExtractor }
          data={ news }
          onEndReached={ getNextPortion }
          ItemSeparatorComponent={() => <Hr marginVertical={ 10 } marginHorizontal={ 14 } />}
          onEndReachedThreshold={ 0.8 }
          ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion } /> }
          renderItem={ renderItem } />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: '#fff',
    height: '100%',
    paddingBottom: SCREEN_PADDING,
  },
  userContainer: {
    paddingVertical: 0,
  },
  textTime: {
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    padding: 6,
    paddingBottom: 25,
    position: 'relative',
    marginTop: 5,
  },
  text: {
    color: '#17303F',
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 14,
  },
  time: {
    position: 'absolute',
    bottom: 5,
    right: 6,
    color: '#5E637A',
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
  },
  date: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 10,
    fontFamily: FONTS['700'],
    fontWeight: '700',
    color: '#17303F',
    fontSize: 16,
  },


});

export default NewsScreen;
