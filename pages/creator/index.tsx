import CreatorDashboard from "components/creator";
import Head from "next/head";
import CreatorRafflesTable from "components/creator/creator-raffles-table/creator-raffles-table";
import { NextPage } from "next";
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
