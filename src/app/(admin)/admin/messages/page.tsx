import { api } from "@/../convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'

const ReadMessages = async () => {
  const user = await currentUser()
  if (user && user.id !== process.env.ADMIN_ID) {
    <div className="w-full flex items-center justify-center">
      <p className="text-red-500">You are not authorized to view this page</p>
    </div>
    redirect('/')
  }
  const messages = await fetchQuery(api.contact.listContactMessages)
  return (
    <main className="w-full flex flex-col items-center justify-center mt-20">
      {messages.map((message) => (
        <div key={message._id}
          className="w-3/4 border border-gray-200 p-4 my-4 rounded-md shadow-md"
        >
          <div className="flex items-center justify-between font-bold border-b">
            <p>User Name: {message.contact_name}</p>
            <p>User Email: {message.contact_email}</p>
          </div>
          <p className="break-words mt-2">{message.contact_message}</p>
        </div>
      ))}
    </main>
  )
}

export default ReadMessages
