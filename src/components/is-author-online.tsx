"use client";

import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"

const IsAuthorOnline = ({authorId}: {authorId: string}) => {
  const author = useQuery(api.users.getUserById, { clerkId: authorId })
  return (
    <div className="flex text-sm font-medium text-gray-900 dark:text-gray-50 items-center">
      {author?.isOnline ?
        <>
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
          <div className="text-xs font-semibold text-gray-500">Online</div>
        </>
      :
        <>
          <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
          <div className="text-xs font-semibold text-gray-500">Offline</div>
        </>
      }
    </div>
  )
}

export default IsAuthorOnline
