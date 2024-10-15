'use client'
import React, { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { getDictionary } from "@/getDictionary";

export default function Home({ params }) {
  useLayoutEffect(() => {
    if(window != undefined){
      const accesstoken = localStorage.getItem("accessToken");
      const refreshtoken = localStorage.getItem("refreshToken");
      const orgid = localStorage.getItem("orgId");
      if(accesstoken && refreshtoken && orgid){
        redirect(`${params.lang}/home`)
      }else{
        redirect(`${params.lang}/login`)
      }
    }
  },[])
  return (
    <></>
  );
}
