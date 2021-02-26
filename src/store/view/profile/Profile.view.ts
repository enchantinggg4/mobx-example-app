import { IUser, UserStore } from "../../UserStore";
import {action, computed, makeObservable, observable, observe, reaction} from "mobx";
import {ITodo, TodoStore} from "../../TodoStore";

export class ProfileView {
  @observable
  userId?: number;

  @observable
  user?: IUser;

  @computed
  public get todos(): ITodo[] {
    return this.userId === undefined ? [] : this.todoStore.todos.filter(todo => todo.creatorId === this.userId)
  }

  constructor(private readonly userStore: UserStore, private readonly todoStore: TodoStore) {
    makeObservable(this);

    /**
     * Меняется ID - обновляем юзера
     */
    reaction(
      () => [this.userId],
      this.updateUser
    );
  }

  @action
  private updateUser = async () => {
    console.log("Call updateUser()")
    if (this.userId === undefined) return;

    this.user = undefined;
    // this.todos = [];

    this.userStore.resolveUser(this.userId).then((t) => (this.user = t));
  };
}
