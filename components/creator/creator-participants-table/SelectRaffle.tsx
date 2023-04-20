import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useAppDispatch, useAppSelector } from "store";
import { useId } from "react";
import { setSelectedRaffleId } from "store/features/raffles.slice";

export default function SelectRaffle() {
  const id = useId();
  const raffles = useAppSelector((state) => state.raffles.raffles);
  const selectedRaffleId = useAppSelector(
    (state) => state.raffles.selectedRaffleId
  );
  const dispatch = useAppDispatch();

  const handleSelectRaffle = (raffleId: string) => {
    if (!raffleId) return dispatch(setSelectedRaffleId(undefined));
    dispatch(setSelectedRaffleId(raffleId));
  };
  return (
    <div className="max-w-lg">
      <FormControl fullWidth size="small">
        <InputLabel id={id}>Select Raffle</InputLabel>
        <Select
          labelId={id}
          label="Select Raffle"
          className="min-w-[250px]"
          fullWidth
          value={selectedRaffleId}
          onChange={(e) => handleSelectRaffle(e.target.value as string)}
          size="small"
          variant="outlined"
        >
          <MenuItem value="">All</MenuItem>
          {raffles.map((raffle) => (
            <MenuItem value={raffle._id} key={raffle._id}>
              {raffle.projectName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
