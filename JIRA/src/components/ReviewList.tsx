import { useDroppable } from "@dnd-kit/react";
import Card from "./Card";

const ReviewList = ({ tasks }: { tasks: Task[] }) => {
  const { ref } = useDroppable({
    id: "review-list-droppable-container",
  });
  return (
    <div className="review-list-container">
      <h2 className="section-header">Review</h2>
      <div className="review-list" ref={ref}>
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

export default ReviewList;
