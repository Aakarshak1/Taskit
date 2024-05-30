import { z } from 'zod';

export type TodoStatusType = keyof typeof TODO_STATUSES;
export type TodoListType = keyof typeof LISTS;

export const TODO_STATUSES = {
  TODO: 'Todo',
  INPROGRESS: 'In Progress',
  DONE: 'Done',
};

export const LISTS = {
  PERSONAL: 'Personal',
  WORK: 'Work',
  SHOPPING: 'Shopping',
};

export const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  status: z.string({
    required_error: 'please select status.',
  }),
  list: z.string(),
});
