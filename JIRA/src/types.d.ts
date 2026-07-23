interface Task {
    id: string;
    title: string;
    tag: string;
    storyPoints: number;
    status: "backlog" | "inProgress" | "review" | "done";
}