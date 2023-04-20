import Head from "next/head";
import SettingsPage from "components/settings";
import { NextPage } from "next";
import { Layout } from "components/shared";

const Settings: NextPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <Head>
            <title>Settings</title>
          </Head>
          <SettingsPage />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
