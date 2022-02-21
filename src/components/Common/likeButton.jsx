export default function LikeButton({liked, onClick}) {

    let iconClass = "fa fa-heart"
    if(!liked) iconClass += "-o"

    return (
        <i className={iconClass} className="clickale" onClick={(c) => {onClick(c)}}></i>
    )

}