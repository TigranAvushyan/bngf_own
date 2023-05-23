import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ListRenderItemInfo, SectionList, StyleSheet, View } from 'react-native';
import MessageItem from '../../components/message/MessageItem';
import { MainStackNavProps, Screens } from '../../navigators/main/MainParamList';
import MessageInput from '../../components/ui/input/message-input/MessageInput';
import { SCREEN_PADDING } from '../../style/global.style';
import { useStore } from 'effector-react';
import { $messages, getFirstMessagesFx, getNextMessagesWrapperFx } from '../../store/message/messagesStore';
import PaginationLoading from '../../components/ui/pagination-loading/PaginationLoading';
import { sendMessageReadWebSocket } from '../../store/socket/socketStore';
import EditMessageQuote from '../../components/ui/message/EditMessageQuote';
import {
  $visibleEditMessageQuote,
  $visibleForwardPopUP,
  $visibleReplyMessageQuote,
} from '../../store/message/messageBackdropStore';
import ReplyMessageQuote from '../../components/ui/message/ReplyMessageQuote';
import ForwardMessagePopup from '../../components/popups/ForwardMessagePopup';
import useKeyExtractor from '../../lib/hooks/useKeyExtractor';
import { Message } from '../../lib/types/chat/chatType';
import MessageItemAction from '../../components/ui/message/MessageItemAction';
import moment from 'moment';
import KeyboardAreaView from '../../components/keyboard-area-view/KeyboardAreaView';

type GroupedMessageItem = { title: string, data: Message[] }

const groupMessagesBySendTime = (messages: Message[]) => {
  if (!messages.length) return [];
  const res: GroupedMessageItem[] = [];

  messages.forEach((message) => {
    const resLastItem = res[res.length - 1];
    const day = moment(message?.time_send).format('DD MMMM');
    if (resLastItem?.title === day) {
      resLastItem.data.push(message);
      return;
    }
    res.push({
      title: day,
      data: [message],
    });
  });
  return res;
};


const MessageScreen = ({ route }: MainStackNavProps<Screens.MESSAGES>) => {
  const chatId = route.params.id;
  const isVisibleEditMessageQuote = useStore($visibleEditMessageQuote);
  const isVisibleReplyMessageQuote = useStore($visibleReplyMessageQuote);
  const isVisibleForwardPopUp = useStore($visibleForwardPopUP);
  const [loading, setLoading] = useState(false);

  const messagesStore = useStore($messages);

  const { messages, messagesCount, groupedMessages } = useMemo(() => {
    const messageItem = messagesStore?.find((i) => i.chat_id === chatId);
    const messages = messageItem?.messages || [];
    const groupedMessages = groupMessagesBySendTime(messages);
    return {
      messagesCount: messageItem?.count || 0,
      messages,
      groupedMessages,
    };
  }, [messagesStore, chatId]);

  useEffect(() => {
    sendMessageReadWebSocket({ chatId });
    if (!messages || messages.length === 0) {
      setLoading(true);
      getFirstMessagesFx({ id: chatId }).then(() => setLoading(false));
    }
  }, [chatId, messages]);

  const loadMoreMessages = useCallback(async () => {
    if (messagesCount < 20) return;
    if (messagesCount > (messages?.length || 0)) {
      setLoading(true);
      await getNextMessagesWrapperFx(chatId);
      setLoading(false);
    }
  }, [chatId, messages]);


  const renderItem = useCallback(({ item }: ListRenderItemInfo<Message>) => {
    return <MessageItem chatId={ chatId } messageItem={ item } />;
  }, [chatId]);

  const renderSectionFooter = useCallback(({ section: { title } }) => {
    return <MessageItemAction text={ title } />;
  }, []);

  const keyExtractor = useKeyExtractor();

  return (
    <KeyboardAreaView>
      <View style={ styles.container }>
        <SectionList
          inverted
          style={ styles.flatList }
          keyExtractor={ keyExtractor }
          sections={ groupedMessages }
          renderSectionFooter={ renderSectionFooter }
          renderItem={ renderItem }
          onEndReached={ loadMoreMessages }
          onEndReachedThreshold={ 0.1 }
          ListFooterComponent={ <PaginationLoading loading={ loading } /> }
        />
        <ForwardMessagePopup />

        { isVisibleReplyMessageQuote && <ReplyMessageQuote /> }
        { isVisibleEditMessageQuote && <EditMessageQuote /> }
        { !isVisibleForwardPopUp && <MessageInput chatId={ chatId } messages={ messages } /> }
      </View>

    </KeyboardAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EEF0F4',
  },
  flatList: {
    position: 'relative',
    paddingHorizontal: SCREEN_PADDING,
  },
});

export default MessageScreen;
