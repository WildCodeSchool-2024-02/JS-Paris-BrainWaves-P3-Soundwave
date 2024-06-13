import { useLoaderData } from "react-router-dom";
import CardCrew from "../../components/CardCrew/CardCrew";
import "./crewslist.css";

function CrewsList() {
  const results = useLoaderData();

  return (
    <main className="card-crew-container">
      <h1>Nos collectifs</h1>
      {results.map((result) => (
        <CardCrew result={result} key={result.id} />
      ))}
    </main>
  );
}

export default CrewsList;
