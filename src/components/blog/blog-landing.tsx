import type { BlogPost } from "~/types/blog";

import { eudoxus } from "~/utils/fonts";

export const BlogPostThumb: React.FC<{
  post: BlogPost;
  orientation: "horizontal" | "vertical";
}> = ({ post: { title, author, date, excerpt, tags, image }, orientation }) => (
  <div
    className={`grid grid-cols-1 grid-rows-2 gap-4 ${
      orientation === "horizontal"
        ? "md:grid-cols-2 md:grid-rows-1"
        : "md:grid-cols-1 md:grid-rows-2"
    }`}
  >
    <div className="h-full w-full rounded-md">
      <img className="w-full object-cover" alt="" src={image} />
    </div>

    <div>
      <div className="font-semibold text-[#1F2937] opacity-70">
        {author} &middot;{" "}
        {date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
      <div className="mt-2 text-2xl font-semibold">{title}</div>
      <div className="mt-4 text-sm">{excerpt}</div>
      <div className="my-4 flex gap-2">
        {tags.map((tag, i) => (
          <div
            key={i}
            className={`rounded-full border border-[#1F2937] px-2 py-1 text-xs`}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  </div>
);
