import Image from 'next/image';
import { BiMessageRounded, BiBarChart } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'

const FeedCard: React.FC<{ description: String }> = ({ description }) => {
  return (
    <div className="border border-b-0 border-x-0 p-2 hover:bg-gray-100 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          <Image
            src="https://yt3.googleusercontent.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK0qOST7fiA=s176-c-k-c0x00ffffff-no-rj"
            alt="user-image"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="col-span-11 pl-1 pb-2">
          <h4 className="font-semibold">Marquess Brownlee</h4>
          <p className='text-sm'>{description}</p>
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
