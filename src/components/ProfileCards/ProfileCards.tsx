import { observer } from "mobx-react";
import { useStores } from "../../store";
import React from "react";
import { IUser } from "../../store/UserStore";
import "./ProfileCard.css";

interface IProps {
  onUserSelect: (user: IUser) => void;
}

const UserCard = (user: IUser & IProps & { activeUserId?: number }) => {
  return (
    <div className={`user-card ${user.id === user.activeUserId ? "active": ""}`} onClick={() => user.onUserSelect(user)}>
      <div className="user-name">{user.name}</div>
    </div>
  );
};

const ProfileCards = () => {
  const {
    view: { app },
    userStore,
  } = useStores();

  return (
    <div>
      {userStore.users.map((u) => (
        <UserCard
          activeUserId={app.selectedProfile?.id}
          onUserSelect={(u) => (app.selectedProfile = u)}
          key={u.id}
          {...u}
        />
      ))}
    </div>
  );
};

export default observer(ProfileCards);
