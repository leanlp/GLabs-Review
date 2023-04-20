import { NextPage } from "next";
import Head from "next/head";

import CreatorDashboard from "components/creator";
import CreatorParticipantTable from "components/creator/creator-participants-table";
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
            <CreatorParticipantTable />
          </CreatorDashboard>
        </div>
      </div>
    </Layout>
  );
};

export default CreatorPage;
