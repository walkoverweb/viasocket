// const fs = require('fs');
// const matter = require('gray-matter');
// const path = require('path');
// const yaml = require('js-yaml');

// const postsDirectory = path.join(process.cwd(), '_posts/blog');
// let postCache;

// function fetchPostContent(tag) {
//     if (postCache) {
//         return filterPostsByTag(postCache, tag);
//     }

//     try {
//         const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: false });

//         const allPostsData = fileNames
//             .filter((it) => it.endsWith('.mdx'))
//             .map((fileName) => {
//                 let fullPath = path.join(postsDirectory, fileName);

//                 const fileContents = fs.readFileSync(fullPath, 'utf8');

//                 const matterResult = matter(fileContents, {
//                     engines: {
//                         yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
//                     },
//                 });

//                 const matterData = matterResult?.data;

//                 matterData.fullPath = fullPath;
//                 matterData.staticPath = fileName.split('.')[0];

//                 // console.log(matterData, "matter data");

//                 return matterData;
//             });

//         postCache = allPostsData.sort((a, b) => {
//             if (a.date < b.date) {
//                 return 1;
//             } else {
//                 return -1;
//             }
//         });
//         return filterPostsByTag(postCache, tag);
//     } catch (err) {
//         console.error('Error reading directory or files:', err);
//         throw err;
//     }
// }

// function filterPostsByTag(posts, tag) {
//     if (!tag) {
//         return posts;
//     }

//     return posts.filter((post) => {
//         const postTags = post.tag || [];
//         return postTags.some((postTag) => tag.includes(postTag));
//     });
// }

// export default async function (req, res) {
//     const { tag } = req.query;

//     try {
//         const data = fetchPostContent(tag ? tag.split(',') : []);
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch post content' });
//     }
// }

// const fs = require('fs');
// const matter = require('gray-matter');
// const path = require('path');
// const yaml = require('js-yaml');

// const postsDirectory = path.join(process.cwd(), '_posts/blog');
// let postCache;

// function fetchPostContent(tag) {
//     if (postCache) {
//         return filterPostsByTag(postCache, tag).slice(0, 3);
//     }

//     try {
//         const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: false });

//         const allPostsData = fileNames
//             .filter((it) => it.endsWith('.mdx'))
//             .map((fileName) => {
//                 let fullPath = path.join(postsDirectory, fileName);

//                 const fileContents = fs.readFileSync(fullPath, 'utf8');

//                 const matterResult = matter(fileContents, {
//                     engines: {
//                         yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
//                     },
//                 });

//                 const matterData = matterResult?.data;

//                 matterData.fullPath = fullPath;
//                 matterData.staticPath = fileName.split('.')[0];

//                 // console.log(matterData, "matter data");

//                 return matterData;
//             });

//         postCache = allPostsData.sort((a, b) => {
//             if (a.date < b.date) {
//                 return 1;
//             } else {
//                 return -1;
//             }
//         });

//         return filterPostsByTag(postCache, tag).slice(0, 3);
//     } catch (err) {
//         console.error('Error reading directory or files:', err);
//         throw err;
//     }
// }

// function filterPostsByTag(posts, tag) {
//     if (!tag) {
//         return posts;
//     }

//     return posts.filter((post) => {
//         const postTags = post.tag || [];
//         return postTags.some((postTag) => tag.includes(postTag));
//     });
// }

// export default async function (req, res) {
//     const { tag } = req.query;

//     try {
//         const data = fetchPostContent(tag ? tag.split(',') : []);
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch post content' });
//     }
// }

const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');
const yaml = require('js-yaml');

const postsDirectory = path.join(process.cwd(), '_posts/blog');
const defaultTag = 'via-socket'; // Replace with your actual default tag
let postCache;

function fetchPostContent(tags) {
    if (postCache) {
        return getPosts(tags);
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

                return matterData;
            });

        postCache = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));

        return getPosts(tags);
    } catch (err) {
        console.error('Error reading directory or files:', err);
        throw err;
    }
}

function getPosts(tags) {
    let posts = filterPostsByTag(postCache, tags);
    if (posts.length < 3) {
        const defaultPosts = filterPostsByTag(postCache, [defaultTag]);
        const combinedPosts = [...posts, ...defaultPosts];
        posts = Array.from(new Set(combinedPosts.map((post) => post.fullPath)))
            .map((fullPath) => combinedPosts.find((post) => post.fullPath === fullPath))
            .slice(0, 3);
    }
    return posts.slice(0, 3);
}

function filterPostsByTag(posts, tags) {
    if (!tags || tags.length === 0) {
        return posts;
    }

    return posts.filter((post) => {
        const postTags = post.tag || [];
        return postTags.some((postTag) => tags.includes(postTag));
    });
}

export default async function (req, res) {
    const { tag } = req.query;
    const tags = tag ? tag.split(',') : [];

    try {
        const data = fetchPostContent(tags);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post content' });
    }
}
