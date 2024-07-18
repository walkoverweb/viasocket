// const fs = require('fs');
// const matter = require('gray-matter');
// const path = require('path');
// const yaml = require('js-yaml');

// const postsDirectory = path.join(process.cwd(), '_posts/blog');

// let postCache;

// function fetchPostContent(tags, defaultTag) {
//     if (postCache) {
//         return getPosts(tags);
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

//                 return matterData;
//             });

//         postCache = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));

//         return getPosts(tags, defaultTag);
//     } catch (err) {
//         console.error('Error reading directory or files:', err);
//         throw err;
//     }
// }

// function getPosts(tags, defaultTag) {
//     let posts = filterPostsByTag(postCache, tags);
//     if (posts.length < 3) {
//         const defaultPosts = filterPostsByTag(postCache, [defaultTag]);
//         const combinedPosts = [...posts, ...defaultPosts];
//         posts = Array.from(new Set(combinedPosts.map((post) => post.fullPath)))
//             .map((fullPath) => combinedPosts.find((post) => post.fullPath === fullPath))
//             .slice(0, 3);
//     }
//     return posts.slice(0, 3);
// }

// function filterPostsByTag(posts, tags) {
//     if (!tags || tags.length === 0) {
//         return posts;
//     }

//     return posts.filter((post) => {
//         const postTags = post.tag || [];
//         return postTags.some((postTag) => tags.includes(postTag));
//     });
// }
// export default async function (req, res) {
//     const { tag, defaultTag } = req.query;
//     const tags = tag ? tag.split(',') : [];

//     try {
//         const data = fetchPostContent(tags, defaultTag);
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

let postCache;

function fetchPostContent(tags, defaultTag) {
    //console.log(defaultTag, "insdie  fetch post for default tag"); done showing response
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

        return getPosts(tags, defaultTag);
    } catch (err) {
        console.error('Error reading directory or files:', err);
        throw err;
    }
}

function getPosts(tags, defaultTag) {
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
    const { tag, defaultTag } = req.query;
    const tags = tag ? tag.split(',') : [];

    try {
        const data = fetchPostContent(tags, defaultTag);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post content' });
    }
}
