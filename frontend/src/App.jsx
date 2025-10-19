import React, { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/notes`)
      .then((res) => res.json())
      .then((data) => setNotes(data || []))
      .catch((err) => {
        console.error("Error fetching notes:", err);
        setNotes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (note) => {
    const method = note?.id ? "PUT" : "POST";
    const url = note?.id ? `${API_BASE}/notes/${note.id}` : `${API_BASE}/notes`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    const data = await res.json();
    if (note?.id) {
      setNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)));
    } else {
      setNotes((prev) => [data, ...prev]);
    }
    setActiveNote(data);
  };

  const handleDelete = async (id) => {
  await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
  };

  return (
    <div className="app-root min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="app-card w-full max-w-5xl bg-[#050507] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex">
        <aside className="sidebar w-80 border-r border-gray-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-sky-400 tracking-tight">
              Notes
            </h1>
            <button
              onClick={() => setActiveNote(null)}
              className="bg-sky-500 hover:bg-sky-600 text-black px-3 py-1 rounded text-sm font-semibold"
            >
              + New
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <NoteList
                items={notes}
                onSelect={setActiveNote}
                onDelete={handleDelete}
                activeId={activeNote?.id}
              />
            </div>
          )}

          <footer className="mt-6 text-xs text-gray-500">
            {notes.length} note{notes.length !== 1 ? "s" : ""}
          </footer>
        </aside>

        <main className="flex-1 p-8">
          <NoteEditor note={activeNote} onSave={handleSave} />
        </main>
      </div>

      <footer className="creator-footer mt-6">
        Created by @Tushar Behera
      </footer>
    </div>
  );
}
