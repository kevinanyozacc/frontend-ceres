import Loader from "../../../components/Loader";
import "../styles/loading-global.css";

export function LoadingGlobal({ title }) {
  return (
    <div className="Loading__Global">
      <Loader query={title} />
    </div>
  );
}
