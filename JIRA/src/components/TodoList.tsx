import { useDroppable } from "@dnd-kit/react";

import Card from "./Card";

const TodoList = ({ tasks }: { tasks: Task[] }) => {
  const { ref } = useDroppable({
    id: "todo-list-droppable-container",
  });

  return (
    <div className="todo-list-container">
      <h2 className="section-header">Backlog</h2>
      <div className="todo-list" ref={ref}>
        {tasks.map((task) => (
          <Card
            key={task.id}
            id={task.id}
            title={task.title}
            tag={task.tag}
            storyPoints={task.storyPoints}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
