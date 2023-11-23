import { getTotalTags, getTotalPosts } from '../_libs/hygraph';
import TagSidebar from '../_components/blog/TagSidebar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicBlogSection = dynamic(
  () => import('../_components/blog/BlogSection'),
  {
    ssr: false,
  }
);

async function getProps() {
  const response = (await getTotalPosts()) || [];
  const posts = response.map((post: any) => post.node);
  const tags = (await getTotalTags()) || [];
  const uniqueTags = Array.from(
    new Set<string>(tags.flatMap((post: any) => post.tags))
  );

  return {
    props: {
      posts,
      uniqueTags,
    },
  };
}

export default async function Blog() {
  const {
    props: { posts, uniqueTags },
  } = await getProps();

  return (
    <section className='w-full mx-auto flex flex-col md:max-w-6xl gap-10 dark:text-[#fff] md:flex-row-reverse relative'>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicBlogSection posts={posts} uniqueTags={uniqueTags} />
      </Suspense>
      {/* 태그 클릭 시, 해당 태그를 가지고 있는 포스트를 보여줌 */}
    </section>
  );
}
