import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

const FollowList = () => {
  return (
    <div className="bg-background border dark:border-[rgb(47,51,54)] rounded-xl p-4 ">
      <div className="w-full">
        <h2 className="text-[20px] font-bold">Who To Follow</h2>
      </div>
      <div>
        <ul role="list" className="flex flex-col gap-6 mt-4 pb-2">
          <li
            role="listitem"
            className="flex flex-row gap-4 cursor-pointer "
          >
            <Link href="" className="flex-shrink-0 w-fit">
              <Avatar>
                <AvatarImage className="object-cover" />
                <AvatarFallback className="font-bold text-[18px] ">
                  W
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex flex-col">
                <Link href="" className="hover:underline">
                  <div className="flex gap-1">
                    <h5 className="font-semibold text-[15.5px] transition">
                        Sebastian
                    </h5>
                  </div>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FollowList;
