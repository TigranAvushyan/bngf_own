import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import Span from '../../span/Span';
import { StyleSheet, View } from 'react-native';
import { FONTS } from '../../../../style/global.style';

// const blueFileColor = ['doc', 'dock', 'docx', 'txt', 'wpd', 'odt', 'rtf'];
const greenFileColor = ['xls', 'xlsm', 'xlsx', 'ods'];
const redFileColor = ['pdf', 'pps', 'ppt', 'pptx', 'odp'];

interface FileTypeIconPropsType {
  fileName: string;
}

const getIconColor = {
  blue: ['#5DAFEB', '#7DC9FB', '#3E97D6'],
  red: ['#ED6E68', '#F9827A', '#D65B54'],
  green: ['#69C369', '#7CDA82', '#53B25A'],
};

const FileTypeIcon: FC<FileTypeIconPropsType> = ({ fileName }) => {
  const type = React.useMemo(() => fileName.split('.').pop() || '', []);

  const color = React.useMemo(() => {
    if (redFileColor.includes(type)) return 'red';
    if (greenFileColor.includes(type)) return 'green';
    return 'blue';
  }, []);
  return (
    <View style={ styles.container }>
      <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
        <Path
          d="M3.15 0C2.1 0 0 0.614634 0 3.07317V38.9268C0 39.9512 0.63 42 3.15 42H38.85C39.9 42 42 41.3854 42 38.9268V22.5366L30.45 11.2683V0H3.15Z"
          fill={ getIconColor[color][0] } />
        <Path d="M42 11.2683L30.45 0V11.2683H42Z" fill={ getIconColor[color][1] } />
        <Path d="M42 11.2683H30.45L42 22.5366V11.2683Z" fill={ getIconColor[color][2] } />
      </Svg>
      <Span style={ styles.text }>{ type }</Span>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  text: {
    color: '#fff',
    fontFamily: FONTS['500'],
    fontWeight: '500',
    fontSize: 12,
    position: 'absolute',
    bottom: 7,
    width: '100%',
    textAlign: 'center',
  },
});

export default FileTypeIcon;
