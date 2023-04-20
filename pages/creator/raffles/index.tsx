import { NextPage } from "next";
import Head from "next/head";
import CreatorDashboard from "components/creator";
import CreatorRafflesTable from "components/creator/creator-raffles-table";
import { Layout } from "components/shared";

const CreatorPage: NextPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <Head>
            <title>Creator Dashboard</title>
          </Head>
          <CreatorDashboard showBottomSection>
            <CreatorRafflesTable />
          </CreatorDashboard>
        </div>
      </div>
    </Layout>
  );
};

export default CreatorPage;
