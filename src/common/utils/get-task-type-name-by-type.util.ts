import { STRINGS } from '../constants/strings.consts';
import { TaskType } from '../types/task.types';

export const getTaskTypeNameByType = (type?: TaskType) => {
  switch (type) {
    case TaskType.archived:
      return STRINGS.archive;
    case TaskType.done:
      return STRINGS.done;
    case TaskType.inProgress:
      return STRINGS.inProgress;
    case TaskType.inReview:
      return STRINGS.inReview;
    default:
      return '';
  }
};
