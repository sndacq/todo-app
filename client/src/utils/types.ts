export interface IComment {
  id?: string;
  comment: string;
  todoId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITodo {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}
