/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from '../base.api';
import { PromiseResponse } from 'src/common/types/api.types';
import { UserData } from 'src/redux/user/user.types';
import { ProjectResponse, UpdateUserBody } from './projects.types';
import { delay } from 'src/common/utils/delay.util';
import { TaskResponse } from '../tasks/tasks.types';
import { TaskType } from 'src/common/types/task.types';

export class ProjectsAPI {
  getProjectsByUserId = async (
    id: string,
  ): PromiseResponse<ProjectResponse[], Error> => {
    // baseApi.get(`/project/${id}`);
    await delay(1000);

    return {
      status: 200,
      ok: true,
      data: mockProjects,
    };
  };

  getProjectById = async (
    projectId: string,
  ): PromiseResponse<ProjectResponse, Error> => {
    // return baseApi.get(`/project/${projectId}`);

    await delay(500);

    let project;

    switch (projectId) {
      case '0':
        project = mockProject0;
        break;
      case '1':
        project = mockProject1;
        break;
      case '2':
        project = mockProject2;
        break;
      default:
        project = mockProject0;
        break;
    }

    return { ok: true, status: 200, data: project };
  };

  getTasksByProjectId = async (
    id: string,
  ): PromiseResponse<TaskResponse[], Error> => {
    // baseApi.get(`/project/${id}`);
    await delay(1000);

    return {
      status: 200,
      ok: true,
      data: mockTasks,
    };
  };
}

export const projectsApi = new ProjectsAPI();

const mockProject0 = {
  id: '0',
  name: 'First Project',
  description: 'First Project Description',
  memberUsers: [
    {
      id: '0',
      username: 'Nastia Soldatenko',
      initials: 'NS',
    },
  ],
};

const mockProject1 = {
  id: '1',
  name: 'Second Project',
  description: 'Second Project Description',
  memberUsers: [
    {
      id: '0',
      username: 'Nastia Soldatenko',
      initials: 'NS',
    },
    {
      id: '1',
      username: 'Siarhei Halavachanka',
      initials: 'SH',
    },
  ],
};

const mockProject2 = {
  id: '2',
  name: 'Third Project',
  description: 'Third Project Description',
  memberUsers: [
    {
      id: '2',
      username: 'Pavel Zlomaniec',
      initials: 'PZ',
    },
  ],
};

const mockProjects = [mockProject0, mockProject1, mockProject2];

const mockTask0 = {
  id: '0',
  name: 'First Task',
  description: 'First Task Description',
  storyPoints: 1,
  daysLeft: 3,
  assigneeUser: {
    id: '0',
    username: 'Nastia Soldatenko',
    initials: 'NS',
  },
  status: TaskType.archived,
};

const mockTask1 = {
  id: '1',
  name: 'Second Task',
  description: 'Second Task Description',
  storyPoints: 2,
  daysLeft: 14,
  assigneeUser: {
    id: '1',
    username: 'Siarhei Halavachanka',
    initials: 'SH',
  },
  status: TaskType.inProgress,
};

const mockTask2 = {
  id: '2',
  name: 'Third Task',
  description: 'Third Task Description',
  storyPoints: 12,
  daysLeft: 6,
  assigneeUser: {
    id: '2',
    username: 'Pavel Zlomaniec',
    initials: 'PZ',
  },
  status: TaskType.inReview,
};

const mockTask3 = {
  id: '3',
  name: 'Forth Task',
  description: 'Forth Task Description',
  storyPoints: 5,
  daysLeft: 32,
  assigneeUser: {
    id: '0',
    username: 'Nastia Soldatenko',
    initials: 'NS',
  },
  status: TaskType.done,
};

const mockTask4 = {
  id: '4',
  name: 'Fifth Task',
  description: 'Fifth Task Description',
  storyPoints: 2,
  daysLeft: 1,
  assigneeUser: {
    id: '0',
    username: 'Nastia Soldatenko',
    initials: 'NS',
  },
  status: TaskType.archived,
};

const mockTask5 = {
  id: '5',
  name: 'Sixth Task',
  description: 'Sixth Task Description',
  storyPoints: 7,
  daysLeft: 19,
  assigneeUser: {
    id: '1',
    username: 'Siarhei Halavachanka',
    initials: 'SH',
  },
  status: TaskType.inProgress,
};

const mockTask6 = {
  id: '6',
  name: 'Seventh Task',
  description: 'Seventh Task Description',
  storyPoints: 0.6,
  daysLeft: 23,
  assigneeUser: {
    id: '2',
    username: 'Pavel Zlomaniec',
    initials: 'PZ',
  },
  status: TaskType.inReview,
};

const mockTasks: TaskResponse[] = [
  mockTask0,
  mockTask1,
  mockTask2,
  mockTask3,
  mockTask4,
  mockTask5,
  mockTask6,
];
