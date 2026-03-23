"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [units, setUnits] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);

  const [unitName, setUnitName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [testName, setTestName] = useState("");

  // FETCH ALL
  const fetchData = async () => {
    setUnits((await supabase.from("units").select("*")).data || []);
    setCategories((await supabase.from("test_categories").select("*")).data || []);
    setTests((await supabase.from("medical_tests").select("*")).data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE
  const addUnit = async () => {
    if (!unitName) return;
    await supabase.from("units").insert([{ name: unitName }]);
    setUnitName("");
    fetchData();
  };

  const addCategory = async () => {
    if (!categoryName) return;
    await supabase.from("test_categories").insert([{ name: categoryName }]);
    setCategoryName("");
    fetchData();
  };

  const addTest = async () => {
    if (!testName) return;
    await supabase.from("medical_tests").insert([{ name: testName }]);
    setTestName("");
    fetchData();
  };

  // DELETE
  const deleteItem = async (table: string, id: number) => {
    await supabase.from(table).delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Medical Test Management System</h1>

      {/* UNITS */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Units</h2>
        <input value={unitName} onChange={(e) => setUnitName(e.target.value)} placeholder="Enter unit name" className="border p-2 mr-2"/>
        <button onClick={addUnit} className="bg-blue-500 text-white px-4 py-2">Add</button>

        <ul className="mt-3">
          {units.map((u) => (
            <li key={u.id}>
              {u.name}
              <button onClick={() => deleteItem("units", u.id)} className="ml-2 bg-red-500 text-white px-2">Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* TEST CATEGORIES */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold">Test Categories</h2>
        <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Enter category" className="border p-2 mr-2"/>
        <button onClick={addCategory} className="bg-blue-500 text-white px-4 py-2">Add</button>

        <ul className="mt-3">
          {categories.map((c) => (
            <li key={c.id}>
              {c.name}
              <button onClick={() => deleteItem("test_categories", c.id)} className="ml-2 bg-red-500 text-white px-2">Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* MEDICAL TESTS */}
      <section>
        <h2 className="text-xl font-semibold">Medical Tests</h2>
        <input value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="Enter test name" className="border p-2 mr-2"/>
        <button onClick={addTest} className="bg-blue-500 text-white px-4 py-2">Add</button>

        <ul className="mt-3">
          {tests.map((t) => (
            <li key={t.id}>
              {t.name}
              <button onClick={() => deleteItem("medical_tests", t.id)} className="ml-2 bg-red-500 text-white px-2">Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
