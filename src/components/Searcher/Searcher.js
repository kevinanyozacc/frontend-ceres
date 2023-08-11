import LandingContainer from "../CenteredContainer";
import "./Searcher.css";
import SearcherBox from "./SearcherBox";

export default function Searcher({ title, name }) {
  return (
    <div className="Searcher">
      <LandingContainer className="Landing__hero">
        <SearcherBox title={title} name={name} />
      </LandingContainer>
    </div>
  );
}
