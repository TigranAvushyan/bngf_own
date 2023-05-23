import React, { FC, FormEvent } from 'react';
import Button from '../Button';
import { ButtonStyle } from '../buttonStyles';

interface LoginButtonPropsType {
  onPress: (e?: FormEvent<HTMLFormElement> | undefined) => void;
}

const LoginButton: FC<LoginButtonPropsType> = ({ onPress }) => {
  return (
    <Button
      onPress={ onPress }
      style={ btnStyle }
      title={ 'Вход' }
      icon={ 'right-alt-arrow' }
    />

  );
};


const btnStyle: ButtonStyle = {
  container: {
    justifyContent: 'space-between',
    width: '100%',
    top: 75,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    color: '#FFF',
    props: {
      width: 18,
      height: 10,
      viewBox: '0 0 24 10',
    },
  },
};

export default LoginButton;
