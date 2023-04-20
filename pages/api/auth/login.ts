import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import config from "config";

const { providers } = config;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { provider, redirect_url, primaryWallet },
    headers: { host },
  } = req;

  res.setHeader("Set-Cookie", [
    cookie.serialize("redirect_url", (redirect_url as string) ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    }),
    cookie.serialize("primaryWallet", (primaryWallet as string) ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    }),
    cookie.serialize("host", (host as string) ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    }),
  ]);

  res.redirect(providers[provider as keyof typeof providers].url);

  // res.end(
  //   `provider: ${provider}, redirect_url: ${redirect_url}, primaryWallet: ${primaryWallet}`
  // );
}
