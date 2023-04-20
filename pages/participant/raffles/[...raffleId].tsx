import RaffleDetails from "components/participant/raffle-details";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetRaffleByIdQuery } from "store/features/api.slice";
import { useEffect } from "react";
import { useAppDispatch } from "store";
import { setSelectedRaffleId } from "store/features/raffles.slice";
import Link from "next/link";
import ParticipantDashboard from "components/participant";
import LoadingSpinner from "components/shared/loading-spinner";
import { Layout } from "components/shared";

const RafflePage: NextPage = () => {
  const router = useRouter();
  const getRaffleQuery = useGetRaffleByIdQuery({
    raffleId: router.query.raffleId?.[0] as string,
    populate: true,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getRaffleQuery.data) {
      document.title = `${getRaffleQuery.data.projectName} | Raffle`;
      dispatch(setSelectedRaffleId(getRaffleQuery.data._id));
    }
  }, [getRaffleQuery.data, dispatch]);

  if (getRaffleQuery.isError)
    return (
      <div className="flex items-center justify-center flex-col space-y-4 h-screen">
        <h1 className="text-4xl font-extrabold">Raffle Not Found!</h1>
        <p>Sorry, we {"couldn't"} find the raffle you were looking for.</p>
        <Link
          href="/participant/raffles"
          className="px-2 py-1 bg-white/20 rounded border-2 border-white/30 duration-200 hover:bg-white/30"
        >
          Go back to raffles
        </Link>
      </div>
    );

  return (
    <Layout>
      <div className="page-container">
        <div className="space-y-10 page">
          <ParticipantDashboard>
            {getRaffleQuery.isLoading && (
              <div>
                <LoadingSpinner />
              </div>
            )}
            {getRaffleQuery.data && (
              <RaffleDetails raffle={getRaffleQuery.data} />
            )}
          </ParticipantDashboard>
        </div>
      </div>
    </Layout>
  );
};

export default RafflePage;
