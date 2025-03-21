import React from "react";
import SubscribeAds from "./_common/SubscribeAds";
import FollowList from "./_common/FollowList";

const RightSidebar = () => {
  return (
    <div className="px-0 fixed top-0 py-4 hidden lg:flex max-w-[330px]">
      <div className="w-full flex flex-col gap-3 max-x-[330px]">
        <SubscribeAds />
        <FollowList />
      </div>
    </div>
  );
};

export default RightSidebar;
