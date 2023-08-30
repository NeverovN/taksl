import { baseApi } from '../base.api';
import { PromiseResponse } from 'src/common/types/api.types';

import { Task, TaskUpdateBody } from 'src/common/types/task.types';
import { NoteBody, TaskNotesResponse } from './tasks.types';

export class TaskAPI {
  getTaskById = async (
    projectId: string,
    taskId: string,
  ): PromiseResponse<Task, Error> =>
    baseApi.get(`/project/${projectId}/task/${taskId}`);

  getNotesForTask = (
    projectId: string,
    taskId: string,
  ): PromiseResponse<TaskNotesResponse, Error> =>
    baseApi.get(`/project/${projectId}/task/${taskId}/comment`);

  addComment = (projectId: string, taskId: string, body: NoteBody) =>
    baseApi.post(`/project/${projectId}/task/${taskId}/comment`, body);

  updateTask = (projectId: string, taskId: string, body: TaskUpdateBody) =>
    baseApi.put(`/project/${projectId}/task/${taskId}`, body);
}

export const taskApi = new TaskAPI();
