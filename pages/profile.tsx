import ProfilePage from "components/profile";
import { Layout } from "components/shared";
import { NextPage } from "next";
import Head from "next/head";

const Profile: NextPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <Head>
            <title>Profile</title>
          </Head>
          <ProfilePage />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
