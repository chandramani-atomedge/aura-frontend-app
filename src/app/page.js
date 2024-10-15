'use client'
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

const Home = ({params}) => {
  useLayoutEffect(() => {
    redirect(`${params.lang}`)
  }, []);
  return <></>;
};

export default Home;
