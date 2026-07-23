import { useDraggable } from "@dnd-kit/react";

const Card = ({
  key,
  id,
  title,
  tag,
  storyPoints,
}: {
  key: string;
  id: string;
  title: string;
  tag: string;
  storyPoints: number;
}) => {
  const { ref } = useDraggable({
    id,
  });

  return (
    <div className="card-container" ref={ref} key={key}>
      <span className="card-id">{id}</span>
      <span className="card-title">{title}</span>
      <div className="card-additional-info">
        <span className="card-tag">{tag}</span>
        <span className="card-story-points">{storyPoints}</span>
      </div>
    </div>
  );
};

export default Card;
