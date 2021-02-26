import {action, makeObservable, observable} from "mobx";


export interface ITodo {
  creatorId: number;
  text: string;
  done: boolean;
}
export class TodoStore {

  @observable
  todos: ITodo[] = [];



  @action
  public async addTodo(uid: number, text: string){
    this.todos.push({
      creatorId: uid,
      text,
      done: false
    })
  }

  constructor() {
    makeObservable(this);
  }
}
