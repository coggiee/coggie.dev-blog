import { sync } from 'glob';
import path from 'path';
import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';

type PostMatter = {
  title: string;
  description: string;
  tags: string[];
  draft?: boolean;
  date: string;
}

type Post = PostMatter & {
  slug: string;
  content: string;
  readingMinutes: number;
  wordCount: number;
}

const BASE_PATH = '/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

const parsePost = (postPath: string): Post | undefined => {
  try {
    const file = fs.readFileSync(postPath, { encoding: 'utf-8' });
    const { content, data} = matter(file);
    const grayMatter = data as PostMatter;

    if (grayMatter.draft) {
      return;
    }

    return {
      ...grayMatter,
      tags: grayMatter.tags.filter(Boolean),
      date: dayjs(grayMatter.date).format('YYYY-MM-DD'),
      content,
      slug: postPath.slice(postPath.indexOf(BASE_PATH)).replace('.mdx', ''),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/gu).length,
    };
  } catch (e) {
    // console.error(e);
  }
}

export const getAllPosts = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
  return postPaths.reduce<Post[]>((ac, postPath) => {
    const post = parsePost(postPath);
    if (!post) return ac;

    return [ ...ac, post ];
  }, []);
};
