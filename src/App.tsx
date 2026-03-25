import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import KanbanBoard from "./components/Kanban/KanbanBoard";
import ListView from "./components/ListView";
import TimelineView from "./components/TimelineView";
import ViewSwitcher from "./components/ViewSwitcher";
import FilterBar from "./components/FilterBar";

//  TYPES
type Task = {
  id: string;
  title: string;
  status: string;
  priority?: string;
  startDate?: number;
  dueDate?: number;
};

type ActiveUser = {
  userId: string;
  taskId: string;
};

export default function App() {
  const [view, setView] = useState<"kanban" | "list" | "timeline">("kanban");

  const [searchParams, setSearchParams] = useSearchParams();

  //  TASK STATE
  const [tasks, setTasks] = useState<Task[]>([]);

  //  GENERATE 500 TASKS
  useEffect(() => {
    const generated: Task[] = Array.from({ length: 500 }).map((_, i) => ({
      id: i.toString(),
      title: "Task " + i,
      status: ["todo", "inprogress", "review", "done"][i % 4],
      priority: ["low", "medium", "high"][i % 3],
      startDate: Math.floor(Math.random() * 30) + 1,
      dueDate: Math.floor(Math.random() * 30) + 1,
    }));

    setTasks(generated);
  }, []);

  // ✅ ACTIVE USERS
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);

  const users = [
    { id: "u1" },
    { id: "u2" },
    { id: "u3" },
  ];

  //  URL → FILTER
  const statusParam = searchParams.get("status");

  const [filters, setFilters] = useState<{
    status: string[];
  }>({
    status: statusParam ? [statusParam] : [],
  });

  //  FILTER → URL
  useEffect(() => {
    if (filters.status.length > 0) {
      setSearchParams({ status: filters.status[0] });
    } else {
      setSearchParams({});
    }
  }, [filters, setSearchParams]);

  //  APPLY FILTER
  const filteredTasks =
    filters.status.length === 0
      ? tasks
      : tasks.filter((t) =>
          filters.status.includes(t.status)
        );

  //  COLLAB SIMULATION
  useEffect(() => {
    if (tasks.length === 0) return;

    const interval = setInterval(() => {
      const randomUsers: ActiveUser[] = users.map((u) => {
        const randomTask =
          tasks[Math.floor(Math.random() * tasks.length)];

        return {
          userId: u.id,
          taskId: randomTask.id,
        };
      });

      setActiveUsers(randomUsers);
    }, 2000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/*  TOP BAR */}
      <div className="p-4 flex justify-between items-center bg-gray-800 shadow">
        <h1 className="text-xl font-bold">
          Project Tracker
        </h1>

        <div className="text-sm text-gray-400">
          {activeUsers.length} people viewing
        </div>
      </div>

      {/*  SWITCH + FILTER */}
      <ViewSwitcher view={view} setView={setView} />
      <FilterBar setFilters={setFilters} />

      {/*  VIEWS */}
      {view === "kanban" && (
        <KanbanBoard
          tasks={filteredTasks}
          setTasks={setTasks}
          activeUsers={activeUsers}
        />
      )}

      {view === "list" && (
        <ListView tasks={filteredTasks} />
      )}

      {view === "timeline" && (
        <TimelineView tasks={filteredTasks} />
      )}
    </div>
  );
}