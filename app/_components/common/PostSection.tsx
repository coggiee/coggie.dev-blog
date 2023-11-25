import { PostCard } from './PostCard';
import { Fallback } from '../ui/Fallback';
import {
  formatCreatedAt,
  formatCreatedTime,
  formatReadingMinutes,
} from '@/utils/formatTime';

export const PostSection = ({
  posts,
  title,
}: {
  posts: any;
  title: string;
}) => {
  return (
    <section className='mt-10 mb-10 font-mono'>
      <div className='flex items-center mb-7 gap-2'>
        <h1 className='text-3xl font-thin dark:text-white min-w-fit'>
          {title}
        </h1>
        <div className='h-[1px] bg-[#00000047] w-full dark:bg-[#5d5d5d]'></div>
      </div>

      <div className='flex flex-col'>
        {posts.length === 0 && <Fallback title={'아직 포스트가 없습니다.'} />}
        {posts.map(({ node }: { node: any }) => (
          <PostCard
            key={node.id}
            date={formatCreatedAt(node.date)}
            time={formatCreatedTime(node.date)}
            title={node.title}
            description={node.description}
            path={node.id}
            tags={node.tags}
            readTimeMinutes={formatReadingMinutes(node.content)}
          />
        ))}
      </div>
    </section>
  );
};
