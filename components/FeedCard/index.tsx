import Image from 'next/image';
import { BiMessageRounded, BiBarChart } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { Post } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Post
}

const FeedCard: React.FC<FeedCardProps> = (props) => {

  const { data } = props

  return (
    <div className="border border-b-0 border-x-0 p-2 hover:bg-gray-100 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          {data.author?.profileImageUrl && <Image
              src={data.author.profileImageUrl}
              alt="user-image"
              height={50}
              width={50}
              className="rounded-full"
          />}
        </div>
        <div className="col-span-11 pl-1 pb-2">
          <h4 className="font-semibold">
            <Link href={`${data?.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h4>
          <p className='text-sm'>{data.content}</p>
          { data.imageURL && <Image src={data.imageURL} alt='post-iamge' height={300} width={300}/> }
          <div className='flex justify-between text-gray-600 pr-3 mt-[12px] items-center text-lg'>
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiBarChart />
            </div>
            <div>
              <FiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
