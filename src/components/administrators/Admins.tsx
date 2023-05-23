import React, { FC, useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import AdminItem from './AdminItem';
import Button from '../ui/buttons/Button';
import { BitrixProfile } from '../../lib/types/user/userType';
import { adminsButtonStyle } from './adminsStyles';
import useKeyExtractor from '../../lib/hooks/useKeyExtractor';
import UserConfirmPopup from '../popups/UserConfirmPopup';

interface AdminsPropsType {
  onPressButton: () => void,
  admins: BitrixProfile[],
  creatorId: number,
  disableButton?: boolean
}

const Admins: FC<AdminsPropsType> = ({ onPressButton, admins, creatorId, disableButton }) => {
  const keyExtractor = useKeyExtractor();


  const renderItem = useCallback(({ item }: ListRenderItemInfo<BitrixProfile>) => {
    return <AdminItem user={ item } creatorId={ creatorId } />;
  }, []);

  return (
    <>

      <FlatList
        data={ admins }
        keyExtractor={ keyExtractor }
        renderItem={ renderItem }
      />
      <Button
        disabled={ disableButton }
        style={ adminsButtonStyle }
        onPress={ onPressButton }
        title={ 'Добавить' } />
    </>
  );
};

export default Admins;
