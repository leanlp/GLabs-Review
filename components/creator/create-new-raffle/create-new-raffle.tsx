import CreateNewRaffleForm from "./create-new-raffle-form";

const CreateNewRaffle = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h3>Create New Raffle</h3>
        <button type="button">Back To Home</button>
       
      </div>
      <CreateNewRaffleForm />
    </div>
  );
};

export default CreateNewRaffle;
