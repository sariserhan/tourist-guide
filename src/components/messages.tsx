import { fetchQuery } from "convex/nextjs"
import { BsEnvelope } from "react-icons/bs"
import { api } from "../../convex/_generated/api"

const Messages = async ({userClerkId}: {userClerkId: string}) => {
  const unreadMessageCount = await fetchQuery(api.messages.getUnreadMessageCountFromReceiver, {
    receiverId: userClerkId,
  }
  )
  return (
    <div className="relative flex items-center hover:bg-accent hover:text-accent-foreground p-2">
      <BsEnvelope size={25} />
      {unreadMessageCount > 0 && (
        <span className="absolute top-3 right-2 translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {unreadMessageCount}
        </span>
      )}
    </div>
  )
}

export default Messages
