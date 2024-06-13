import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex min-h-screen items-center justify-center">
    <UserProfile />
  </div>
);

export default UserProfilePage;
