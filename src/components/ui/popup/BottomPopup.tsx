import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

interface BottomPopupPropsType {
  children: ReactNode,
  minSnapPoint?: string,
  maxSnapPoint?: string,
  onDismiss?: () => void;
}

const BottomPopup = forwardRef((
    { children, onDismiss, minSnapPoint = '25%', maxSnapPoint = '60%' }: BottomPopupPropsType,
    ref: ForwardedRef<BottomSheetModal>) => {
  const snapPoints = [minSnapPoint, maxSnapPoint];


  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        snapPoints={ snapPoints }
        backdropComponent={ BottomSheetBackdrop }
        ref={ ref }
        index={ 1 }
        onDismiss={ onDismiss }
        handleIndicatorStyle={ styles.handleIndicatorStyle }
      >
        <View style={ styles.contentContainer }>
          { children }
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
    zIndex: 1000,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  handleIndicatorStyle: {
    width: 60,
    backgroundColor: '#E4E2E3',
    borderRadius: 5,
  },
});

export default BottomPopup;

