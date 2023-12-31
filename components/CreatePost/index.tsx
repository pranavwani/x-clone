import Image from "next/image";
import {GoFileMedia} from "react-icons/go";
import {BsEmojiSmile} from "react-icons/bs";
import {useCallback, useState} from "react";
import {graphqlClient} from "@/clients/api";
import {getSignedURLForPostQuery} from "@/graphql/query/post";
import toast from "react-hot-toast";
import axios from "axios";
import {useCreatePost} from "@/hooks/post";
import Link from "next/link";
import {useRecoilValue} from "recoil";
import {userState} from "@/store/atoms/user";

enum CreatePostType {
    create ,
    reply
}

interface CreatePostProps {
    type?: CreatePostType
    parentPostID?: string
}

const CreatePost: React.FC<CreatePostProps> = ({ type, parentPostID }) => {
    const [content, setContent] = useState('')
    const [imageURL, setImageURL] = useState('')
    const {mutate} = useCreatePost()
    const user = useRecoilValue(userState)
    const isNewPostButtonDisabled = content.length === 0;

    const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
        return async (event: Event) => {
            event.preventDefault()

            const file: File = input.files?.item(0) as File

            if (!file) return;

            const {getSignedURLForPost} = await graphqlClient.request(getSignedURLForPostQuery, {
                imageName: file.name,
                imageType: file.type
            })

            if (getSignedURLForPost) {
                toast.loading("Uploading...", {id: "2"});

                await axios.put(getSignedURLForPost, file, {
                    headers: {
                        'Content-Type': file.type
                    }
                })

                toast.success("Upload Completed", {id: "2"});

                const url = new URL(getSignedURLForPost)

                setImageURL(`${url.origin}${url.pathname}`)
            }
        }
    }, [])

    const handleSelectImage = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*")

        input.addEventListener("change", handleInputChangeFile(input))

        input.click()
    }, [handleInputChangeFile])

    const handleCreatePost = useCallback(async () => {
        const newPost: any = {
            content,
            imageURL
        }

        if (parentPostID) newPost.parentPostID = parentPostID

        mutate(newPost)

        setContent('')
        setImageURL('')
    }, [content, imageURL, mutate, parentPostID])

    return <div className={`${type === CreatePostType.create ? 'pr-2 pl-4 pt-3' : 'pr-2 pt-4'} pb-2 dark:bg-black`}>
        <div className="grid grid-cols-12 gap-2">
            <div className="col-span-1 cursor-pointer">
                <Link href={`/${user?.id}`}>
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
                </Link>
            </div>
            <div className="col-span-11">
                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="w-full resize-none text-xl px-3 placeholder-gray-500 border-b border-gray-100 dark:border-gray-700"
                    rows={4}
                    placeholder={type === CreatePostType.create ? "What is happening?!" : "Post your reply" }
                />
                {
                    imageURL && <Image src={imageURL} alt="post-image" height={300} width={300}/>
                }
                <div className="mt-2 flex items-center justify-between">
                    <GoFileMedia className="text-[#1d9bf0]" onClick={handleSelectImage}/>
                    <BsEmojiSmile className="text-[#1d9bf0]"/>
                    <div>
                        <button
                            onClick={handleCreatePost}
                            className='bg-[#1d9bf0] px-4 py-1.5 text-white font-semibold w-full rounded-full disabled:opacity-50'
                            disabled={isNewPostButtonDisabled}
                        >
                            {type === CreatePostType.create ? 'Post' : 'Reply'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CreatePost