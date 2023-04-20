const CreatorParticipantTableHeader = ({
    selectedRaffleId,
}: { selectedRaffleId: string }) => {
  return (
      <>
    {
        selectedRaffleId === "" ? (
            <div className="w-full grid grid-cols-9 mb-4 gap-2">
              <div className="col-span-2">Name</div>
              <div>Socials</div>
              <div className="col-span-2">Wallet</div>
              <div>Raffle Registrations</div>
                {/*<div>Loyalty Points</div>*/}
            </div>
        ) : (
            <div className="w-full grid grid-cols-9 mb-4 gap-2">
              <div className="col-span-2">Name</div>
              <div>Won/lost</div>
              <div>Socials</div>
              <div className="col-span-2">Wallet</div>
              <div>Entries</div>
              <div>Total Weight</div>
              {/*<div>Loyalty Points</div>*/}
              {/*<div>Entered On</div>*/}
            </div>
        )
    }
      </>
  );
};

export default CreatorParticipantTableHeader;
