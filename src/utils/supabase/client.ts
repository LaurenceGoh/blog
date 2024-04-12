import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/types";
import dotenv from "dotenv";
dotenv.config();

export const createClient = <Database> () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL! as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! as string,
  );
