import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithButtons } from 'src/common/components/header-with-buttons.component';
import { Loading } from 'src/common/components/loading.component';
import { Description } from 'src/features/project/description.component';
import { Filters } from 'src/features/project/filters.component';
import { Members } from 'src/features/project/members.component';

import { SortItems } from 'src/features/project/sort-items.component';
import { Task } from 'src/features/project/task.component';
import { PressableOpacity } from 'src/common/components/button.component';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ProjectRoute, RootNavigationProp } from 'src/routes/root/root.types';
import { structuredScreens } from 'src/common/constants/screens.consts';
import { TaskType } from 'src/common/types/task.types';
import { ProjectData } from 'src/features/project/types/project.type';
import { projectsApi } from 'src/api/projects/projects.api';
import { TaskResponse } from 'src/api/tasks/tasks.types';
import { Error } from 'src/common/components/error.component';

export interface ProjectProps {}

export const ProjectScreen: React.FC<ProjectProps> = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    params: { projectId },
  } = useRoute<ProjectRoute>();

  const [project, setProject] = useState<ProjectData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const ref = useRef<TextInput>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<TaskType>();
  const [weightSelected, setWeightSelected] = useState<0 | 1 | 2>(0);
  const [deadlineSelected, setDeadlineSelected] = useState<0 | 1 | 2>(0);
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskResponse[]>([]);

  const fetchTasks = async () => {
    const response = await projectsApi.getTasksByProjectId(projectId);

    if (response.error) {
      setError(response.error);
      return;
    }

    setProject(prev => ({ ...(prev as ProjectData), tasks: response.data }));
  };

  const fetchProject = async () => {
    const response = await projectsApi.getProjectById(projectId);
    if (response.error) {
      setError(response.error);
      return;
    }

    setProject(prev => ({ ...(prev as ProjectData), ...response.data }));
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      Promise.all([fetchTasks(), fetchProject()]).finally(() => {
        setLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    setName(project?.name ?? '');
    setDescription(project?.description ?? '');
    setTasks([...(project?.tasks ? project.tasks : [])]);
    setFilteredTasks([...(project?.tasks ? project.tasks : [])]);
  }, [project]);

  const touchHandler = () => {
    setFocused(false);
    ref.current?.blur();
  };

  const memberPressHandler = (userId: string) => {
    navigation.navigate(structuredScreens.projectMember, {
      userId,
    });
  };
  const seeAllPressHandler = () => {
    navigation.navigate(structuredScreens.projectMembers, { projectId });
  };
  const addMemberPressHandler = () => {
    navigation.navigate(structuredScreens.addMember, {
      projectId,
    });
  };

  const selectFilterHandler = (filterType: TaskType) => {
    setSelectedFilter(prevType => {
      if (prevType === filterType) {
        setFilteredTasks(tasks);
        return undefined;
      }
      setFilteredTasks(tasks.filter(task => task.status === filterType));
      return filterType;
    });
  };

  const weightPressHandler = () => {
    setWeightSelected(prev => {
      const currState = ((prev + 1) % 3) as 0 | 1 | 2;

      switch (currState) {
        case 0:
          setFilteredTasks(tasks);
          break;
        case 1:
          setFilteredTasks(
            [...tasks].sort((a, b) => a.storyPoints - b.storyPoints),
          );
          break;
        case 2:
          setFilteredTasks(
            [...tasks].sort((a, b) => b.storyPoints - a.storyPoints),
          );
      }
      return currState;
    });
  };

  const deadlinePressHandler = () => {
    setDeadlineSelected(prev => {
      const currState = ((prev + 1) % 3) as 0 | 1 | 2;

      switch (currState) {
        case 0:
          setFilteredTasks(tasks);
          break;
        case 1:
          setFilteredTasks([...tasks].sort((a, b) => a.daysLeft - b.daysLeft));
          break;
        case 2:
          setFilteredTasks([...tasks].sort((a, b) => b.daysLeft - a.daysLeft));
      }
      return currState;
    });
  };

  const taskPressHandler = (taskId: string) => {
    navigation.navigate(structuredScreens.task, { taskId, projectId });
  };

  const addTaskHandler = () => {
    projectsApi.createTaskInProject(projectId, {}).then(resp => {
      if (resp.error) {
        return;
      }
      navigation.navigate(structuredScreens.task, {
        taskId: resp.data.id,
        projectId,
      });
    });
  };

  const getTypeCount = (status: TaskType) => {
    return tasks.reduce((acc, curr) => {
      return curr.status === status ? acc + 1 : acc;
    }, 0);
  };

  const renderItem: ListRenderItem<TaskResponse> = ({ item }) => {
    return (
      <PressableOpacity onPress={() => taskPressHandler(item.id)}>
        <Task {...item} />
      </PressableOpacity>
    );
  };

  const backPressHandler = () => {
    projectsApi.updateProject(projectId, { name, description }).finally(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    });
  };

  const refreshHandler = () => {
    setRefreshing(true);
    Promise.all([fetchTasks(), fetchProject()]).finally(() => {
      setRefreshing(false);
    });
  };

  const getHeader = () => {
    return (
      <>
        <HeaderWithButtons
          focused={focused}
          setFocused={setFocused}
          ref={ref}
          title={name}
          icons={[
            {
              icon: 'plus',
              onPress: addTaskHandler,
            },
          ]}
          onChangeText={setName}
          style={styles.header}
          onBackPress={backPressHandler}
        />
        <Description
          text={description}
          onChangeText={setDescription}
          style={[styles.description, styles.padding]}
        />
        <Members
          members={project?.memberUsers || []}
          onMemberPress={memberPressHandler}
          onSeeAllPress={seeAllPressHandler}
          onAddPress={addMemberPressHandler}
          style={[styles.members]}
        />
        <Filters
          onSelect={selectFilterHandler}
          archiveCount={getTypeCount(TaskType.archived)}
          inProgressCount={getTypeCount(TaskType.inProgress)}
          reviewCount={getTypeCount(TaskType.inReview)}
          doneCount={getTypeCount(TaskType.done)}
          selected={selectedFilter}
          style={styles.filtersWrapper}
        />
        <SortItems
          weightSelected={weightSelected}
          onWeightPress={weightPressHandler}
          deadlineSelected={deadlineSelected}
          onDeadlinePress={deadlinePressHandler}
          style={styles.sort}
        />
      </>
    );
  };

  if (loading) {
    return <Loading withBack />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <SafeAreaView edges={['top']}>
      <FlatList
        contentContainerStyle={styles.tasks}
        data={filteredTasks}
        ListHeaderComponent={getHeader()}
        ListHeaderComponentStyle={styles.headerPaddingCompensation}
        ItemSeparatorComponent={() => <View style={styles.taskSeparator} />}
        ListFooterComponent={() => <View style={styles.safeAreaCompensation} />}
        renderItem={renderItem}
        onTouchStart={touchHandler}
        style={styles.scrollWrapper}
        scrollEventThrottle={100}
        refreshControl={
          <RefreshControl onRefresh={refreshHandler} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  headerPaddingCompensation: { marginRight: -11 },
  safeAreaCompensation: { height: 32 },
  padding: {
    paddingHorizontal: 16,
  },
  header: {
    padding: 16,
  },
  description: {
    marginBottom: 24,
  },
  members: { marginBottom: 24 },
  scrollWrapper: {
    height: '100%',
  },
  filtersWrapper: {
    marginBottom: 20,
  },
  sort: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tasks: {
    paddingRight: 11,
  },
  taskSeparator: {
    height: 12,
  },
});
