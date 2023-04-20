import FAQsPage from "components/faqs";
import { Layout } from "components/shared";
import Head from "next/head";

const FAQs = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <Head>
            <title>FAQs</title>
          </Head>
          <FAQsPage />
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
