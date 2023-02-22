import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosApiActions, TodosPageActions } from ".";
import { exhaustMap, map, catchError, of, tap } from "rxjs";
import { TodosService } from "../services/todos.service";
import { NotificationsService } from "src/app/notifications/notifications.service";

@Injectable()
export class TodosEffects {

  constructor(private actions$: Actions,private todosService: TodosService, private notificationsService: NotificationsService){}

  loadAll$ = createEffect(()=>
    this.actions$.pipe(
      ofType(TodosPageActions.init),
      exhaustMap((initAction) =>
        this.todosService
          .getAll()
          .pipe(
            map((todos) => TodosApiActions.loadAllSucces({ todos })),
            catchError(()=>of(
              TodosApiActions.loadAllError({ errorMessage: 'Ha ocurrido un error al intentar obtener el listado de tareas.'})
            ))
        ))
    )
  )

  notifyApiError$ = createEffect(()=> this.actions$.pipe(
    ofType(TodosApiActions.loadAllError),
    tap(action=> this.notificationsService.error(action.errorMessage))
  ))
}
