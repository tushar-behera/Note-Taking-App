export default function NoteList({ items, onSelect, onDelete, activeId }) {
  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">No notes yet</p>
      ) : (
        items.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelect(note)}
            className={`p-3 rounded-md border border-gray-800 cursor-pointer transition duration-150 flex flex-col ${
              activeId === note.id
                ? "bg-gradient-to-r from-sky-700/30 to-transparent ring-1 ring-sky-500"
                : "hover:bg-gray-800/60"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold truncate text-sky-300 text-sm">
                {note.title || "Untitled"}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                className="text-red-400 hover:text-red-600 text-sm"
                aria-label="Delete note"
                title="Delete"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-400 text-xs truncate mt-1">
              {note.content || "No content"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
