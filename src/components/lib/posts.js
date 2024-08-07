const matter = require('gray-matter');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

const postsDirectory = path.join(process.cwd(), '_posts/blog');
let postCache;

function fetchPostContent() {
    if (postCache) {
        return postCache;
    }

    try {
        const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: false });

        const allPostsData = fileNames
            .filter((it) => it.endsWith('.mdx'))
            .map((fileName) => {
                let fullPath = path.join(postsDirectory, fileName);

                const fileContents = fs.readFileSync(fullPath, 'utf8');

                const matterResult = matter(fileContents, {
                    engines: {
                        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
                    },
                });

                const matterData = matterResult?.data;

                matterData.fullPath = fullPath;
                matterData.staticPath = fileName.split('.')[0];

                const slug = fileName.replace(/\.mdx$/, '');

                return matterData;
            });

        postCache = allPostsData.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        });
        return postCache;
    } catch (err) {
        console.error('Error reading directory or files:', err);
        throw err; // Re-throw error after logging it
    }
}

function countPosts(tag) {
    return fetchPostContent().filter((it) => !tag || (it.tag && it.tag.includes(tag))).length;
}

function listPostContent(page, limit, tag) {
    return fetchPostContent()
        .filter((it) => !tag || (it.tag && it.tag.includes(tag)))
        .slice((page - 1) * limit, page * limit);
}

module.exports = {
    fetchPostContent,
    countPosts,
    listPostContent,
};
