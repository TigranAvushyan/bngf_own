import { TransformsStyle } from 'react-native';

export const rotateStyle = (deg: number): TransformsStyle => ({ transform: [{ rotateZ: deg + 'deg' }] });

