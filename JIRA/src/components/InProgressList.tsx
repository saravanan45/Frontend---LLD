import { useDroppable } from "@dnd-kit/react";
import Card from "./Card";

const InProgressList = ({ tasks }: { tasks: Task[] }) => {
  const { ref } = useDroppable({
    id: "in-progress-list-droppable-container",
  });

  return (
    <div className="in-progress-list-container">
      <h2 className="section-header">In Progress</h2>
      <div className="in-progress-list" ref={ref}>
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

export default InProgressList;
