import { atom } from 'recoil';

export const userState = atom({
  key: 'user_id',
  default: null,
});

export const dateState = atom({
  key: 'task_date',
  default: `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`,
});

export const timeState = atom({
  key: 'task_time',
  default: null,
});
