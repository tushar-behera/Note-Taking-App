import { useState, useEffect } from "react";

export default function NoteEditor({ note, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSave = () => {
    const payload = { title, content };
    if (note && note.id) payload.id = note.id;
    onSave(payload);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-inner">
      {/* Title styled like the textarea (rounded box, padding) */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
        className="bg-transparent text-2xl font-semibold mb-4 p-3 border border-gray-800 rounded-md focus:outline-none focus:border-sky-500 placeholder-gray-500"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="flex-1 bg-transparent text-gray-200 border border-gray-800 rounded-md p-4 resize-none focus:outline-none focus:border-sky-500 placeholder-gray-500"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-5 rounded font-semibold shadow-sm"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
