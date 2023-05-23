import React, { FC } from 'react';
import { IconProps } from '../_types';
import Svg, { Path } from 'react-native-svg';


const SettingsIcon: FC<IconProps> = ({
  color = '#5D606C',
  width = 20,
  height = 20,
  viewBox = `0 0 20 20`,
  style,
}) => {
  return (
    <Svg width={ width } height={ height } viewBox={ viewBox } style={ style }>
      <Path
        d="M10.6276 20H9.37238C8.35719 20 7.53121 19.1741 7.53121 18.1589V17.7342C7.09961 17.5963 6.68027 17.4223 6.27742 17.2138L5.97648 17.5147C5.24762 18.2445 4.08008 18.2231 3.37238 17.5145L2.48523 16.6273C1.77629 15.9192 1.7559 14.752 2.48547 14.0232L2.78617 13.7225C2.5777 13.3197 2.40367 12.9004 2.26574 12.4688H1.84113C0.825976 12.4688 0 11.6428 0 10.6276V9.37238C0 8.35719 0.825976 7.53125 1.84117 7.53125H2.26578C2.40371 7.09961 2.57773 6.68031 2.78621 6.27746L2.48527 5.97656C1.75613 5.2482 1.77625 4.08094 2.48551 3.37246L3.37273 2.48527C4.08207 1.77496 5.24934 1.75723 5.9768 2.48551L6.27746 2.78617C6.68031 2.57773 7.09965 2.40367 7.53125 2.26574V1.84113C7.53125 0.825937 8.35719 0 9.37242 0H10.6276C11.6428 0 12.4688 0.825937 12.4688 1.84113V2.26578C12.9004 2.40367 13.3197 2.57773 13.7225 2.78621L14.0235 2.48527C14.7523 1.75551 15.9199 1.77691 16.6276 2.48555L17.5147 3.37266C18.2237 4.08082 18.2441 5.24797 17.5145 5.97676L17.2138 6.27746C17.4223 6.68031 17.5963 7.09957 17.7342 7.53125H18.1588C19.174 7.53125 20 8.35719 20 9.37238V10.6276C20 11.6428 19.174 12.4688 18.1588 12.4688H17.7342C17.5963 12.9004 17.4223 13.3197 17.2138 13.7225L17.5147 14.0235C18.2439 14.7518 18.2237 15.9191 17.5145 16.6276L16.6273 17.5148C15.9179 18.2251 14.7507 18.2428 14.0232 17.5145L13.7225 17.2139C13.3197 17.4223 12.9004 17.5964 12.4688 17.7343V18.1589C12.4688 19.1741 11.6428 20 10.6276 20ZM6.47332 15.9832C7.03297 16.3142 7.63531 16.5642 8.26359 16.7264C8.52234 16.7931 8.70312 17.0265 8.70312 17.2937V18.1589C8.70312 18.5279 9.0034 18.8281 9.37242 18.8281H10.6276C10.9966 18.8281 11.2969 18.5279 11.2969 18.1589V17.2937C11.2969 17.0265 11.4777 16.7931 11.7364 16.7264C12.3647 16.5642 12.9671 16.3142 13.5267 15.9832C13.757 15.847 14.0502 15.8841 14.2393 16.0732L14.8521 16.6861C15.1164 16.9506 15.5407 16.9445 15.7984 16.6864L16.6862 15.7986C16.9433 15.5418 16.9519 15.1175 16.6864 14.8523L16.0733 14.2393C15.8842 14.0501 15.8471 13.7569 15.9833 13.5267C16.3143 12.9671 16.5643 12.3647 16.7264 11.7364C16.7932 11.4777 17.0266 11.2969 17.2938 11.2969H18.1589C18.5279 11.2969 18.8282 10.9967 18.8282 10.6277V9.37242C18.8282 9.0034 18.5279 8.70316 18.1589 8.70316H17.2938C17.0265 8.70316 16.7932 8.52238 16.7264 8.26367C16.5643 7.63535 16.3142 7.03301 15.9833 6.4734C15.8471 6.24316 15.8842 5.94996 16.0733 5.76082L16.6862 5.14797C16.9511 4.88336 16.9442 4.45914 16.6864 4.20168L15.7987 3.31398C15.5414 3.05633 15.117 3.04879 14.8524 3.31375L14.2394 3.92684C14.0502 4.11602 13.757 4.15305 13.5268 4.01688C12.9671 3.6859 12.3648 3.43586 11.7365 3.27371C11.4777 3.20695 11.297 2.97359 11.297 2.70637V1.84113C11.297 1.47211 10.9967 1.17188 10.6277 1.17188H9.37246C9.00344 1.17188 8.70316 1.47211 8.70316 1.84113V2.70629C8.70316 2.97352 8.52238 3.20688 8.26363 3.27363C7.63535 3.43578 7.03301 3.68582 6.47336 4.0168C6.24305 4.15293 5.94988 4.1159 5.76074 3.92676L5.14793 3.31391C4.88371 3.04938 4.45938 3.05551 4.20168 3.31363L3.31391 4.20137C3.0568 4.45816 3.0482 4.8825 3.31367 5.14766L3.92676 5.76074C4.1159 5.94988 4.15293 6.24309 4.0168 6.47332C3.68582 7.03293 3.43582 7.63527 3.27367 8.26359C3.20688 8.52234 2.97352 8.70309 2.70633 8.70309H1.84117C1.47215 8.70312 1.17188 9.00336 1.17188 9.37238V10.6276C1.17188 10.9966 1.47215 11.2969 1.84117 11.2969H2.70629C2.97352 11.2969 3.20684 11.4777 3.27363 11.7364C3.43578 12.3647 3.68582 12.967 4.01676 13.5266C4.15289 13.7569 4.11586 14.0501 3.92672 14.2392L3.31387 14.8521C3.04895 15.1167 3.05586 15.5409 3.31363 15.7984L4.20133 16.6861C4.45863 16.9437 4.88301 16.9513 5.14762 16.6863L5.76066 16.0732C5.90004 15.9339 6.19 15.8156 6.47332 15.9832Z"
        fill={ color } />
      <Path
        d="M9.99988 14.3516C7.60039 14.3516 5.64832 12.3995 5.64832 10C5.64832 7.60058 7.60039 5.64847 9.99988 5.64847C12.3994 5.64847 14.3514 7.60058 14.3514 10C14.3514 12.3995 12.3994 14.3516 9.99988 14.3516ZM9.99988 6.82034C8.24656 6.82034 6.82019 8.24675 6.82019 10C6.82019 11.7533 8.2466 13.1797 9.99988 13.1797C11.7532 13.1797 13.1796 11.7533 13.1796 10C13.1796 8.24675 11.7532 6.82034 9.99988 6.82034Z"
        fill={ color } />
    </Svg>
  );
};

export default SettingsIcon;
