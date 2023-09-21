import { BsPeople, BsPerson, BsSearch } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { FiBookmark } from 'react-icons/fi'
import { HiOutlineMail } from 'react-icons/hi'
import { RiFileListLine, RiNotification3Line, RiHome7Fill } from 'react-icons/ri'
import { FaXTwitter } from 'react-icons/fa6'
import FeedCard from '@/components/FeedCard/index'
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useCallback, useState } from "react";
import toast from "react-hot-toast";
import {graphqlClient} from "@/clients/api";
import {verifyUserGoogleTokenQuery} from "@/graphql/query/user";
import {useCurrentUser} from "@/hooks/user";
import {useQueryClient} from "@tanstack/react-query";
import Image from "next/image";
import {GoFileMedia} from "react-icons/go";

interface XSidebarButtons {
  title: String,
  icon: React.ReactNode
}

const sidebarMenuItems: XSidebarButtons[] = [
  {
    title: 'Home',
    icon: <RiHome7Fill />
  },
  {
    title: 'Explore',
    icon: <BsSearch />
  },
  {
    title: 'Notifications',
    icon: <RiNotification3Line />
  },
  {
    title: 'Messages',
    icon: <HiOutlineMail />
  },
  {
    title: 'Lists',
    icon: <RiFileListLine />
  },
  {
    title: 'Bookmarks',
    icon: <FiBookmark />
  },
  {
    title: 'Communities',
    icon: <BsPeople />
  },
  {
    title: 'Verified',
    icon: <FaXTwitter />
  },
  {
    title: 'Profile',
    icon: <BsPerson />
  },
  {
    title: 'More',
    icon: <CgMoreO />
  }
]

const postDescriptions = [
  'But seriously the only way to guarantee meaningful positive change in the next 365 days around the sun is to exit your comfort zone and relentlessly attack your goals. That’s my plan, anyway. Good luck and Happy New Year 🙌🏾',
  'What if they call USB-C on the iPhone 15 the "magic port" 😅',
  "I have no idea what to title this next video, but it's one of my favorite stories in tech, and one of the most unique things I've ever shot footage of...",
  'Uploading...',
];

export default function Home() {
  const { user } = useCurrentUser()
  const queryClient = useQueryClient()
  const [newPostLength, setNewPostLength] = useState('')
  const isNewPostButtonDisabled = newPostLength.length === 0;

  const handleLoginWithGoogle = useCallback(
      async (cred: CredentialResponse) => {
        const googleToken = cred.credential

        if (!googleToken) return toast.error('Google token not found');

        const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });

        if (verifyGoogleToken) window.localStorage.setItem("__x_token", verifyGoogleToken)

        toast.success("Verified Success");

        await queryClient.invalidateQueries(["current-user"])
      },
      [queryClient]
  );

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*")
    input.click()
  }, [])

  const handlePostChange = ((event: any) => {
    setNewPostLength(event.target.value);
  })

  return <div className='bg-white'>
    <div className="grid grid-cols-12 h-screen w-screen px-56">
      <div className="col-span-3 ml-16 relative">
        <div className="text-3xl h-fit w-fit hover:bg-gray-200 rounded-full p-2 ml-3 transition-all cursor-pointer">
          <FaXTwitter />
        </div>
        <div className='mt-4 text-xl pr-12'>
          <ul>
            {sidebarMenuItems.map(item => (
              <li className='flex justify-start items-center gap-6 mt-3 hover:bg-gray-200 rounded-full py-2 px-5 w-fit transition-all cursor-pointer' key={crypto.randomUUID()}>
                <span className='text-2xl'>{item.icon}</span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
          <div className='mt-5'>
            <button className='bg-[#1d9bf0] p-3 text-xl text-white font-semibold w-full rounded-full'>Post</button>
          </div>
        </div>
        {
          user
          && (
              <div className="absolute bottom-5 flex gap-2 hover:bg-gray-200 p-3 rounded-full">
                {
                  user && user?.profileImageUrl && (
                      <Image
                        className="rounded-full"
                        src={user?.profileImageUrl}
                        alt="user-image"
                        height={40}
                        width={40}
                      />
                    )
                }
                <div>
                  <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                </div>
              </div>
            )
        }
      </div>
      <div className="col-span-5 border-l-[1px] border-r-[1px] height-screen overflow-scroll border-gray-100">
        <div className="border border-b-0 border-x-0 p-4">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-1 cursor-pointer">
              {
                user?.profileImageUrl &&
                  <Image
                      src={user?.profileImageUrl}
                      alt="user-image"
                      height={50}
                      width={50}
                      className="rounded-full"
                  />
              }
            </div>
            <div className="col-span-11">
              <textarea onChange={handlePostChange} className="w-full resize-none text-xl px-3 placeholder-gray-500 border-b border-gray-100" rows={4} placeholder="What is happening?!"></textarea>
              <div className="mt-2 flex items-center justify-between">
                <GoFileMedia className="text-[#1d9bf0]" onClick={handleSelectImage}/>
                <div>
                  <button className='bg-[#1d9bf0] px-4 py-1.5 text-white font-semibold w-full rounded-full disabled:opacity-50' disabled={isNewPostButtonDisabled}>Post</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*{postDescriptions.map(description => {
          return <FeedCard key={crypto.randomUUID()} description={description} />
        })}
        {postDescriptions.map(description => {
          return <FeedCard key={crypto.randomUUID()} description={description} />
        })}
        {postDescriptions.map(description => {
          return <FeedCard key={crypto.randomUUID()} description={description} />
        })}
        {postDescriptions.map(description => {
          return <FeedCard key={crypto.randomUUID()} description={description} />
        })}
        {postDescriptions.map(description => {
          return <FeedCard key={crypto.randomUUID()} description={description} />
        })}*/}
      </div>
      <div className="col-span-3 p-5 rounded-lg">
        {
          !user && <div>
            <GoogleLogin onSuccess={handleLoginWithGoogle}/>
          </div>
        }
      </div>
    </div>
  </div>
}
