import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootNavigationProp, TaskRoute } from 'src/routes/root/root.types';
import {
  STORY_POINTS,
  Task as TaskData,
  TaskType,
} from 'src/common/types/task.types';
import { taskApi } from 'src/api/tasks/task.api';
import { Error } from 'src/common/components/error.component';
import { Member } from 'src/common/components/member.component';
import { Indicator } from 'src/features/task/indicator.component';
import { getTaskTypeNameByType } from 'src/common/utils/get-task-type-name-by-type.util';
import { STRINGS } from 'src/common/constants/strings.consts';
import { addPlural } from 'src/common/utils/add-plural.util';
import { COLORS } from 'src/common/constants/colors.consts';
import { Text22 } from 'src/common/components/text.component';
import { Note, NoteProps } from 'src/common/components/note.component';
import { MessageInput } from 'src/common/components/message-input.component';
import { structuredScreens } from 'src/common/constants/screens.consts';
import moment from 'moment';

export interface TaskScreenProps {}

export const TaskScreen: React.FC<TaskScreenProps> = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {
    params: { taskId },
  } = useRoute<TaskRoute>();

  const inputRef = useRef<TextInput | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [task, setTask] = useState<TaskData>();

  const [note, setNote] = useState<string>('');
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    const response = await taskApi.getTaskById(taskId);
    if (response.error) {
      setError(response.error);
    } else {
      setTask(response.data);
    }
  }, [taskId]);

  useEffect(() => {
    fetchTasks().then(() => {
      setLoading(false);
    });
  }, [fetchTasks]);

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
    if (!task) {
      return;
    }
    return navigation.navigate(structuredScreens.projectMember, {
      userId: task.assigneeUser.id,
    });
  };

  const changeDeadlineHandler = () => {
    setDatePickerOpen(true);
  };

  const renderItem: ListRenderItem<NoteProps & { id: number }> = ({ item }) => {
    return (
      <PressableOpacity>
        <Note {...item} />
      </PressableOpacity>
    );
  };

  const setNewDeadlineHandler = (date: Date) => {
    const dateObj = moment(date);
    const newDeadline = dateObj.diff(new Date(), 'day') + 1;

    setTask(prev => ({ ...prev, daysLeft: newDeadline }));
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
    setTask(prev => ({ ...prev, storyPoints: nextValue }));
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
        nextValue = TaskType.archived;
        break;
    }
    setTask(prev => ({ ...prev, status: nextValue }));
  };

  if (loading) {
    return <Loading withBack />;
  }

  if (error) {
    return <Error withBack error={error} />;
  }

  return (
    <SafeAreaView edges={['top']}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={16}>
        <HeaderWithButtons
          focused={focused}
          setFocused={setFocused}
          ref={ref}
          title={task?.name ?? ''}
          icons={[
            {
              icon: 'search',
              onPress: () => ref.current?.focus(),
            },
          ]}
          onChangeText={newText => {
            changeText('name', newText);
          }}
          style={styles.header}
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
          name={task?.assigneeUser?.username ?? ''}
          role={task?.assigneeUser?.role ?? ''}
          capacity={task?.assigneeUser.storyPointsPerWeek || 0}
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
              text={`${task?.daysLeft} ${addPlural(
                task?.daysLeft,
                STRINGS.day,
              )}`}
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

        <FlatList
          data={mockNotes}
          ItemSeparatorComponent={() => <View style={styles.noteSeparator} />}
          renderItem={renderItem}
          onTouchStart={touchHandler}
          scrollEventThrottle={100}
        />

        <MessageInput
          ref={inputRef}
          onPress={() => null}
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
      </KeyboardAvoidingView>
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

const mockNotes = [
  {
    id: 0,
    initials: 'SG',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    incoming: true,
  },
  {
    id: 1,
    initials: 'NS',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a g alley of type and scrambled it to make a type specimen book.",
    incoming: false,
  },
  {
    id: 2,
    initials: 'PZ',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    incoming: true,
  },
];
