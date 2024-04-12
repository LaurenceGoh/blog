'use server'
import { createClient } from "@/utils/supabase/client";
import type { Blogs } from "@/types/collection";

export const addBlog = async (blogData : Blogs) => {
  const supabase = createClient();

  const {data , error} = await supabase.from('blogs').insert(blogData)

  if (error) {
    console.log(error)
    return error.message
  }
  console.log(data)
  return data

}


export const readAllBlogs = async () => {
  const supabase = createClient();
  const {data,error} = await supabase.from('blogs').select(`
    id,title, body, tags, reactions, author(username)
  `)
  ;
  if (error) {
    return error
  }

  return data
}