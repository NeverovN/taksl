import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderWithButtons } from 'src/common/components/header-with-buttons.component';
import { Loading } from 'src/common/components/loading.component';
import { Description } from 'src/features/project/description.component';
import { PressableOpacity } from 'src/common/components/button.component';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootNavigationProp, TaskRoute } from 'src/routes/root/root.types';
import {
  STORY_POINTS,
  Task as TaskData,
  TaskType,
  TaskUpdateBody,
} from 'src/common/types/task.types';
import { taskApi } from 'src/api/tasks/task.api';
import { Error } from 'src/common/components/error.component';
import { Member } from 'src/common/components/member.component';
import { Indicator } from 'src/features/task/indicator.component';
import { getTaskTypeNameByType } from 'src/common/utils/get-task-type-name-by-type.util';
import { STRINGS } from 'src/common/constants/strings.consts';
import { COLORS } from 'src/common/constants/colors.consts';
import { Text22 } from 'src/common/components/text.component';
import { Note } from 'src/common/components/note.component';
import { MessageInput } from 'src/common/components/message-input.component';
import { structuredScreens } from 'src/common/constants/screens.consts';
import moment from 'moment';
import { TaskNote, TaskNotesResponse } from 'src/api/tasks/tasks.types';
import { useSelector } from 'react-redux';
import { rootUserSelector } from 'src/redux/user/user.selectors';

export interface TaskScreenProps {}

