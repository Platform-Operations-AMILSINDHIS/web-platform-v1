import { Box } from "@chakra-ui/react";
import { truncate } from "lodash";
import type { BlogPost } from "~/types/blog";

type TypeColorMapping = Record<string, string>;

const colorMapping: TypeColorMapping = {
  Blog: "#FFA882",
  Publication: "#D0FF82",
  NewsLetter: "rgba(255, 31, 152, 0.27)",
};

const BlogPostThumb: React.FC<{
  post: BlogPost;
  orientation: "horizontal" | "vertical";
}> = ({
  post: { title, author, date, excerpt, tags, image, type },
  orientation,
}) => (
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
      <div className="mt-2 text-2xl font-semibold">
        {truncate(title, { length: orientation === "horizontal" ? 25 : 30 })}
      </div>
      <div className="mt-2 text-sm">
        {truncate(excerpt, {
          // length: orientation === "horizontal" ? 70 : 100,
          length: 100,
        })}
      </div>
      <div className="my-4 flex gap-2">
        {tags?.map((tag, index) => (
          <Box
            fontWeight={500}
            key={index}
            className={`rounded-full border border-[#1F2937] px-3 py-1 text-xs`}
          >
            {tag}
          </Box>
        ))}
        <Box
          bg={colorMapping[type] || "white"}
          fontWeight={500}
          className={`rounded-full border border-[#1F2937] px-3 py-1 text-xs`}
        >
          {type}
        </Box>
      </div>
    </div>
  </div>
);

export default BlogPostThumb;
