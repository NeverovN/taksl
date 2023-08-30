import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { UserShortened } from 'src/api/projects/projects.types';
import { Member } from 'src/common/components/member.component';
import { OptionalPick } from 'src/common/types/optional.type';

export interface ProjectMembersListProps
  extends Omit<FlatListProps<any>, 'data' | 'renderItem'> {
  members: OptionalPick<UserShortened, 'storyPointsPerWeek' | 'role'>[];
  onPress: (id: string) => void;
}

export const ProjectMembersList: React.FC<ProjectMembersListProps> = ({
  members,
  onPress,
  ...rest
}) => {
  const renderItem: ListRenderItem<
    OptionalPick<UserShortened, 'storyPointsPerWeek' | 'role'>
  > = ({ item }) => {
    return (
      <Member
        key={item.id}
        onPress={() => onPress(item.id)}
        {...item}
        storyPointsPerWeek={item.storyPointsPerWeek?.toFixed(1)}
      />
    );
  };

  return (
    <FlatList
      data={members}
      contentContainerStyle={styles.listStyle}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      {...rest}
    />
  );
};

export const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  listStyle: {
    paddingBottom: 32,
  },
});
