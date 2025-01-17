import { ChangeEvent, useEffect, useState, useReducer } from "react";
import "./App.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  SwapHoriz,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
  Send,
} from "@mui/icons-material";

type Devise = {
  devise: string;
  symbol: string;
};
type DeviseState = {
  deviseLeft?: Devise;
  deviseRight?: Devise;
  errorL?: boolean;
  errorR?: boolean;
  devises?: Devise[];
  transfer?: [];
};
const initialState: DeviseState = {
  deviseLeft: undefined,
  deviseRight: undefined,
  errorL: false,
  errorR: false,
  devises: [
    {
      devise: "EUR",
      symbol: "€",
    },
    {
      devise: "USD",
      symbol: "$",
    },
  ],
  transfer: [],
};
function reducerDevise(state: DeviseState, action: DeviseState) {
  // if (action.type === "setErrorL") {
  //   return {
  //     ...state,
  //     errorL: !state.errorL,
  //   };
  // } else if (action.type === "setErrorR") {
  //   return {
  //     ...state,
  //     errorR: !state.errorR,
  //   };
  // }
  // throw Error("Unknown action.");
  // console.log("reducerDevise", state, action);
  return {
    ...state,
    ...action,
  };
}
function App() {
  const [amount, setAmount] = useState(0);
  const [variation, setVariation] = useState("");
  const [exchangeRate, setExchangeRate] = useState(1.1);
  const [isEuroToUsd, setIsEuroToUsd] = useState(true);
  const [forceRate, setForceRate] = useState(false);
  const [forceRateValue, setForceRateValue] = useState(0);
  const [state, dispatch] = useReducer(reducerDevise, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      const baseRate = 1.1;
      const variation = Math.random() * 0.1 - 0.05;
      if (Math.sign(variation) === -1) {
        setVariation("down");
      } else if (Math.sign(variation) === 1) {
        setVariation("up");
      } else {
        setVariation("");
      }
      // console.log(forceRateValue);
      // if (forceRate && forceRateValue > 0) {
      //   setExchangeRate(forceRateValue);
      // } else {
      setExchangeRate(baseRate + variation);
      // }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // if (forceRate && forceRateValue > 0) {
    //   setExchangeRate(forceRateValue);
    // }
  }, [forceRate, forceRateValue]);

  const convertedAmount = () => {
    const rate = forceRate ? forceRateValue : exchangeRate;
    if (isEuroToUsd) {
      return amount * rate;
    } else {
      return amount / rate;
    }
  };

  const handleSwitchValue = () => {
    setIsEuroToUsd(!isEuroToUsd);
    dispatch({
      ...state,
      deviseLeft: state.deviseRight,
      deviseRight: state.deviseLeft,
    });
    setAmount(parseFloat(convertedAmount().toFixed(2)));
  };

  function handleCostChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      setAmount(parseFloat(e.target.value));
    }
  }
  function handleRightChange(e: SelectChangeEvent) {
    let error = false;
    if (
      state.deviseLeft?.devise.length !== undefined &&
      state.deviseLeft?.devise.length !== 0 &&
      state.deviseLeft?.devise === e.target.value
    ) {
      error = true;
    }
    dispatch({
      ...state,
      deviseRight: state.devises?.find(
        (devise) => devise.devise === e.target.value,
      ),
      errorR: error,
      errorL: false,
    });
  }
  function handleLeftChange(e: SelectChangeEvent) {
    let error = false;

    if (
      state.deviseRight?.devise.length !== undefined &&
      state.deviseRight?.devise.length !== 0 &&
      e.target.value === state.deviseRight?.devise
    ) {
      error = true;
    }
    dispatch({
      ...state,
      deviseLeft: state.devises?.find(
        (devise) => devise.devise === e.target.value,
      ),

      errorR: false,
      errorL: error,
    });
  }
  return (
    <>
      <header className="w-full flex justify-center p-8">
        <div
          id="header-section-convertor"
          className="border border-slate-300 rounded-md p-6 w-4/5"
        >
          <h1 className="text-2xl">Convertisseur</h1>
          <br />
          <section>
            <p>
              Taux de change actuel : {exchangeRate.toFixed(2)}
              {variation === "up" && <TrendingUp color="primary" />}
              {variation === "down" && <TrendingDown color="error" />}
              {variation === "" && <TrendingFlat color="disabled" />}
            </p>
          </section>
          <br />
          <section className="flex">
            <div className="mr-7 h-14">
              <OutlinedInput
                disabled={
                  !state.deviseRight ||
                  !state.deviseLeft ||
                  state.errorL ||
                  state.errorR
                }
                type={"number"}
                value={amount ? amount : ""}
                placeholder="0"
                onChange={handleCostChange}
                endAdornment={
                  <InputAdornment position="end">
                    {state.deviseLeft ? state.deviseLeft.symbol : ""}
                  </InputAdornment>
                }
                aria-describedby="outlined-cost-field"
              />
            </div>
            <div className="flex w-full gap-1 h-14">
              <FormControl className="grow">
                <Select
                  error={state.errorL}
                  value={state.deviseLeft ? state.deviseLeft.devise : ""}
                  onChange={handleLeftChange}
                >
                  {/*<MenuItem value="">...</MenuItem>*/}
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
                <FormHelperText>
                  {state.errorL ? "Les valeurs doivent etre differentes" : ""}
                </FormHelperText>
              </FormControl>

              <IconButton
                className="grow-0"
                onClick={() => handleSwitchValue()}
                aria-label="delete"
                size="large"
              >
                <SwapHoriz />
              </IconButton>
              <FormControl className="grow">
                <Select
                  error={state.errorR}
                  value={state.deviseRight ? state.deviseRight.devise : ""}
                  onChange={handleRightChange}
                >
                  {/*<MenuItem value="">...</MenuItem>*/}
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
                <FormHelperText>
                  {state.errorR ? "Les valeurs doivent etre differentes" : ""}
                </FormHelperText>
              </FormControl>
            </div>
          </section>
        </div>
      </header>
      <main className="w-full flex justify-center p-8">
        <section className="border border-slate-300 rounded-md p-6 w-1/2 mr-2">
          <div className="flex w-full justify-between">
            <p className="text-4xl">
              {!state.errorR && !state.errorL
                ? `${convertedAmount().toFixed(2)} ${state.deviseRight ? state.deviseRight.symbol : ""}`
                : ""}{" "}
            </p>
            <Button disabled={!amount} variant="contained" endIcon={<Send />}>
              Transférer
            </Button>
          </div>
        </section>
        <section className="border border-slate-300 rounded-md p-6 w-1/2">
          <div className="flex w-full justify-between">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={() => setForceRate(!forceRate)} />}
                label="Forcer le taux"
              />
              <OutlinedInput
                value={forceRateValue}
                onChange={(e) => {
                  // console.log(e.target.value, parseFloat(e.target.value));
                  if (parseFloat(e.target.value) <= 0.0) {
                    setForceRateValue(0);
                    return;
                  }
                  setForceRateValue(parseFloat(e.target.value));
                }}
                disabled={!forceRate}
                type={"number"}
              />
            </FormGroup>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
