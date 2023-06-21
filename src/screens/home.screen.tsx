import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { PressableOpacity } from 'src/common/components/button.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { structuredScreens } from 'src/common/constants/screens.consts';
import { Header } from 'src/features/home/header.component';
import { Project, ProjectProps } from 'src/features/home/project.component';
import { FETCH_USER } from 'src/redux/user/user.actions';
import { rootUserSelector } from 'src/redux/user/user.selectors';
import { RootNavigationProp } from 'src/routes/root/root.types';

export interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const dispatch = useDispatch();
  const { loading, data } = useSelector(rootUserSelector);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const projectPressHandler = useCallback(
    (projectId: string) => {
      navigation.push(structuredScreens.project, { projectId });
    },
    [navigation],
  );

  const settingsPressHandler = useCallback(() => {
    navigation.navigate(structuredScreens.client.root, {
      screen: structuredScreens.client.tabs.dashboard.root,
      params: {
        screen: structuredScreens.client.tabs.dashboard.screens.settings,
      },
    });
  }, [navigation]);

  const renderItem: ListRenderItem<ProjectProps> = useCallback(
    ({ item }) => {
      return (
        <PressableOpacity onPress={() => projectPressHandler(item.id)}>
          <Project {...item} />
        </PressableOpacity>
      );
    },
    [projectPressHandler],
  );

  const refreshHandler = () => {
    setRefreshing(true);
    dispatch(FETCH_USER.TRIGGER({ id: data.id }));
  };

  if (loading && !refreshing) {
    return null;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <FlatList
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <Header
            style={styles.header}
            name={data.username}
            role={data.role}
            onPress={settingsPressHandler}
          />
        )}
        data={data.projects}
        contentContainerStyle={styles.projectList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            onRefresh={refreshHandler}
            refreshing={refreshing && loading}
          />
        }
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
    paddingTop: 16,
  },
  header: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  projectList: {
    paddingRight: 16,
  },
  separator: {
    height: 16,
  },
});
