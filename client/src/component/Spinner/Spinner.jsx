// import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

let override = {
  height: "100vh",
  display: "flex",
  align: "center",
  justifyContent: "center",
  borderColor: "red",
  marginTop: "100px" 
};

// CSSProperties = override

const Spinner = ({isloading}) => {
  return (
    <div>
      <BeatLoader 
        color={"#2e2e2fff"}
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

