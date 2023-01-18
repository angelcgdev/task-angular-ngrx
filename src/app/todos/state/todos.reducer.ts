import { createReducer, on } from "@ngrx/store";
import { Todo } from "../model";
import { TodosPageActions } from ".";

export const todosStateFeatureKey = 'todosState';

export interface TodosState {
  todos: Todo[];
}

const initState: TodosState =  {
  todos: []
};


export const todosReducer = createReducer(
  initState,
  on(TodosPageActions.init, ()=>({...initState}) ),
  on(TodosPageActions.addTodo, (state, action)=>({
    ...state,
    todos: [...state.todos, action.todo],
  })),
  on(TodosPageActions.removeTodo, (state, action)=>({
    ...state,
    todos: [...state.todos.filter(todo => todo.id !== action.todo.id)]
  })),
  on(TodosPageActions.markAsCompleted, (state, action)=>({
    ...state,
    todos:[...state.todos.map(todo=>({...todo, completed: todo.id===action.todo.id?true:todo.completed}))]
  })),
  on(TodosPageActions.markAsPending, (state, action)=>({
    ...state,
    todos:[...state.todos.map(todo=>({...todo, completed: todo.id===action.todo.id?false:todo.completed}))]
  })),
  on(TodosPageActions.clearCompleted, (state, action)=>({
    ...state,
    todos:[...state.todos.filter(todo=>!todo.completed)]
  }))
)