export const TaskScreen: React.FC<TaskScreenProps> = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    params: { taskId, projectId },
  } = useRoute<TaskRoute>();

  const {
    data: { id: userId },
  } = useSelector(rootUserSelector);

  const inputRef = useRef<TextInput | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [task, setTask] = useState<TaskData>();
  const [notes, setNotes] = useState<TaskNotesResponse>();

  const [note, setNote] = useState<string>('');
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const fetchTask = useCallback(async () => {
    const response = await taskApi.getTaskById(projectId, taskId);
    if (response.error) {
      setError(response.error);
    } else {
      setTask(response.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, taskId]);

  const fetchNotes = async () => {
    const response = await taskApi.getNotesForTask(projectId, taskId);
    if (response.error) {
      setError(response.error);
    } else {
      setNotes(response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      Promise.all([fetchTask(), fetchNotes()]).finally(() => {
        setLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const changeText = (propName: keyof TaskData, newTitle: string) => {
    setTask({ ...(task as TaskData), [propName]: newTitle });
  };

  const ref = useRef<TextInput>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const touchHandler = () => {
    setFocused(false);
    ref.current?.blur();
  };

  const pressAssigneeHandler = () => {
    navigation.navigate(structuredScreens.projectMembers, {
      projectId,
      taskId,
    });
  };

  const changeDeadlineHandler = () => {
    setDatePickerOpen(true);
  };

  const updateTaskHandler = (body: TaskUpdateBody) => {
    return taskApi.updateTask(projectId, taskId, body);
  };

  const renderItem: ListRenderItem<TaskNote> = ({ item }) => {
    const incoming = item.authorUserId !== userId;
    const initials = notes?.authors.find(
      author => author.id === item.authorUserId,
    )?.initials;
    return (
      <PressableOpacity key={item.id}>
        <Note incoming={incoming} text={item.text} initials={initials} />
      </PressableOpacity>
    );
  };

  const setNewDeadlineHandler = (date: Date) => {
    const dateObj = moment(date);
    const formattedDate = dateObj.format('YYYY-MM-DD');
    updateTaskHandler({ deadline: formattedDate }).then(response => {
      if (response.error) {
        setError(response.error);
      } else {
        setTask(response.data);
      }
    });
    setDatePickerOpen(false);
  };

  const cancelDeadlineChangeHandler = () => {
    setDatePickerOpen(false);
  };

  const changeTaskStoryPointsHandler = () => {
    const currentValue = task?.storyPoints;
    const nextValue =
      STORY_POINTS[
        (STORY_POINTS.findIndex(el => el === currentValue) + 1) %
          STORY_POINTS.length
      ];
    updateTaskHandler({ storyPoints: nextValue }).then(response => {
      if (response.error) {
        setError(response.error);
      } else {
        setTask(response.data);
      }
    });
  };

  const changeTaskStatusHandler = () => {
    const currentValue = task?.status;
    let nextValue: TaskType;
    switch (currentValue) {
      case TaskType.archived:
        nextValue = TaskType.inProgress;
        break;
      case TaskType.inProgress:
        nextValue = TaskType.inReview;
        break;
      case TaskType.inReview:
        nextValue = TaskType.done;
        break;
      case TaskType.done:
      default:
        nextValue = TaskType.archived;
        break;
    }
    updateTaskHandler({ status: nextValue }).then(response => {
      if (response.error) {
        setError(response.error);
      } else {
        setTask(response.data);
      }
    });
  };

  const addNoteHandler = () => {
    taskApi.addComment(projectId, taskId, { text: note }).then(fetchNotes);
    setNote('');
  };

  const refreshHandler = () => {
    setRefreshing(true);
    Promise.all([fetchTask(), fetchNotes()]).finally(() => {
      setRefreshing(false);
    });
  };

  const backPressHandler = () => {
    updateTaskHandler({ ...task }).finally(() => navigation.goBack());
  };
  const getContent = () => {
    return (
      <>
        <HeaderWithButtons
          focused={focused}
          setFocused={setFocused}
          ref={ref}
          title={task?.name ?? ''}
          onChangeText={newText => {
            changeText('name', newText);
          }}
          style={styles.header}
          onBackPress={backPressHandler}
        />
        <Description
          text={task?.description ?? ''}
          onChangeText={newText => {
            changeText('description', newText);
          }}
          style={[styles.description, styles.padding]}
        />
        <Member
          id={task?.assigneeUser?.id || '0'}
          style={[styles.assignee]}
          initials={task?.assigneeUser?.initials ?? ''}
          username={task?.assigneeUser?.username ?? ''}
          role={task?.assigneeUser?.role ?? ''}
          storyPointsPerWeek={task?.assigneeUser.storyPointsPerWeek.toFixed(1)}
          onPress={pressAssigneeHandler}
        />

        <View style={styles.indicatorsRow}>
          <View style={styles.indicatorGroup}>
            <Indicator
              text={`${task?.storyPoints || ''}`}
              type={task?.status ?? TaskType.archived}
              style={styles.indicator}
              onPress={changeTaskStoryPointsHandler}
            />
            <Indicator
              onPress={changeDeadlineHandler}
              text={`${task?.daysLeft} ${STRINGS.day}`}
              type={task?.status ?? TaskType.archived}
            />
          </View>
          <Indicator
            text={getTaskTypeNameByType(task?.status)}
            type={task?.status ?? TaskType.archived}
            position={'right'}
            onPress={changeTaskStatusHandler}
          />
        </View>
        <View style={styles.paddingWrapper}>
          <View style={styles.contentSeparator} />
          <Text22 color="black">{STRINGS.notes}</Text22>
        </View>
      </>
    );
  };

  if (loading) {
    return <Loading withBack />;
  }

  if (error) {
    return <Error withBack error={error} />;
  }

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <FlatList
        ListHeaderComponent={getContent()}
        data={notes?.comments || []}
        ItemSeparatorComponent={() => <View style={styles.noteSeparator} />}
        renderItem={renderItem}
        onTouchStart={touchHandler}
        scrollEventThrottle={100}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />
        }
      />

      <MessageInput
        ref={inputRef}
        onPress={addNoteHandler}
        value={note}
        onChangeText={setNote}
        style={styles.noteInput}
      />
      <DatePicker
        modal
        date={moment(new Date()).add(task?.daysLeft, 'day').toDate()}
        open={datePickerOpen}
        onConfirm={setNewDeadlineHandler}
        onCancel={cancelDeadlineChangeHandler}
        mode={'date'}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  screenWrapper: {
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height,
  },
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
  assignee: { marginBottom: 12 },
  indicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  indicatorGroup: { alignItems: 'flex-start' },
  indicator: { marginBottom: 12 },
  paddingWrapper: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  contentSeparator: {
    backgroundColor: COLORS.backgroundSecondary,
    height: 2,
    marginBottom: 16,
  },
  noteSeparator: {
    height: 16,
  },
  noteInput: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
});
