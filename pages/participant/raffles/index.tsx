import ParticipantDashboard from "components/participant";
import { Layout } from "components/shared";
import { NextPage } from "next";
import Head from "next/head";
import RafflesTable from "components/participant/participant-raffles-table/raffles-table";

const ParticipantPage: NextPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <Head>
            <title>Participant Dashboard</title>
          </Head>
          <ParticipantDashboard>
            <RafflesTable />
          </ParticipantDashboard>
        </div>
      </div>
    </Layout>
  );
};

export default ParticipantPage;
