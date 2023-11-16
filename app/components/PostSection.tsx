import { Post } from '@/.contentlayer/generated';
import { PostCard } from './PostCard';

export const PostSection = ({
  posts,
  title,
}: {
  posts: Post[];
  title: string;
}) => {
  return (
    <section className='mt-10'>
      <h1 className='text-3xl font-bold mb-10'>{title}</h1>
      <div className='flex flex-col'>
        {posts.map((post: any) => (
          <PostCard
            key={post._id}
            date={post.date}
            title={post.title}
            description={post.description}
            path={post._raw.flattenedPath}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  );
};