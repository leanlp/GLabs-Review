import { NextApiRequest, NextApiResponse } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, cookies } = req;

  const code = query.code;
  const provider = query.providers?.[0];
  const primaryWallet = cookies.primaryWallet;
  const redirect_url = cookies.redirect_url;
  const host = cookies.host;

  try {
    const response = await fetch(
      `${API_URL}/auth/${provider}?primaryWallet=${
        primaryWallet ?? ""
      }&${provider}AuthenticationCode=${code}`
    );

    const data = await response.json();

    if (data[`${provider}User`]?.error) {
      console.error(data[`${provider}User`].error);

      return res.redirect(
        `http://${host}${redirect_url}?error=${
          data[`${provider}User`].error
        }&success=false&provider=${provider}`
      );
    }

    if (data.error) {
      console.error(data.error);
      return res.redirect(
        `http://${host}${redirect_url}?error=${data.error}&success=false&provider=${provider}`
      );
    }

    res.redirect(
      `http://${host}${redirect_url}?success=true&provider=${provider}`
    );
  } catch (error) {
    console.error("error: ", error);
    res.redirect(
      `http://${host}${redirect_url}?error=${error}&success=false&provider=${provider}`
    );
  }
}
