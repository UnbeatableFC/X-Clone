"use client";
import Logo from "@/components/logo";
import Spinner from "@/components/spinner";
import useUser from "@/hooks/useUser";
import React, { Fragment } from "react";
import Header from "../../_components/_common/Header";
interface PropsType {
  params: {
    username: string;
  };
}

const SingleUser = (prop: PropsType) => {
  const { username } = prop.params;
  const { data, isLoading } = useUser(username);
  const fetchedUser: UserType = data?.data;

  if (isLoading || !data) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <Logo width="50px" height="50px" className="animate-pulse" />
        <Spinner size="icon" />
      </div>
    );
  }
  return (
    <Fragment>
      <Header label={fetchedUser?.name || ""} showBackArrow />
      {/* <UserHero user={fetchedUser} />
    <UserBio user={fetchedUser} /> */}
    </Fragment>
  );
};

export default SingleUser;
