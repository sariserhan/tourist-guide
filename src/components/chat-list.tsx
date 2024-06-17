"use client";

import Image from "next/image"
import { api } from "@/../convex/_generated/api"
import { Doc } from "@/../convex/_generated/dataModel";
import { useQuery } from "convex/react"

const ChatList = () => {
  const users = useQuery(api.users.getOnlineUsers)
  return (
    <section className="justify-center w-[20rem] bg-white h-[50rem] rounded-lg border border-gray-200 mr-4 overflow-y-auto">
      <h2 className="flex font-bold border-b border-black items-center justify-center p-2">Online Users</h2>
      <div className="flex flex-col pt-2">
        {users && users.map((user: Doc<"users">) => (
          <div key={user.clerkId} className="flex items-center gap-2 p-2 border-b border-gray-200 w-full cursor-pointer hover:bg-accent">
            <Image src={user.imageUrl} alt={user.userName} width={30} height={30} className="rounded-full" />
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{user.userName}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ChatList
