import {UserStore} from "./UserStore";
import {TodoStore} from "./TodoStore";
import {ProfileView} from "./view/profile/Profile.view";


import { configure } from "mobx"
import {AppView} from "./view/App.view";

configure({
  enforceActions: "never",
})


export interface RootStore {
  userStore: UserStore;
  todoStore: TodoStore;


  view: {
    app: AppView,
    profile: ProfileView
  }

}


function initStore(): RootStore {


  const todo = new TodoStore()
  const user = new UserStore()



  for(let i = 0; i < 50; i++){
    user.resolveUser(i).then(() => {
      // for(let j = 0; j < Math.random() * 3; j++){
      //   todo.addTodo(i, `Some random todo text ${j}`)
      // }
    });
  }

  return {
    todoStore: todo,
    userStore: user,
    view: {
      app: new AppView(),
      profile: new ProfileView(user, todo)
    }
  }
}

const rootStore = initStore();

export const useStores = (): RootStore => {
  return rootStore;
}

export default rootStore;

// @ts-ignore
window.stores = rootStore;
