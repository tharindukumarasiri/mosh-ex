export default function LikeButton({liked, onClick}) {

    let iconClass = "clickale fa fa-heart"
    if(!liked) iconClass += "-o"

    return (
        <i className={iconClass} onClick={(c) => {onClick(c)}}></i>
    )

}