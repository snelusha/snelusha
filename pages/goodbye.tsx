import React from "react";
import { GetServerSidePropsContext } from "next";

import { Low } from "@lib/low";

export default function () {
  const goodbye = () => {
    console.log("goodbye sithi!");
  };

  return (
    <div className="w-full max-w-lg min-h-screen flex flex-col items-center justify-center bg-blue-100 mx-auto">
      <h4>Hey! I hope you are the authorized person who I expected!</h4>
      <p>Note: Once this action has been confirmed, it cannot be reversed!</p>
      <button className="" onClick={goodbye}>
        Goodbye Sithi
      </button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const db = new Low("db.json");
  const data = await db.read();
  if (data.goodbye) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}
