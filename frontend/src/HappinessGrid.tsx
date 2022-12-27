import { useEffect, useState } from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useAuth } from "./Context/AuthContext";

const HappinessGrid = ({ id }: any) => {
  const [happinessGrid, setHappinessGrid] = useState<string[]>([]);
  const auth = useAuth();

  useEffect(() => {
    let now = new Date();
    let temp: string[] = [];
    for (let d = new Date(2022, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
      temp.push("unknown");
    }
    setHappinessGrid(temp);
  }, [id]);

  const newHappinessEntry = (e: any) => {
    e.preventDefault();
    let temp = happinessGrid.concat(e.target.elements.happiness.value);
    setHappinessGrid(temp);
  };

  if (!auth.getAuthData().authToken) {
    return <h1>Please sign in first</h1>;
  }

  return (
    <div className="w-full bg-black flex justify-center">
      <div className="w-11/12 flex flex-col items-center">
        <div className="flex flex-wrap gap-2 justify-center">
          {happinessGrid.map((happiness) => (
            <div
              className={`w-10 h-10 rounded-xl transition duration-300 hover:scale-125 ${
                happiness === "bad" ? "bg-red-500" : false
              } ${happiness === "ok" ? "bg-yellow-300" : false} ${
                happiness === "good" ? "bg-green-500" : false
              } ${happiness === "unknown" ? "bg-slate-500" : false}`}
            ></div>
          ))}
        </div>
        <div className="text-white flex flex-col items-center">
          <p>Current date</p>
          <p>{new Date().toDateString()}</p>
          <form onSubmit={(e) => newHappinessEntry(e)}>
            <div className="text-6xl flex">
              <label>
                <input
                  type="radio"
                  name="happiness"
                  value="bad"
                  className="appearance-none peer/bad"
                />
                <div className="transition duration-300 hover:scale-125 peer-checked/bad:text-red-600">
                  <SentimentVeryDissatisfiedIcon fontSize="inherit" />
                </div>
              </label>

              <label>
                <input
                  type="radio"
                  name="happiness"
                  value="ok"
                  className="appearance-none peer/ok"
                />
                <div className="transition duration-300 hover:scale-125 peer-checked/ok:text-yellow-300">
                  <SentimentNeutralIcon fontSize="inherit" />
                </div>
              </label>

              <label>
                <input
                  type="radio"
                  name="happiness"
                  value="good"
                  className="appearance-none peer/good"
                />
                <div className="rounded-full p-0 transition duration-300 hover:scale-125 peer-checked/good:text-green-600">
                  <SentimentSatisfiedAltIcon fontSize="inherit" />
                </div>
              </label>
            </div>
            <input type="submit" value="submit" className="" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HappinessGrid;
