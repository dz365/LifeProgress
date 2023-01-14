import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useAuth } from "../../Context/AuthContext";

const AddEntry = () => {
  const auth = useAuth();

  const reactions = {
    bad: {
      color: "text-red-600",
      icon: <SentimentVeryDissatisfiedIcon fontSize="inherit" />,
    },
    ok: {
      color: "text-yellow-300",
      icon: <SentimentNeutralIcon fontSize="inherit" />,
    },
    good: {
      color: "text-green-600",
      icon: <SentimentSatisfiedAltIcon fontSize="inherit" />,
    },
  };

  const newHappinessEntry = (e: any) => {
    e.preventDefault();
    console.log(e)
  };

  if (!auth.getAuthData().authToken) {
    return <></>;
  }

  return (
    <div className="text-white flex flex-col items-center">
      <p>Current date</p>
      <p>{new Date().toDateString()}</p>
      <form onSubmit={(e) => newHappinessEntry(e)}>
        <div className="flex flex-col">
          <div className="text-6xl flex">
            {Object.entries(reactions).map(([key, value]) => (
              <label key={key}>
                <input
                  type="radio"
                  name="happiness"
                  value={key}
                  className={`appearance-none peer/${key}`}
                />
                <div
                  className={`transition duration-300 hover:scale-125 peer-checked/${key}:${value.color}`}
                >
                  {value.icon}
                </div>
              </label>
            ))}
          </div>
          <textarea name="reflection" placeholder="Optional reflection about your day" className="text-black rounded-xl"/>
          <input
            type="submit"
            value="submit"
            className="cursor-pointer text-2xl"
          />
        </div>
      </form>
    </div>
  );
};

export default AddEntry;
