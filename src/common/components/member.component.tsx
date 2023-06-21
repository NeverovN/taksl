import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { PressableOpacity } from 'src/common/components/button.component';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Text12, Text16, Text18 } from 'src/common/components/text.component';
import { STRINGS } from 'src/common/constants/strings.consts';
import { COLORS } from 'src/common/constants/colors.consts';

export type AssigneeProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
} & ProjectMember;

export type ProjectMember = {
  name: string;
  initials: string;
  id: string;
  role: string;
  capacity: number;
};

export const Member: React.FC<AssigneeProps> = ({
  initials,
  name,
  role,
  capacity,
  onPress,
  style,
}) => {
  return (
    <PressableOpacity onPress={onPress} style={[styles.wrapper, style]}>
      <CircledLayout style={styles.assigneeWrapper}>
        <View style={styles.assigneeTextPart}>
          <View style={styles.circle}>
            <Text18 color={'white'}>{initials}</Text18>
          </View>
          <View>
            <Text18 style={styles.nameSpace} color="title">
              {name}
            </Text18>
            <Text12 color="title">{role}</Text12>
          </View>
        </View>
        <View style={styles.capacity}>
          <Text16>
            {capacity}/{STRINGS.h}
          </Text16>
        </View>
      </CircledLayout>
      <View style={styles.membersBalancer} />
    </PressableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  circle: {
    height: 44,
    width: 44,
    marginRight: 8,
    borderRadius: Number.MAX_SAFE_INTEGER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.main,
  },
  nameSpace: {
    marginBottom: 4,
  },
  assigneeTextPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  capacity: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.background,
    borderRadius: Number.MAX_SAFE_INTEGER,
  },
  assigneeWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  membersBalancer: {
    width: 20,
  },
});
