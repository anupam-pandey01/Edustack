// import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

let override = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

// CSSProperties = override

const Spinner = ({isloading}) => {
  return (
    <div>
      <BeatLoader 
        color={"#6565feff"}
        loading={isloading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner

