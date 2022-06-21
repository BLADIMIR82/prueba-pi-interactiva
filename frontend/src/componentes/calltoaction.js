import Button from "./buttom"

const CalltoAction = ()=>{
    return(
        <section className="call" style={{backgroundImage:"url(" + process.env.PUBLIC_URL+ "/imagenes/imagencalltoaction.jpg)"}}>
                <article className="article-call">
                    <div>
                        <p>Come with us and discover the most beautiful cities in the world!</p>
                             <Button />
                    </div>
                </article>
        </section>
    )



}

export default CalltoAction