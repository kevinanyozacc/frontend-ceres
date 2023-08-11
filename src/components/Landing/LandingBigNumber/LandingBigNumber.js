import AnimatedNumbers from "react-animated-numbers";
import "./LandingBigNumber.css";

const LandingBigNumber = ({ iconComponent, number, unit }) => {
  return (
    <div className="LandingBigNumber">
      <div className="LandingBigNumber__icon">{iconComponent}</div>
      <div className="LandingBigNumber__number">
        <AnimatedNumbers animateToNumber={number} includeComma />
      </div>
      <div className="LandingBigNumber__unit">{unit}</div>
    </div>
  );
};

export default LandingBigNumber;
