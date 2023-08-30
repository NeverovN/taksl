/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from '../base.api';
import { PromiseResponse } from 'src/common/types/api.types';
import { UserData } from 'src/redux/user/user.types';
import {
  ProjectResponse,
  TaskCreatorBody,
  UpdateProjectBody,
  UpdateUserBody,
  UserProject,
} from './projects.types';
import { delay } from 'src/common/utils/delay.util';
import { TaskResponse } from '../tasks/tasks.types';
import { TaskType } from 'src/common/types/task.types';
import { STRINGS } from 'src/common/constants/strings.consts';

export class ProjectsAPI {
  getProjectsForUser = async (): PromiseResponse<UserProject[], Error> =>
    baseApi.get('/project');

  getProjectById = async (
    projectId: string,
  ): PromiseResponse<ProjectResponse, Error> =>
    baseApi.get(`/project/${projectId}`);

  getTasksByProjectId = async (
    id: string,
  ): PromiseResponse<TaskResponse[], Error> =>
    baseApi.get(`/project/${id}/task`);

  createTaskInProject = async (
    projectId: string,
    body: TaskCreatorBody,
  ): PromiseResponse<TaskResponse, Error> =>
    baseApi.post(`/project/${projectId}/task`, {
      name: STRINGS.newTaskNameGeneric,
      description: STRINGS.newTaskDescriptionGeneric,
      ...body,
    });

  createProject = async (
    body: UpdateProjectBody,
  ): PromiseResponse<void, Error> =>
    baseApi.post('/project', {
      name: STRINGS.newProjectNameGeneric,
      description: STRINGS.newProjectDescriptionGeneric,
      ...body,
    });

  updateProject = async (
    projectId: string,
    body: UpdateProjectBody,
  ): PromiseResponse<ProjectResponse, Error> =>
    baseApi.put(`/project/${projectId}`, {
      ...body,
    });
}

export const projectsApi = new ProjectsAPI();
