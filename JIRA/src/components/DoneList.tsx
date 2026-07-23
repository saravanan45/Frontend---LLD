import { useDroppable } from "@dnd-kit/react";
import Card from "./Card";

const DoneList = ({ tasks }: { tasks: Task[] }) => {
  const { ref } = useDroppable({
    id: "done-list-droppable-container",
  });
  return (
    <div className="done-list-container">
      <h2 className="section-header">Done</h2>
      <div className="done-list" ref={ref}>
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

export default DoneList;
