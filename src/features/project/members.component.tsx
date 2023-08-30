import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  PressableOpacity,
  TextButton,
} from 'src/common/components/button.component';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { Text22 } from 'src/common/components/text.component';
import { STRINGS } from 'src/common/constants/strings.consts';
import { FONT_SIZES } from 'src/common/types/text.types';
import { Member } from './member.component';
import { AddButton } from './add-button.component';
import { COLORS } from 'src/common/constants/colors.consts';

export interface MembersProps {
  style?: StyleProp<ViewStyle>;
  members: Array<ProjectMember>;
  onMemberPress: (memberId: string) => void;
  onSeeAllPress: () => void;
  onAddPress: () => void;
}

export type ProjectMember = { username: string; initials: string; id: string };

export const Members: React.FC<MembersProps> = ({
  members,
  onAddPress,
  onSeeAllPress,
  onMemberPress,
  style,
}) => {
  const renderItem: ListRenderItem<ProjectMember> = ({ item }) => {
    return (
      <PressableOpacity onPress={() => onMemberPress(item.id)} key={item.id}>
        <Member name={item.username} initials={item.initials} />
      </PressableOpacity>
    );
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.header}>
        <Text22 color={'black'}>{STRINGS.members}</Text22>
        <TextButton
          size={FONT_SIZES.font16}
          onPress={onSeeAllPress}
          title={STRINGS.seeAll}
        />
      </View>
      <View style={styles.listWrapper}>
        <CircledLayout style={styles.membersWrapper}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            data={members}
            renderItem={renderItem}
            ListHeaderComponent={() => <AddButton onPress={onAddPress} />}
            ListFooterComponent={() => <View style={styles.spacer} />}
          />
        </CircledLayout>
        <View style={styles.listCompensator} />
        {/* <View style={styles.membersBalancer} /> */}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  membersWrapper: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingVertical: 12,
  },
  listWrapper: {
    flexDirection: 'row',
  },
  membersBalancer: {
    flex: 1,
  },
  spacer: {
    width: 20,
  },
  list: {
    borderTopRightRadius: Number.MAX_SAFE_INTEGER,
    borderBottomRightRadius: Number.MAX_SAFE_INTEGER,

    borderColor: COLORS.backgroundSecondary,
  },
  listCompensator: {
    flex: 1,
    minWidth: 32,
  },
});
