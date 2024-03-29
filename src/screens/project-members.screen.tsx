import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { projectsApi } from 'src/api/projects/projects.api';
import { taskApi } from 'src/api/tasks/task.api';
import { HeaderWithButtons } from 'src/common/components/header-with-buttons.component';
import { Loading } from 'src/common/components/loading.component';
import { structuredScreens } from 'src/common/constants/screens.consts';
import { STRINGS } from 'src/common/constants/strings.consts';
import { ProjectMembersList } from 'src/features/project-members/project-members.component';
import { SortItems } from 'src/features/project-members/sort-items.component';
import { ProjectData } from 'src/features/project/types/project.type';
import { MembersRoute, RootNavigationProp } from 'src/routes/root/root.types';

export interface ProjectMembersProps {}

export const ProjectMembersScreen: React.FC = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    params: { projectId, taskId },
  } = useRoute<MembersRoute>();
  const ref = useRef<TextInput>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const [project, setProject] = useState<ProjectData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [, setError] = useState<Error | null>(null);

  const [value, setValue] = useState<string>(STRINGS.projectMembers);

  const [performanceSelected, setPerformanceSelected] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    setLoading(true);
    fetchProject().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshHandler = () => {
    setRefreshing(true);
    fetchProject().finally(() => setRefreshing(false));
  };

  const fetchProject = async () => {
    const response = await projectsApi.getProjectById(projectId);
    if (response.error) {
      setError(response.error);
      return;
    }

    setProject(prev => ({ ...(prev as ProjectData), ...response.data }));
  };

  const performancePressHandler = () => {
    setPerformanceSelected(prev => {
      const currState = ((prev + 1) % 3) as 0 | 1 | 2;

      return currState;
    });
  };

  const memberPressHandler = (id: string) => {
    if (taskId) {
      taskApi.updateTask(projectId, taskId, { assigneeUserId: id });
      navigation.goBack();
      return;
    }
    navigation.navigate(structuredScreens.projectMember, {
      userId: id,
    });
  };

  const getContent = () => {
    return (
      <>
        <HeaderWithButtons
          focused={focused}
          setFocused={setFocused}
          ref={ref}
          title={value}
          onChangeText={setValue}
          style={styles.header}
          editable={false}
        />
        <SortItems
          style={styles.sortItems}
          performanceSelected={performanceSelected}
          onPerformancePress={performancePressHandler}
        />
      </>
    );
  };

  if (loading) {
    return <Loading withBack />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.wrapper} edges={['top']}>
        <ProjectMembersList
          members={project?.memberUsers || []}
          onPress={memberPressHandler}
          ListHeaderComponent={getContent()}
          refreshControl={
            <RefreshControl
              onRefresh={refreshHandler}
              refreshing={refreshing}
            />
          }
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  header: {
    padding: 16,
  },
  sortItems: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});
