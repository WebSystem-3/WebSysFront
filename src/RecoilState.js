import { atom } from 'recoil';

export const userState = atom({
  key: 'user_id',
  default: null,
});

export const dateState = atom({
  key: 'task_date',
  default: null,
});

export const timeState = atom({
  key: 'task_time',
  default: null,
});

