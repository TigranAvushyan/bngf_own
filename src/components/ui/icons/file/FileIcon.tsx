import React, { FC } from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';
import { IconProps } from '../_types';


const FileIcon: FC<IconProps> = ({
  color = '#FFF',
  width = 40,
  height = 40,
  viewBox = `0 0 40 40`,
  style,
}) => {
  return (


    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Circle cx="20" cy="20" r="20" fill="#306CBE"/>
      <G clip-path="url(#clip0_4073_4464)">
        <Path d="M28.2692 14.8082H20.3232L18.1362 11.237C18.0313 11.0658 17.845 10.9614 17.6442 10.9614H11.7308C10.7764 10.9614 10 11.7378 10 12.6922V27.3076C10 28.2619 10.7764 29.0383 11.7308 29.0383H28.2692C29.2236 29.0383 30 28.2619 30 27.3076V16.539C30 15.5846 29.2236 14.8082 28.2692 14.8082Z" fill={color}/>
        <Path d="M28.2697 13.6542V13.4612C28.2697 12.5069 27.4932 11.7305 26.5389 11.7305H19.792L20.9701 13.6542H28.2697Z" fill={ color }/>
      </G>
    </Svg>
  );
};

export default FileIcon;
