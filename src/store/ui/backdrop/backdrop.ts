import { createEvent, createStore, restore } from 'effector';
import { Message } from '../../../lib/types/chat/chatType';


export const showMessageBackdrop = createEvent();
export const hideMessageBackdrop = createEvent();
export const toggleVisibleBackdrop = createEvent();

export const $messageBackdrop = createStore(false)
    .on(showMessageBackdrop, () => true)
    .on(hideMessageBackdrop, () => false)
    .on(toggleVisibleBackdrop, (state) => !state);


type MessageBackdropProps = {
  absoluteTop: number,
  messageItem: Message
}


export const setMessageBackdropProps = createEvent<MessageBackdropProps>();

export const $messageBackdropProps = restore<MessageBackdropProps>(setMessageBackdropProps, null);
