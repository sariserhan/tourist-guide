import InboxCard from "@/components/inbox-card"
import BreadCrumb from "@/components/breadcrumb-custom"
import { api } from "@/../convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { SenderInfosProps } from "@/lib/types"

const dynamic = 'force-dynamic'

const Inbox = async () => {
  const user = await currentUser()
  const senderIds: string[] = []
  const senderInfos: SenderInfosProps[] = []
  const messages = user?.id && await fetchQuery(api.messages.listMessages, { receiverId: user.id })
  messages && await Promise.all(messages.map(async (message) => {
    if (!senderIds.includes(message.senderId)) {
      senderIds.push(message.senderId)
        senderInfos.push({
          messageId: message._id,
          senderId: message.senderId,
          senderName: message.senderName,
          senderImageUrl: message.senderPicture,
          text: message.text,
          creationTime: message._creationTime,
          about: message.about,
          read: message.read
        })
    }
  }))
  senderInfos.sort((a, b) => b.creationTime - a.creationTime).sort((a, b) => +a.read - +b.read)
  return (
    <main className="flex flex-col items-center justify-center w-full my-auto mt-20">
      <div className="flex items-center justify-center">
        <BreadCrumb inbox={true} />
      </div>
      {senderInfos.length>0 ?
        <ul className="mt-2 w-3/4">
        {Array.isArray(senderInfos) && senderInfos.map((senderInfo) => (
          <li key={senderInfo.senderId}
            className={`border p-2 ${senderInfo.read ? "bg-slate-50" : "bg-green-100"} px-10 mt-1 min-w-full cursor-pointer hover:bg-accent`}>
            <InboxCard {...senderInfo} />
          </li>
        ))}
        </ul>
        : <div className="">No messages</div>
      }
    </main>
  )
}

export default Inbox
