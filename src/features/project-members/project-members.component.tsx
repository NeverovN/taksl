import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { Member, ProjectMember } from 'src/common/components/member.component';

export interface ProjectMembersListProps {
  members: ProjectMember[];
  onPress: (id: string) => void;
}

export const ProjectMembersList: React.FC<ProjectMembersListProps> = ({
  members,
  onPress,
}) => {
  const renderItem: ListRenderItem<ProjectMember> = ({ item }) => {
    return (
      <Member
        key={item.id}
        id={item.id}
        initials={item.initials}
        name={item.name}
        role={item.role}
        capacity={item.capacity}
        onPress={() => onPress(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={members}
      contentContainerStyle={styles.listStyle}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
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
