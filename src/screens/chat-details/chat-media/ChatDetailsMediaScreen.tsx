import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH } from '../../../style/global.style';
import { useStore } from 'effector-react';
import { $currentChatDetail } from '../../../store/chat/chat-detail/chatDetailStore';
import CashedImage from '../../../components/CashedImage';
import { Screens } from '../../../navigators/main/MainParamList';
import { useMainNavigation } from '../../../lib/hooks/navigation/useNavigation';
import useKeyExtractor from '../../../lib/hooks/useKeyExtractor';
import { getFullName } from '../../../lib/utils';
import { getChatDetailMedia } from '../../../store/chat/chat-detail/chatDetailStoreEvents';
import PaginationLoading from '../../../components/ui/pagination-loading/PaginationLoading';
import { useLoadMoreItems } from '../../../lib/hooks/useLoadMoreItems';
import NoFiles from '../../../components/ui/NoFiles/NoFiles';

const imageSize = SCREEN_WIDTH / 3 - 3;


const ChatDetailsMediaScreen = () => {
  const { navigate } = useMainNavigation();

  const currentChatDetail = useStore($currentChatDetail);
  const keyExtractor = useKeyExtractor();

  const { isLoadingPortion, getNextPortion } = useLoadMoreItems(currentChatDetail?.media.count || 0,
      currentChatDetail?.media.results.length || 0,
      currentChatDetail?.media.next || '', getChatDetailMedia,
      20,
      currentChatDetail?.id);

  const renderItem = useCallback(({ item, index }) => {
    const images = currentChatDetail?.media.results.map((image) => {
      const fullName = getFullName(image.content_object?.bitrix_user.first_name, image.content_object?.bitrix_user.last_name);
      return {
        url: image.image,
        name: fullName,
        date: image.file_created || '',
      };
    }) || [];

    return <Pressable onPress={ () => navigate(Screens.MEDIA, { id: index, images }) }>
      <View>
        <CashedImage
          style={ styles.image }
          imageUri={ item.image } />
      </View>
    </Pressable>;
  }, [currentChatDetail?.media.results, navigate]);

  if (!currentChatDetail?.media.results.length) return <NoFiles />;

  return (
    <View style={ styles.container }>
      <View style={ styles.items }>
        <FlatList
          numColumns={ 3 }
          onEndReached={ getNextPortion }
          onEndReachedThreshold={ 0.8 }
          ListFooterComponent={ <PaginationLoading loading={ isLoadingPortion } /> }
          keyExtractor={ keyExtractor }
          data={ currentChatDetail?.media.results }
          renderItem={ renderItem } />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  image: {
    width: imageSize,
    height: imageSize,
    marginBottom: 2,
    marginHorizontal: 1.5,
  },
});

export default ChatDetailsMediaScreen;
