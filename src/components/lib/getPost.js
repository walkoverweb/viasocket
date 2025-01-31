// lib/posts.js

const fsPromise = require('fs').promises;
const matter = require('gray-matter');
const path = require('path');
const yaml = require('js-yaml');
const { readdirSync, readFileSync } = require('fs');
const { fetchPostContent } = require('./posts');

const postsDirectory = path.join(process.cwd(), '_posts/blog');

export function getPosts() {
  const postData = fetchPostContent();

  return postData;
}
