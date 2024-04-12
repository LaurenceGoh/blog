import { Database } from "./types";

export type Blogs = Database["public"]["Tables"]["blogs"]["Row"]

// from https://github.com/supabase/postgrest-js/issues/471#issuecomment-1696522983
export function fixOneToOne<T>(objectOrNull: T[]): T | null {
    return (objectOrNull as T) || null;
  }