import {Link as LinkRouter} from "react-router-dom"

export default function Button() {
  return (
    <LinkRouter to= {"/cities"}>
    <button className="learn-more">
    <span className="circle" aria-hidden="true">
    <span className="icon arrow"></span>
    </span>
    <span className="button-text">Cities</span>
  </button>
   </LinkRouter>
  );
}




