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
