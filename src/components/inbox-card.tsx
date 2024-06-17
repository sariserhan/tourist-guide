"use client";

import Link from 'next/link'
import Image from 'next/image';
import { Id } from "@/../convex/_generated/dataModel"
import { api } from "@/../convex/_generated/api"
import { fetchMutation } from "convex/nextjs"
import { SenderInfosProps } from '@/lib/types';
import { capitalizeWords, formatCreationTime } from '@/lib/utils';

const InboxCard = (senderInfo: SenderInfosProps) => {
  const handleMarkAsRead = async (messageId: Id<"messages">) => {
    await fetchMutation(api.messages.markAsRead, { messageId })
  }
  return (
    <main>
      <Link href={`/message/${senderInfo.senderId}`}
        onClick={async () => await handleMarkAsRead(senderInfo.messageId)}
      >
        <div className="flex items-center justify-between gap-2 min-w-full border-b pb-1">
          <div className="flex items-center gap-2">
            <Image
              src={senderInfo.senderImageUrl}
              alt={senderInfo.senderName}
              width={40}
              height={40}
              className="rounded-full"
            />
            {senderInfo.senderName}
          </div>
          <div className="flex justify-end space-x-2">
            <p><span className="font-semibold">Country: </span>{senderInfo.about.country}</p>
            {senderInfo.about.city && <p><span className="font-semibold">City:</span> {senderInfo.about.city}</p>}
            {senderInfo.about.category && <p><span className="font-semibold">Category:</span> {capitalizeWords(senderInfo.about.category)}</p>}
          </div>
        </div>
        <div className="flex justify-between pt-10 pb-2">
          <p>{senderInfo.text}</p>
          <p>{formatCreationTime(senderInfo.creationTime)}</p>
        </div>
      </Link>
    </main>
  )
}

export default InboxCard;
