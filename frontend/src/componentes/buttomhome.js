import {Link as LinkRouter} from "react-router-dom"

export default function ButtonHome() {
  return (
      <div className="buttomhome">
    <LinkRouter to= {"/home"}>
    <button className="learn-more">
    <span className="circle" aria-hidden="true">
    <span className="icon arrow"></span>
    </span>
    <span className="button-text">Home</span>
  </button>
   </LinkRouter>
   </div>
  );
}
