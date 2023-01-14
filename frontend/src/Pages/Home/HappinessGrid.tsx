import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import AddEntry from "./AddEntry";

const HappinessGrid = ({ id }: any) => {
  const [happinessGrid, setHappinessGrid] = useState<string[]>([]);
  const auth = useAuth();

  useEffect(() => {
    let now = new Date();
    let temp: string[] = [];
    for (let d = new Date(2022, 11, 1); d <= now; d.setDate(d.getDate() + 1)) {
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
    return (
      <div className="w-full min-h-screen bg-neutral-800 flex text-white text-3xl items-center justify-center">
        Please sign in to access content.
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-800 flex justify-center">
      <div className="w-11/12 flex flex-col items-center">
        <div className="flex flex-wrap gap-2 justify-center">
          {happinessGrid.map((happiness) => (
            <div
              className={`w-10 h-10 rounded-xl transition duration-300 hover:scale-125 ${
                happiness === "bad" ? "bg-red-500" : false
              } ${happiness === "ok" ? "bg-yellow-300" : false} ${
                happiness === "good" ? "bg-green-500" : false
              } ${happiness === "unknown" ? "bg-neutral-700" : false}`}
            ></div>
          ))}
        </div>
        <AddEntry />
      </div>
    </div>
  );
};

export default HappinessGrid;
