import React from "react";
import Signup from "@/components/Signup";
import { useRouter } from "next/router";
import Head from "next/head";

const SignupPage = () => {

  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Signup />
    </div>
  );
};

export default SignupPage;
