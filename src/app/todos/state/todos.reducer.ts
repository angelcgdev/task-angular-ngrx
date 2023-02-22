import { createReducer, on } from "@ngrx/store";
import { Todo } from "../model";
import { TodosApiActions, TodosPageActions } from ".";

export const todosStateFeatureKey = 'todosState';

export interface TodosState {
  todos: Todo[];
}

const initState: TodosState =  {
  todos: []
};


export const todosReducer = createReducer(
  initState,
  on(TodosApiActions.loadAllSucces, (state, action)=>({
    ...state,
    todos: action.todos,
  }) ),
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
    todos:[...state.todos.map(todo=>todo.id === action.todo.id ? { ...todo, completed: true } : todo)]
  })),
  on(TodosPageActions.markAsPending, (state, action)=>({
    ...state,
    todos:[...state.todos.map(todo=>todo.id === action.todo.id ? { ...todo, completed: false }: todo)]
  })),
  on(TodosPageActions.clearCompleted, (state, action)=>({
    ...state,
    todos:[...state.todos.filter(todo=>!todo.completed)]
  }))
)
