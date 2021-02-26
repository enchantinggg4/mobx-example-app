import {observer} from "mobx-react";
import {useStores} from "../../store";
import React, {useEffect} from "react";
import {IUser} from "../../store/UserStore";
import {ITodo} from "../../store/TodoStore";
import "./Profile.css";
import AddTodoForm from "../AddTodoForm/AddTodoForm";

export interface IProps {
  profile: IUser;
}

const Todo = (todo: ITodo) => {
  return <div className="todo">{todo.text}</div>;
};

const TodoList = ({ todos }: { todos: ITodo[] }) => {
  return (
    <div className="profile-page-todolist">
      {todos.map((todo) => (
        <Todo {...todo} />
      ))}
    </div>
  );
};

const Profile = (props: IProps) => {
  const { profile } = useStores().view;

  useEffect(() => {
    profile.userId = props.profile.id;
  }, [props.profile]);

  return (
    <div className="profile-page">
      <div className="profile-page-title">{props.profile.name}</div>

      <TodoList todos={profile.todos} />
      <AddTodoForm userId={props.profile.id} />
    </div>
  );
};

export default observer(Profile);
