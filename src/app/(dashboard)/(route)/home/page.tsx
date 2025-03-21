import { auth } from "@/lib/auth";
import React, { Fragment } from "react";

const Home = async () => {
  const session = await auth();
  return <Fragment>Home</Fragment>;
};

export default Home;
