import { createAction, props } from "@ngrx/store";
import { Todo } from "../model";

export const loadAllSucces = createAction(
  '[Todos Api] Load All Success',
  props<{ todos: Todo[]}>()
)

export const loadAllError = createAction(
  '[Todos Api] Load All Error',
  props<{ errorMessage: string }>()
)
