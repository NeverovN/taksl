import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text14, Text18 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';

export interface MemberProps {
  name: string;
  initials: string;
}

export const Member: React.FC<MemberProps> = ({ initials, name }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.circle}>
        <Text18 color={'white'}>{initials}</Text18>
      </View>
      <Text14 color={'black'} numberOfLines={1}>
        {name}
      </Text14>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: 65,
  },
  circle: {
    height: 44,
    width: 44,
    marginBottom: 8,
    borderRadius: Number.MAX_SAFE_INTEGER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
});
