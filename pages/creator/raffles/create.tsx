import CreatorDashboard from "components/creator";
import { NextPage } from "next";
import Head from "next/head";
import NewRuffleForm from "components/creator/new-raffle-form";
import { Layout } from "components/shared";

const NewRaffle: NextPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <Head>
            <title>New Raffle</title>
          </Head>
          <CreatorDashboard>
            <NewRuffleForm />
          </CreatorDashboard>
        </div>
      </div>
    </Layout>
  );
};

export default NewRaffle;
