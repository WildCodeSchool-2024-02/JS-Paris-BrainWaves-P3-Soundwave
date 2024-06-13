import { useLoaderData } from "react-router-dom";
import CardCrew from "../components/CardCrew/CardCrew";

function CrewsList() {
  const results = useLoaderData();

  return (
    <div>
        <h1>Nos collectifs</h1>
      {results.map((result) => (
        <CardCrew result={result} key={result.id} />
      ))}
    </div>
  );
}

export default CrewsList;
