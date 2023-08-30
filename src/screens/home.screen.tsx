import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { projectsApi } from 'src/api/projects/projects.api';
import { UserProject } from 'src/api/projects/projects.types';
import { userApi } from 'src/api/user/user.api';
import { PressableOpacity } from 'src/common/components/button.component';
import { Loading } from 'src/common/components/loading.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { structuredScreens } from 'src/common/constants/screens.consts';
import { Header } from 'src/features/home/header.component';
import { Project } from 'src/features/home/project.component';
import { UserData } from 'src/redux/user/user.types';
import { RootNavigationProp } from 'src/routes/root/root.types';
import { Error as ErrorScreen } from 'src/common/components/error.component';

export interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<UserData>();
  const [projects, setProjects] = useState<UserProject[]>();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      loadHome();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const loadHome = () => {
    setLoading(true);
    Promise.all([fetchUser(), fetchProjects()]).finally(() =>
      setLoading(false),
    );
  };

  const fetchUser = async () => {
    const userResp = await userApi.getCurrentUser();
    if (userResp.error) {
      setError(userResp.error);
    } else {
      setUser(userResp.data);
    }
  };

  const fetchProjects = async () => {
    const projectsResp = await projectsApi.getProjectsForUser();
    if (projectsResp.error) {
      setError(projectsResp.error);
    } else {
      setProjects(projectsResp.data);
    }
  };

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

  const renderItem: ListRenderItem<UserProject> = useCallback(
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
    Promise.all([fetchUser(), fetchProjects()]).finally(() =>
      setRefreshing(false),
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <Header
            style={styles.header}
            name={user?.username ?? ''}
            role={user?.role ?? ''}
            onPress={settingsPressHandler}
          />
        )}
        data={projects}
        contentContainerStyle={styles.projectList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl onRefresh={refreshHandler} refreshing={refreshing} />
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
