import React from "react";
import { getUserSession } from "@/services/auth";
import { readAllBlogs } from "@/services/blog";
import { redirect } from "next/navigation";
import BlogCard from "@/components/blogs/BlogCard";
import type { Blogs } from "@/types/collection";

type OmitUserId = Omit<Blogs, "userId">
export interface BlogCardData extends OmitUserId {
  author : {
    username : string
  }[]
}

const Page = async () => {
  const { data } = await getUserSession();
  if (!data.user) {
    return redirect("/login");
  }
  const blogs = await readAllBlogs();
  return (
    <div className="grid grid-cols-4 gap-y-4 place-items-center">
      {Array.isArray(blogs) && blogs.map((blog: BlogCardData , index : number) => <BlogCard key={index} blog={blog}/>)}
    </div>
  );
};

export default Page;
