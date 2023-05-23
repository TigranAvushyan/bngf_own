import React from 'react';
import AltArrowIcon from '../icons/arrows/AltArrowIcon';
import { IconProps } from '../icons/_types';

export type ButtonIconType = 'right-alt-arrow'

const getIcon = (name: ButtonIconType, props?: IconProps) => {
  switch (name) {
    case 'right-alt-arrow':
      return <AltArrowIcon { ...props } />;
  }
};

export default getIcon;
