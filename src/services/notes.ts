import { createClient } from '@/utils/supabase/server';

export const getNotes = async () => {
    const supabase = createClient();
    const {data , error} = await supabase.from('notes').select();
    if (error) {
        return error
    }
    return data
}