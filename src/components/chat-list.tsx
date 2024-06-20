"use client";

import Image from "next/image"
import { api } from "@/../convex/_generated/api"
import { Doc } from "@/../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react"
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { ShieldCloseIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { countSpecificValue } from "@/lib/utils";

const ChatList = () => {
  const { user } = useUser();
  const users = useQuery(api.users.getOnlineUsers)
  const [selectedUser, setSelectedUser] = useState<Doc<"users"> | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const createChat = useMutation(api.chat.addChatMessage)
  const addChat = useMutation(api.users.addChatReceivedFrom)
  const getUserById = useQuery(api.users.getUserById, { clerkId: user?.id || 'guest' })
  const removeChatReceivedFrom = useMutation(api.users.removeChatReceivedFrom)

  const startChat = (otherUser: Doc<"users">) => {
    setSelectedUser(otherUser);
    setIsPopoverOpen(true);
    removeChatReceivedFrom({ clerkId: user?.id!, senderId: otherUser.clerkId })
  };

  const closeChat = () => {
    setIsPopoverOpen(false);
    setSelectedUser(null);
  };

  const handleSendMessage = async (message: string) => {
    user && user.username && selectedUser && selectedUser.clerkId &&
    await createChat({
      senderId: user.id,
      receiverId: selectedUser?.clerkId,
      senderName: user.username,
      receiverName: selectedUser?.userName,
      messages: {
        senderName: user.username,
        text: message,
        timestamp: Date.now(),
      }
    })
    user && selectedUser &&
    await addChat({
      clerkId: selectedUser?.clerkId,
      senderId: user?.id,
    })
  };

  return (
    <section className="justify-center w-[20rem] bg-white h-[30rem] rounded-b-lg border-b border-t border-gray-200 mr-4 overflow-y-auto">
      <div className="flex flex-col pt-2">
        {users && users.map((onlineUsers: Doc<"users">) => (
          onlineUsers.clerkId !== user?.id && (
            <div
              key={onlineUsers.clerkId}
              className={`flex items-center gap-2 p-2 border-b border-gray-200 w-full cursor-pointer hover:bg-accent
                ${selectedUser?.clerkId === onlineUsers.clerkId && 'bg-blue-200'}
                ${getUserById && getUserById.chatReceivedFrom.includes(onlineUsers.clerkId) && 'bg-pink-200'}`}
              onClick={() => startChat(onlineUsers)}
            >
              <Image src={onlineUsers.imageUrl} alt={onlineUsers.userName} width={30} height={30} className="rounded-full" />
              <div className="flex w-full justify-between items-center">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{onlineUsers.userName}</p>
                {getUserById && getUserById.chatReceivedFrom.includes(onlineUsers.clerkId) && (
                  <p className="flex items-center justify-center h-6 w-6 border rounded-full bg-white font-semibold text-xs">
                    {countSpecificValue(getUserById.chatReceivedFrom, onlineUsers.clerkId)}
                  </p>
                )}
              </div>
            </div>
          )
        ))}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
        <div />
        </PopoverTrigger>
        {selectedUser && (
          <PopoverContent className="w-[20rem]">
            {user &&
              <ChatScreen
                recipient={selectedUser}
                senderId={user?.id}
                onSendMessage={handleSendMessage}
                onClose={closeChat}
              />
            }
          </PopoverContent>
        )}
      </Popover>
      </div>
    </section>
  )
}

interface ChatMessage {
  senderName: string;
  text: string;
  timestamp: number;
}

interface ChatScreenProps {
  recipient: { clerkId: string; userName: string; imageUrl: string };
  senderId: string;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const ChatScreen = ({ recipient, senderId, onSendMessage, onClose }: ChatScreenProps) => {
  const { register, handleSubmit, reset } = useForm();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const getChatMessages = useQuery(api.chat.getChatMessages, {
    senderId,
    receiverId: recipient?.clerkId,
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [getChatMessages]);

  const onSubmit = (data: any) => {
    onSendMessage(data.message);
    reset();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="chat-screen flex flex-col p-4 justify-center">
      <div className="flex items-between justify-between">
        <div className="flex gap-1 font-semibold text-lg mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
          <Image
            src={recipient.imageUrl}
            width={30}
            height={30}
            alt={recipient.userName}
            className="rounded-full"
          />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">{recipient.userName}</p>
        </div>
        <ShieldCloseIcon className="cursor-pointer" onClick={onClose} />
      </div>
      <div
        ref={chatContainerRef}
        className="chat-messages h-[20rem] border border-gray-200 rounded-lg p-1 overflow-y-auto w-full"
      >
        {getChatMessages &&
          getChatMessages.map((chats: Doc<"chat">) => (
            <div key={chats._id} className="flex flex-col gap-2">
              {chats &&
                chats.messages.map((chat: ChatMessage) => (
                  <div key={chat.timestamp}
                    className={`p-2 rounded-lg w-5/6 ${
                      chat.senderName === recipient.userName ? 'bg-gray-100 mr-auto' : 'bg-blue-100 ml-auto'
                    }`}
                  >
                    <p className="text-sm break-words">{chat.text}</p>
                    <p className="text-xs text-gray-500">{new Date(chat.timestamp).toLocaleString()}</p>
                  </div>
                ))}
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Textarea
          {...register('message', { required: true })}
          placeholder="Type your message here..."
          className="w-full p-2 border rounded-lg mb-2"
          onKeyDown={handleKeyDown}
        />
        <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatList;
