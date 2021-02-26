import React, {FormEvent, useState} from "react";
import {useStores} from "../../store";
import {observer} from "mobx-react";

export interface IProps {
  userId: number;
}

const AddTodoForm = ({ userId }: IProps) => {
  const {
    view: { profile },
    todoStore,
  } = useStores();
  const [text, setText] = useState("");

  const addTodo = (e: FormEvent<any>) => {
    e.preventDefault();

    // Добавляем туду в стор
    todoStore.addTodo(userId, text);
    setText("");
  };

  return (
    <form action="" onSubmit={addTodo}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Добавить todo</button>
    </form>
  );
};

export default observer(AddTodoForm);
