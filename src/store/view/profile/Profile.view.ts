import { IUser, UserStore } from "../../UserStore";
import {action, makeObservable, observable, observe, reaction} from "mobx";
import {ITodo, TodoStore} from "../../TodoStore";

export class ProfileView {
  @observable
  userId?: number;

  @observable
  user?: IUser;

  @observable
  todos: ITodo[] = [];

  constructor(private readonly userStore: UserStore, private readonly todoStore: TodoStore) {
    makeObservable(this);

    /**
     * Меняется ID - обновляем юзера
     */
    reaction(
      () => [this.userId],
      this.updateUser
    );

    /**
     * Если добавляется туду в обший store, мы хотим отобразить их во view тоже
     */
    observe(
      this.todoStore.todos,
      this.updateTodos
    )
  }

  @action
  private updateUser = async () => {
    console.log("Call updateUser()")
    if (this.userId === undefined) return;

    this.user = undefined;
    this.todos = [];

    this.userStore.resolveUser(this.userId).then((t) => (this.user = t));
    this.updateTodos();
  };

  @action
  private updateTodos = () => {
    console.log("Call updateTodos()")
    if (this.userId === undefined) {
      this.todos = [];
      return
    }

    this.todos = this.todoStore.todos.filter(t => t.creatorId === this.userId)
  };
}
