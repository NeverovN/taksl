import React from 'react';
import { Project } from './project.component';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { ProjectShort } from 'src/api/projects/projects.types';

export interface ProjectListProps
  extends Omit<FlatListProps<ProjectShort>, 'data' | 'renderItem'> {
  projects: ProjectShort[];
  onPress: (id: string) => void;
  style?: StyleProp<ViewStyle>;
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onPress,
  style,
  ...rest
}) => {
  const renderItem: ListRenderItem<ProjectShort> = ({ item }) => {
    return <Project {...item} onPress={() => onPress(item.id)} />;
  };
  return (
    <FlatList
      style={[style]}
      data={projects}
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
});
