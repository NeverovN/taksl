import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CircledLayout } from 'src/common/components/circled-layout.component';
import { getStyleByTaskType } from '../../common/utils/get-style-by-task-type.utils';
import { Text12, Text14, Text20 } from 'src/common/components/text.component';
import { COLORS } from 'src/common/constants/colors.consts';
import { STRINGS } from 'src/common/constants/strings.consts';
import { TaskType } from 'src/common/types/task.types';
import { UserShortened } from 'src/api/projects/projects.types';

export interface TaskProps {
  style?: StyleProp<ViewStyle>;
  status: TaskType;
  name: string;
  description?: string;
  storyPoints: number;
  daysLeft: number;
  assigneeUser: UserShortened;
}

export const Task: React.FC<TaskProps> = ({
  style,
  status,
  name,
  description,
  storyPoints,
  daysLeft,
  assigneeUser,
}) => {
  const { primary, secondary, intermediate } = getStyleByTaskType(status);

  return (
    <CircledLayout style={[styles.wrapper, secondary, style]}>
      <View style={[styles.rowWrapper, styles.description]}>
        <View style={[primary, styles.indicator]} />
        <View style={styles.textWrapper}>
          <Text20 style={styles.spacer} color="title" numberOfLines={1}>
            {name}
          </Text20>
          {description && (
            <Text14 color="title" numberOfLines={1}>
              {description}
            </Text14>
          )}
        </View>
      </View>
      <View style={styles.rowWrapper}>
        <View style={[styles.propWrapper, intermediate]}>
          <Text14>{storyPoints}</Text14>
        </View>
        <View style={[styles.propWrapper, intermediate]}>
          <Text14>
            {daysLeft}
            {STRINGS.daysShort}
          </Text14>
        </View>
        <View style={styles.assignee}>
          <Text12 color={'background'}>{assigneeUser.initials}</Text12>
        </View>
      </View>
    </CircledLayout>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  indicator: {
    height: '100%',
    width: 6,
    borderRadius: Number.MAX_SAFE_INTEGER,
    marginRight: 8,
  },
  spacer: {
    marginBottom: 4,
  },
  textWrapper: {
    marginRight: 14,
  },
  propWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Number.MAX_SAFE_INTEGER,
    borderWidth: 1,
    marginRight: 8,
  },
  assignee: {
    height: 36,
    width: 36,
    borderRadius: Number.MAX_SAFE_INTEGER,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    flex: 1,
  },
});
