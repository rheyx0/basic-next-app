"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState("");

  // READ
  const fetchData = async () => {
    const { data, error } = await supabase.from("test_table").select("*");
    if (!error) setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE
  const addItem = async () => {
    if (!name) return;
    await supabase.from("test_table").insert([{ name }]);
    setName("");
    fetchData();
  };

  // DELETE
  const deleteItem = async (id: number) => {
    await supabase.from("test_table").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">CRUD Demo</h1>

      {/* CREATE */}
      <div className="mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border p-2 mr-2"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2">
          Add
        </button>
      </div>

      {/* READ + DELETE */}
      <ul>
        {data.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name}
            <button
              onClick={() => deleteItem(item.id)}
              className="ml-4 bg-red-500 text-white px-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
