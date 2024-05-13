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
