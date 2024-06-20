import { api } from "@/../convex/_generated/api"
import { fetchQuery } from "convex/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'

const AdminPage = async () => {
  const user = await currentUser()
  if (user?.publicMetadata?.role !== 'admin') {
    redirect('/')
  }

  const messages = await fetchQuery(api.contact.listContactMessages)
  return (
    <main className="w-full flex flex-col items-center mt-20 min-h-screen">
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

export default AdminPage;
