'use client'
import React, {useState,useEffect} from "react";
import { getUserSession } from "@/services/auth";
import { readAllBlogs } from "@/services/blog";
import { redirect } from "next/navigation";
import BlogCard from "@/components/blogs/BlogCard";
import type { Blogs } from "@/types/collection";

import Search from "@/components/Search";
import { PostgrestError } from "@supabase/supabase-js";
type OmitUserId = Omit<Blogs, "userId">;
export interface BlogCardData extends OmitUserId {
  author: {
    username: string;
  }[]; // wth supabase??
}

const Page = () => {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [blogs, setBlogs] = useState<BlogCardData[] | PostgrestError | undefined>(undefined); 
  const [filteredBlogs, setFilteredBlogs] = useState<BlogCardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserSession();
        if (!data.user) {
          return redirect("/login");
        }
        const fetchedBlogs: BlogCardData[] | PostgrestError = await readAllBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]); 
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (blogs && !('message' in blogs) && Array.isArray(blogs)) {
      const filteredBlogs = blogs.filter((blog: BlogCardData) =>
        blog.title?.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase())
      );
      setFilteredBlogs(filteredBlogs);
    } else {
      setFilteredBlogs([]); 
    }
  }, [searchFilter, blogs]);

  return (
    <>
      <Search setSearchFilter={setSearchFilter}/>
      <div className="grid grid-cols-4 gap-y-4 place-items-center mt-10">
        {Array.isArray(filteredBlogs) &&
          filteredBlogs.map((blog: BlogCardData, index: number) => (
            <BlogCard key={index} blog={blog} />
          ))}
      </div>
    </>
  );
};

export default Page;
