import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface PropType {
  user: UserType;
}

const UserHero: React.FC<PropType> = ({ user }) => {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-700 h-44 relative">
      {user?.coverImage && (
        <div className="w-full h-44 relative">
          <Image
            src={user.coverImage}
            alt="cover-image"
            fill
            className="w-full h-full object-center"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="absolute -bottom-16 left-4">
        <div className="bg-neutral-800 !w-[141px] !h-[141px] rounded-full p-[2px] border-2">
          <Avatar className="!w-full !h-full hover:opacity-90">
            <AvatarImage
              src={user?.profileImage || ""}
              alt={user?.name || ""}
              className="object-cover"
            />
            <AvatarFallback className="font-bold text-[60px] ">
                {user?.name?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default UserHero;
