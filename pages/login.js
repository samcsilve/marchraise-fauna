import LoginPage from "@/components/Login";
import { useAuth } from "@/lib/auth";
import Head from "next/head";
import React from "react";
import nookies from "nookies";
import faunadb from "faunadb";

export async function getServerSideProps({ req, res }) {
  const cookies = nookies.get({ req });

  if (cookies.faunaToken) {
    const faunaClient = new faunadb.Client({
      secret: cookies.faunaToken,
      domain: "db.us.fauna.com",
    });
    const q = faunadb.query;

    const userRef = await faunaClient.query(q.CurrentIdentity());

    if (userRef) {
      return {
        redirect: {
          destination: `/my-campaigns`,
          permanent: false,
        },
      };
    } else {
      return { props: {} };
    }
  } else {
    return {
      props: {},
    };
  }
}

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </>
  );
};

export default Login;
