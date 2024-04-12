import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
} from "@nextui-org/react";
import { BlogCardData } from "@/app/blogs/page";
import { fixOneToOne } from "@/types/collection";

interface BlogProps {
  blog: BlogCardData;
}

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  const { tags, author } = blog
    const updatedAuthor = fixOneToOne(author)

  return (
    <Card className="max-w-[400px] min-h-[360px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{blog.title}</p>
          <p className="text-small text-default-500">{updatedAuthor?.username}</p>

        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{blog.body}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex gap-4">
          {tags &&
            tags.map((tag: string) => (
              <Chip key={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Chip>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
