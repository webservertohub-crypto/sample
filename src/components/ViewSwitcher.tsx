type ViewType = "kanban" | "list" | "timeline";

type Props = {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
};

export default function ViewSwitcher({ view, setView }: Props) {
  const tabs: ViewType[] = ["kanban", "list", "timeline"];

  return (
    <div className="flex gap-2 p-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setView(tab)}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${
              view === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}