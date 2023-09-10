import { truncate } from "lodash";
import type { BlogPost } from "~/types/blog";

const BlogPostThumb: React.FC<{
  post: BlogPost;
  orientation: "horizontal" | "vertical";
}> = ({ post: { title, author, date, excerpt, tags, image }, orientation }) => (
  <div
    className={`grid cursor-pointer grid-cols-1 grid-rows-2 gap-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg md:mt-0 md:p-5 ${
      orientation === "horizontal"
        ? "md:grid-cols-2 md:grid-rows-1"
        : "md:grid-cols-1 md:grid-rows-2"
    }`}
  >
    <div
      className="h-[180px] w-full rounded-md bg-cover bg-center"
      style={{ backgroundImage: `url("${image}")` }}
    ></div>

    <div>
      <div className="font-semibold text-[#1F2937] opacity-70">
        {author} &middot;{" "}
        {date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
      <div className="mt-2 text-xl font-semibold">
        {truncate(title, { length: orientation === "horizontal" ? 25 : 30 })}
      </div>
      <div className="mt-2 text-sm">
        {truncate(excerpt, {
          // length: orientation === "horizontal" ? 70 : 100,
          length: 100,
        })}
      </div>
      <div className="my-4 flex gap-2">
        {tags?.map((tag, i) => (
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

export default BlogPostThumb;
