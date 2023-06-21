import { baseApi } from '../base.api';
import { PromiseResponse } from 'src/common/types/api.types';

import { Task, TaskType } from 'src/common/types/task.types';

export class TaskAPI {
  getTaskById = async (id: string): PromiseResponse<Task, Error> => {
    // baseApi.post('/auth', body);
    return {
      status: 200,
      ok: true,
      data: {
        id: '0',
        name: 'Task Name',
        description: 'Task Description',
        assigneeUser: {
          id: '0',
          username: 'Nastya Soldatenko',
          initials: 'NS',
          role: 'UX/UI designer',
          storyPointsPerWeek: 15,
        },
        storyPoints: 1,
        status: TaskType.archived,
        daysLeft: 14,
      },
    };
  };
}

export const taskApi = new TaskAPI();
