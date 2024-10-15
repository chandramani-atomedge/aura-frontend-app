import { redirect } from "next/navigation";
import React from "react";

const useToken = async (path, body = {}, method) => {
  const orgid = localStorage.getItem("orgId");
  const accesstoken = localStorage.getItem("accessToken");
  const refreshtoken = localStorage.getItem("refreshToken");

  let requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Access-Token": `${accesstoken},`,
      "Refresh-Token": `${refreshtoken},`,
    },
  };
  if (method !== "GET") {
    requestOptions["body"] = JSON.stringify({ ...body, orgid: orgid });
  }

  let responseTry1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
    requestOptions
  );

  if (responseTry1.ok) {
    return responseTry1;
  } else {
    if (responseTry1.status === 403 || responseTry1.status === 401) {
      const getKey = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generate-access-token`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": `${accesstoken},`,
            "Refresh-Token": `${refreshtoken},`,
          },
        }
      );
      let result = await getKey.json();
      let generatedToken = JSON.parse(result.message)["access-token"];
      localStorage.setItem("accessToken", generatedToken);

      let responseTry2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
        requestOptions
      );
      if (responseTry2.ok) {
        return responseTry2;
      } else {
        //redirect to necessary page
        // redirect('/404page')
      }
    }
  }
};

export default useToken;
