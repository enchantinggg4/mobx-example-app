import {makeObservable, observable} from "mobx";
import {IUser} from "../UserStore";

export class AppView {


  @observable
  selectedProfile?: IUser

  constructor() {
    makeObservable(this);
  }
}
