import { action, computed, makeObservable, observable } from "mobx";

export interface IUser {
  name: string;
  id: number;
}
export class UserStore {
  @computed
  public get users(): IUser[] {
    return [...this.userCache.values()];
  }

  @observable
  private readonly userCache = new Map<number, IUser>();

  constructor() {
    makeObservable(this);
  }

  @action
  public resolveUser = async (id: number): Promise<IUser> => {
    let cached: IUser | undefined = this.userCache.get(id);

    // Если есть закешированная версия, используем ее
    if (cached) {
      this.fetchUser(id).then((u) => this.userCache.set(u.id, u));
      return cached;
    }
    // Иначе тянем с нуля
    const user = await this.fetchUser(id);
    this.userCache.set(id, user);
    return user;
  };

  @action
  private fetchUser = async (id: number): Promise<IUser> => {
    // wait 0.5 sec
    await new Promise((r) => setTimeout(r, 500));

    return {
      id,
      name: `Username_${id}`,
    };
  };
}
