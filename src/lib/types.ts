import { Dispatch, SetStateAction } from "react";
import { Id } from "@/../convex/_generated/dataModel";

export type ForumCategoriesProps = {
    country: string;
    city: string;
    category: "general" | "cuisine-food" | "attractions-sightseeing" | "accommodation" | "transportation" | "language-communication" | "visa-entry" | "safety-health" | "currency-money" | "culture-customs" | "climate-weather" | "promotions";
}

export type ForumCardProps = ForumCategoriesProps & {
    title: string;
    article: string;
    createdBy: string;
    userImageUrl: string;
    storageId?: Id<"_storage"> | string;
};

export type PostProps = ForumCardProps & {
    likes: number;
    disLikes: number;
    _creationTime: string;
}

export type PostPropsWithId = ForumCardProps & {
    _id: string;
    likes: number;
    disLikes: number;
    _creationTime: string;
}

export interface PostImageProps {
    setImages: Dispatch<SetStateAction<string[]>>;
    setImageStorageIds: Dispatch<SetStateAction<(Id<"_storage">[] | undefined)>>;
    images: Array<string>;
}

export interface SenderInfosProps {
    messageId: Id<"messages">;
    senderId: string;
    senderName: string;
    senderImageUrl: string;
    text: string;
    creationTime: number;
    about: {
        country?: string;
        city?: string;
        category?: string;
    }
    read: boolean;
}

export type StatsProps = {
    id?: string | undefined
    name?: string | null
    capital?: string | null
    government?: string | null
    currency_code?: string | null
    currency?: string | null
    continent?: string | null
    region?: string | null
    population?: number | null
    calling_code?: string | number
    surface_area?: number | null
    national_dish?: string | null
    religion?: string | null
    life_expectancy?: number | null
    yearly_avg_temperature?: number | null
    languages?: string[]
    cities?: string[]
}
