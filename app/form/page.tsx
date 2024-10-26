import React from "react";
import { SimpleRegistrationForm } from "./form";

type Props = {};

function page({}: Props) {
  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center p-1 bg-[url('/bg/ebg.png')] bg-cover">
      < SimpleRegistrationForm/>
    </div>
  );
}

export default page;