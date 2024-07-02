export interface RemoteTodoObject {
  todos: RemoteTodo,
  total: number,
  skip: number,
  limit: number
}

export interface RemoteTodo {
  id: number,
  todo: string,
  completed: boolean,
  userId: number
}
