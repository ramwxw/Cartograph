import { auth } from "@clerk/nextjs/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL or publishable key is missing. Check .env.local."
  );
}

export const createClient = async () => {
  const authObj = await auth();
  const token = await authObj.getToken?.() || "";

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });
};