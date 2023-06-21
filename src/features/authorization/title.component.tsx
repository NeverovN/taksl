import React from 'react';
import { Text40 } from 'common/components/text.component';
import { StyleProp, View, ViewStyle } from 'react-native';
import { FONT_WEIGHTS } from 'src/common/types/text.types';

export interface TitleProps {
  firstLine: string;
  secondLine: string;
  style?: StyleProp<ViewStyle>;
}

export const Title: React.FC<TitleProps> = ({
  style,
  firstLine,
  secondLine,
}) => {
  return (
    <View style={style}>
      <Text40 fontWeight={FONT_WEIGHTS.bold} color={'title'}>
        {firstLine}
      </Text40>
      <Text40 fontWeight={FONT_WEIGHTS.bold} color={'title'}>
        {secondLine}
      </Text40>
    </View>
  );
};
