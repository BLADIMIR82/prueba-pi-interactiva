import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import {useState} from "react"
import  itinerariesActions from "../redux/actions/itinerariesAction"
import {connect} from "react-redux"
import  NoItineraries from "./noitineraries"
import CardActivities from "./cardActivities"
import commentsActions from "../redux/actions/commentsActions"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


function RecipeReviewCard(props) {


  const [reload, setReload] = useState(false)
  const [inputText, setInputText] = useState()
  const [modifi, setModifi] = useState()
  const [expanded, setExpanded] = React.useState(false);
  const [itinerary, setItinerary] = useState()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  
  useEffect(()=>{
    props.fetchearUnaItinerary(props.id)
    
  },[reload])   

 
  async function cargarComentario(idcomment) {

    const commentData = {
      itinerary:idcomment,
      comment: inputText,           
    }
    await props.addComment(commentData)
    .then(response =>setItinerary(response.data.response.nuevoComment), setInputText(""))
    setReload(!reload)
   
  }



  async function modificarComentario(event) {
    const commentData = {
      commentID: event.target.id,
      comment: modifi,
    }
    await props.modifiComment(commentData)
    setReload(!reload)

  }



  async function eliminarComentario(event) {
    await props.deleteComment(event.target.id)
    setReload(!reload)
  }
 
  async function likesOrDislikes(id_Itinerario) {
    await props.likeDislike(id_Itinerario)
    setReload(!reload)
    
  }

  return (
      <div className='tineraries'>
    {props.itinerariesByCity?.length !== 0?(props.itinerariesByCity?.map((evento)=> (     
    <Card   sx={{ maxWidth: "auto"} }>
      <div className="titletineraries" key={evento._id}> 
        <h1>{evento.titleitinerary}</h1>
      </div>
      <div className="infotineraries">
        <div className="imageuser">
        <img src={process.env.PUBLIC_URL+ `/imagenes/${evento.userimage}`} />
        </div>
        <div>
          <h2>{evento.username}</h2>
        </div>
        <div className="price">
        <div >
          <h3>Duration: ⏳ {evento.duration}  </h3>
        </div>
        <div>
          <h3>Price:{"💶".repeat(parseInt(evento.price))}  </h3>
        </div>
        </div>
        <div className="likes">
        <div>
          <h3>Likes:</h3>
        </div>
        <div> 
          
       
        <div className="likeDislike">
                      {props.user ? (
                        <button onClick={()=>{likesOrDislikes(evento._id)}}>
                          {evento?.likes.includes(props.user.id) ? (
                            <span
                              style={{ color: "red", fontSize: 30 }}
                              class="material-icons"
                            >
                              favorite
                            </span>
                          ) : (
                            <span
                              style={{ fontSize: 30 }}
                              class="material-icons"
                            >
                              favorite_border
                            </span>
                          )}
                        </button>
                      ) : (
                        <span style={{ fontSize: 30 }} class="material-icons">
                          favorite_border
                        </span>
                      )}
                      <h3 style={{ color: "black ", fontSize: 30 }}>
                        {evento?.likes.length}
                      </h3>
                    </div>
    
        </div>
        <div> 
          <h3>{evento.hashtag}</h3>
        </div>
        </div>
      </div>
      <CardActions disableSpacing   >
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="view More"

        >
              <button> {expanded ? "" : "View More"}</button>
        </ExpandMore>
      </CardActions>
      <Collapse  sx={{ maxWidth: 700}}  in={expanded} timeout="auto" unmountOnExit>
        <CardContent  >
        
        <CardActivities id={evento._id}/>

        <div className="comments">

{evento?.comments.map(comment =>
  <>
    {comment.userID?._id !== props.user?.id ?
      <div className="card1 cardComments " key={comment._id}>
        <div className="card-header">
          {comment.userID?.firstName}
          <img className="imgcomments"  src={comment.userID?.photoURL} />
        </div>
        <div class="card-body">
          <p class="card-text">{comment.comment}</p>
        </div>
      </div> :

      <div className="card1 cardComments">
        <div className="card-header">
          {comment.userID?.firstName}
          <img className="imgcomments"  src={comment.userID?.photoURL} />
        </div>
        <div className="card-body ">
          <textarea type="text" className="card-text textComments" onChange={(event) => setModifi(event.target.value)} defaultValue={comment.comment} />
          <button id={comment._id} onClick={modificarComentario} class="btn btn-secondary">✏Modify</button>
          <button id={comment._id} onClick={eliminarComentario} class="btn btn-secondary">🗑remove</button>
        </div>
      </div>

    }
  </>
)}

{props.user ?
  <div className="card1 cardComments">
    <div class="card-header">
LEAVE US YOUR COMMENT
    </div>
    <div className="card-body ">
      <textarea onChange={(event) => setInputText(event.target.value)} className="card-text textComments" value={inputText} />
      <button onClick={() =>{cargarComentario(evento._id)}} class="btn btn-secondary">  ➡ Send</button>
    </div>
  </div> :
  <h1 className="">Make singIn and leave us your comment</h1>   
}
</div>         
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="View less"
          >
          <button>View less</button>
          </ExpandMore>
        </CardContent>
      </Collapse>
    </Card>
    ))):<NoItineraries />}
    </div>
  );
}
const mapDispatchToProps  ={
  addComment: commentsActions.addComment,
  modifiComment: commentsActions.modifiComment,
  deleteComment: commentsActions.deleteComment,
  fetchearUnaItinerary:itinerariesActions.fetchearUnaItinerary,
  likeDislike: itinerariesActions.likeDislike,
  
}

const mapStateToProps = (state) =>{
  return{
           
     
      itinerariesByCity:state.itinerariesReducer.itinerariesByCity,
      user: state.userReducer.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeReviewCard)