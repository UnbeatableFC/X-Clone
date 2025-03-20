import { Button } from "@/components/ui/button";
import React from "react";

const SubscribeAds = () => {
  return (
    <div className="bg-background border dark:border-[rgb(47,51,54)] rounded-xl p-4">
      <div className="w-full">
        <h2 className="text-[20px] font-bold">
          Subscribe To Premium
        </h2>
        <div className="flex flex-col gap-2 ">
          <p className="text-[15px] leading-[19px]">
            Unlock exclusive features and enjoy an ad-free experience
            by subscribing to our premium plan.
          </p>
          <Button
            variant="brandPrimary"
            size="brandSm"
            className="!h-auto !text-white font-semibold text-base
          "
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeAds;
