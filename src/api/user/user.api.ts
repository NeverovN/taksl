/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from '../base.api';
import { PromiseResponse } from 'src/common/types/api.types';
import { UserData } from 'src/redux/user/user.types';
import { UpdateUserBody } from './user.types';
import { delay } from 'src/common/utils/delay.util';

export class UserAPI {
  getUserById = async (id: string): PromiseResponse<UserData, Error> => {
    // baseApi.get(`/user/${id}`);
    await delay(1000);

    return {
      status: 200,
      ok: true,
      data: {
        id: '0',
        username: 'Nastya Soldatenko',
        initials: 'NS',
        role: 'UX/UI Designer',
        phone: '11342334123',
        email: 'some@email.com',
        telegram: '@nastya_soldatenko',
        storyPointsPerWeek: 15.1,
      },
    };
  };

  updateUser = async (
    id: string,
    body: UpdateUserBody,
  ): PromiseResponse<UserData, Error> => {
    // baseApi.post(`/user/${id}`, body);
    await delay(1000);

    return {
      status: 200,
      ok: true,
      data: {
        id: '0',
        username: 'Nastya Soldatenko',
        initials: 'NS',
        role: 'UX/UI Designer',
        phone: '11342334123',
        email: 'some@email.com',
        telegram: '@nastya_soldatenko',
        storyPointsPerWeek: 15.1,
        ...body,
      },
    };
  };
}

export const userApi = new UserAPI();
