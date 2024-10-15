"use client";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

const withAuth = (Component) => {
  return function WithAuth(props) {
    useLayoutEffect(() => {
      let checkTokens = false;
      if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken") &&
        localStorage.getItem("orgId")
      ) {
        checkTokens = true;
      }

      if (!checkTokens) {
        redirect(`/${props.params.lang}/login`);
      }
    }, []);

    return <Component params={props.params} {...props} />;
  };
};

export default withAuth;
