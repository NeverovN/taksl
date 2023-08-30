/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from '../base.api';
import { PromiseResponse } from 'src/common/types/api.types';
import { UserData } from 'src/redux/user/user.types';
import { Member, UpdateUserBody, UserNote } from './user.types';
import { delay } from 'src/common/utils/delay.util';
import { UserShort } from '../projects/projects.types';

export class UserAPI {
  getUserById = async (id: string): PromiseResponse<Member, Error> => {
    return baseApi.get(`/user/${id}`);
    // await delay(1000);

    // return {
    //   status: 200,
    //   ok: true,
    //   data: {
    //     id: '0',
    //     username: 'Nastya Soldatenko',
    //     initials: 'NS',
    //     role: 'UX/UI Designer',
    //     phone: '11342334123',
    //     email: 'some@email.com',
    //     telegram: '@nastya_soldatenko',
    //     storyPointsPerWeek: 15.1,чел
    //   },
    // };
  };

  getCurrentUser = () => baseApi.get('/user/self');

  getUserNotes = (): PromiseResponse<UserNote[], Error> => baseApi.get('/note');

  addUserNote = (text: string): PromiseResponse<UserNote, Error> =>
    baseApi.post('/note', { text });

  updateUser = async (
    id: string,
    body: UpdateUserBody,
  ): PromiseResponse<UserData, Error> => baseApi.put('/user/self', body);

  getAllUsers = async (): PromiseResponse<UserShort[], Error> =>
    baseApi.get('/user');
}

export const userApi = new UserAPI();
