const { readdirSync, readFileSync } = require('fs');
const matter = require('gray-matter');
const path = require('path');
const yaml = require('js-yaml');

export function getBlogs(tagName) {
  const allBlogsData = [];

  const postsDirectory = path.join(process.cwd(), '_posts/blog');

  const fileNames = readdirSync(postsDirectory, { withFileTypes: false });
  const allFiles = fileNames?.filter((it) => it.endsWith('.mdx'));

  const allBlogs = allFiles
        && allFiles?.map((file) => {
          const filePath = path.join(postsDirectory, file);

          const blogContent = readFileSync(filePath, 'utf8');

          const blogData = matter(blogContent, {
            engines: {
              yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
            },
          });

          if (blogData?.data?.tag?.includes(tagName)) {
            allBlogsData.push(blogData?.data);
          }
        });

  return allBlogsData;
}
