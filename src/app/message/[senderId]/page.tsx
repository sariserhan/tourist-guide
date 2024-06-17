import Image from "next/image"
import MessageForm from "@/components/message-form"
import { api } from "@/../convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { capitalizeWords, formatCreationTime } from "@/lib/utils"
import BreadCrumb from "@/components/breadcrumb-custom"

interface UserMessagesParams {
  params: {
    senderId: string
  }
}

const UserMessages = async ({params}: UserMessagesParams) => {
  const user = await currentUser()
  const messagesReceived = params.senderId && user?.id && await fetchQuery(api.messages.getMessagesFromUser, { receiverId: user?.id, senderId: params.senderId})
  const messagesSend = params.senderId && user?.id && await fetchQuery(api.messages.getMessagesFromUser, { receiverId: params.senderId, senderId: user?.id})
  const mergedArray = messagesReceived && messagesSend && [...messagesReceived, ...messagesSend];
  const sortedArray = mergedArray && mergedArray.sort((a, b) => a._creationTime - b._creationTime);

  return (
    <main className="flex flex-col items-center justify-center w-full my-auto mt-20">
      {messagesReceived && <BreadCrumb messageFrom={messagesReceived[0].senderName} />}
      <div className="mt-2 w-3/4">
      {Array.isArray(sortedArray) && sortedArray.map((message) => (
      <div
        key={message._id}
        className={`${message.receiverId === user?.id ? "bg-slate-100" : "bg-slate-50"} border p-2 px-5 space-y-8 min-w-full mt-1`}>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
            <Image
              src={message.senderPicture}
              alt={message.senderName}
              width={40}
              height={40}
              className="rounded-full"
            />
            {message.senderName}
            </div>
            <div className="flex justify-end space-x-2">
              <p><span className="font-semibold">Country: </span>{message.about.country}</p>
              {message.about.city && <p><span className="font-semibold">City:</span> {message.about.city}</p>}
              {message.about.category && <p><span className="font-semibold">Category:</span> {capitalizeWords(message.about.category)}</p>}
            </div>
          </div>
          <div className="flex justify-between pb-10">
            <p>{message.text}</p>
            <p>{formatCreationTime(message._creationTime)}</p>
          </div>
      </div>
      ))}
      {messagesReceived &&
        <MessageForm
          senderId={messagesReceived[0].senderId}
          senderName={messagesReceived[0].senderName}
          senderImageUrl={messagesReceived[0].senderPicture}
          about={messagesReceived[0].about}
        />
      }
      </div>
    </main>
  )
}

export default UserMessages
