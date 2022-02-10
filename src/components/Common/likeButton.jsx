import { useState } from 'react'

export default function LikeButton({liked, onClick}) {

    let iconClass = "fa fa-heart"
    if(!liked) iconClass += "-o"

    return (
        <i className={iconClass} style={{cursor: 'pointer'}} onClick={(c) => {onClick(c)}}></i>
    )

}