"use server"
import { createClient } from "@/utils/supabase/server";


export const getAllAuthors = async () => {
    const supabase = createClient();
    
}