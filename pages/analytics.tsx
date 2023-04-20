import { NextPage } from "next";
import Head from "next/head";
import AnalyticsPage from "components/analytics";
import { Layout } from "components/shared";

const Analytics: NextPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <Head>
            <title>Analytics</title>
          </Head>
          <div className="mt-16">
            <AnalyticsPage />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
