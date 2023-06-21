import React from 'react';
import { Project, ProjectProps } from './project.component';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export interface ProjectListProps {
  projects: Omit<ProjectProps, 'onPress'>[];
  onPress: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onPress,
  style,
}) => {
  const renderItem: ListRenderItem<Omit<ProjectProps, 'onPress'>> = ({
    item,
  }) => {
    return <Project {...item} onPress={() => onPress(item.id)} />;
  };
  return (
    <FlatList
      style={[style]}
      data={projects}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
});
