import { supabase } from "../lib/supabaseClient";

export default async function Home() {
  const { data, error } = await supabase.from("test_table").select("*");

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black text-center">
        <h1 className="text-3xl font-semibold text-black dark:text-white mb-6">
          Supabase Data
        </h1>
        <pre className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </main>
    </div>
  );
}