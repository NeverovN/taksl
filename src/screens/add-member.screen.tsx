import { useRoute } from '@react-navigation/native';
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
import { ProjectResponse, UserShort } from 'src/api/projects/projects.types';
import { userApi } from 'src/api/user/user.api';
import { HeaderWithButtons } from 'src/common/components/header-with-buttons.component';
import { Loading } from 'src/common/components/loading.component';
import { STRINGS } from 'src/common/constants/strings.consts';
import { ProjectMembersList } from 'src/features/project-members/project-members.component';
import { SortItems } from 'src/features/project-members/sort-items.component';
import { AddMemberRoute } from 'src/routes/root/root.types';

export interface AddMemberScreenProps {}

export const AddMemberScreen: React.FC = () => {
  const {
    params: { projectId },
  } = useRoute<AddMemberRoute>();
  const ref = useRef<TextInput>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const [users, setUsers] = useState<UserShort[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [, setError] = useState<Error | null>(null);
  const [project, setProject] = useState<ProjectResponse>();

  const [value, setValue] = useState<string>(STRINGS.addMember);

  const [performanceSelected, setPerformanceSelected] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProject(), fetchUsers()]).finally(() =>
      setLoading(false),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUsers(
      users?.filter(
        user => !project?.memberUsers.some(member => member.id === user.id),
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const refreshHandler = () => {
    setRefreshing(true);
    fetchUsers().finally(() => setRefreshing(false));
  };

  const fetchUsers = async () => {
    const response = await userApi.getAllUsers();
    if (response.error) {
      setError(response.error);
      return;
    }

    setUsers(response.data);
  };

  const fetchProject = async () => {
    const response = await projectsApi.getProjectById(projectId);
    if (response.error) {
      setError(response.error);
      return;
    }

    setProject(response.data);
  };

  const performancePressHandler = () => {
    setPerformanceSelected(prev => {
      const currState = ((prev + 1) % 3) as 0 | 1 | 2;
      return currState;
    });
  };

  const addMemberHandler = (id: string) => {
    projectsApi
      .updateProject(projectId, {
        memberUserIds: [
          ...(project ? project?.memberUsers.map(member => member.id) : []),
          id,
        ],
      })
      .then(fetchProject);
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
          members={users || []}
          onPress={addMemberHandler}
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
