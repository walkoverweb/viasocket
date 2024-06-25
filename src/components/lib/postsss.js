// lib/posts.js

const fsPromise = require('fs').promises;
const matter = require('gray-matter');
const path = require('path');
const yaml = require('js-yaml');
const { readdirSync, readFileSync } = require('fs');
const { fetchPostContent } = require('./posts');

const postsDirectory = path.join(process.cwd(), '_posts/blog');
console.log(postsDirectory, 'post directory');

export function getPosts() {
    const postData = fetchPostContent();
    console.log(postData, 'postDatattattata');
    //   // Get file names under /_posts
    //   const fileNames = readdirSync(postsDirectory, { withFileTypes: false });
    //   console.log(fileNames, "file namesss");
    //   const posts = fileNames.map((fileName) => {
    //     // Read markdown file as string
    //     const fullPath = path.join(postsDirectory, fileName);
    //     const fileContents = readFileSync(fullPath, 'utf8');

    //     // Return the file name and contents
    //     return {
    //       fileName,
    //       content: fileContents,
    //     };
    //   });
    return postData;
}
