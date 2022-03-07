import { useEffect } from 'react';
import { useState } from 'react';

export default function Home(){
    useEffect(() =>{
        console.log(">>>>>>>>>>")
        setFf(console.log("setState"))
    },[]);
    console.log("RRRRRRRRRRRRR1")
const[ff, setFf] = useState(console.log("useStatw"))
console.log("RRRR22222222")


    console.log("RRRRRRRRRRRRR333333333333333")

    return(
        <p>Homes</p>
    )
}