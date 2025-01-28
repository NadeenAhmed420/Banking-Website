import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import "../../app/globals.css";
import { useRouter } from "next/navigation";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { createLinkToken } from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  //EXCHANGE THE PUBLIC TOKEN SO I CSN LINK TO BANK ACCOUNT
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    // await exchangePublicToken({
    //   publicToken: public_token,
    //   user,
    // })

    //THEN AFTER EXCHANGE THE PUBLIC TOKEN I REDIRECT TO THE DASHBOARD WHICH MEAN SUCCESS LINKED THE BANK ACCOUNT
    router.push('/');
  }, [user])
  
  //TO FETCH THE TOKEN ON TIME
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  
  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Bank Account
        </Button>
      ) : variant === "ghost" ? (
        <Button className="plaidlink-ghost">Connect Bank Account</Button>
      ) : (
        <Button className="plaidlink-default">Connect Bank Account</Button>
      )}
    </>
  );
};

export default PlaidLink;
