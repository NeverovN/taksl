import { StyleSheet } from 'react-native';
import { COLORS } from 'src/common/constants/colors.consts';
import { TaskType } from '../types/task.types';

export const getStyleByTaskType = (type: TaskType) => {
  switch (type) {
    case TaskType.archived:
      return archivedStyles;
    case TaskType.inProgress:
      return inProgressStyles;
    case TaskType.inReview:
      return inReviewStyles;
    case TaskType.done:
      return doneStyles;
  }
};

const archivedStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.archive,
  },
  secondary: {
    backgroundColor: COLORS.archiveSecondary,
  },
  intermediate: {
    borderColor: COLORS.archiveIntermediate,
  },
});

const inProgressStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.inProgress,
  },
  secondary: {
    backgroundColor: COLORS.inProgressSecondary,
  },
  intermediate: {
    borderColor: COLORS.inProgressIntermediate,
  },
});

const inReviewStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.inReview,
  },
  secondary: {
    backgroundColor: COLORS.inReviewSecondary,
  },
  intermediate: {
    borderColor: COLORS.inReviewIntermediate,
  },
});

const doneStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.done,
  },
  secondary: {
    backgroundColor: COLORS.doneSecondary,
  },
  intermediate: {
    borderColor: COLORS.doneIntermediate,
  },
});
