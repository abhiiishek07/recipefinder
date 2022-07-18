import React from 'react'
import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import styled from 'styled-components';

function Recipe() {
    const [details,setDetails] = useState({});
    const [activeTab,setActiveTab] = useState("instructions");

    let params =useParams();
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        setDetails(detailData);
    }
 useEffect(()=>{
    fetchDetails();
 },[params.id]);

  return (
    <DetailWrapper>
        <ImgWrapper>
            <h2>{details.title}</h2>
            <img src={details.image} alt=""/>
        </ImgWrapper>
        <Info>
            <Button className={activeTab === "instructions"?'active':""}   onClick={()=> setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab === "ingredients"?'active':""} onClick={()=> setActiveTab("ingredients")}>Ingredients</Button>
            {activeTab==='instructions' && 
             <div>
                <h2 dangerouslySetInnerHTML={{__html: details.summary}}></h2>
                <h4 dangerouslySetInnerHTML={{__html: details.instructions}}></h4>
             </div>
            }
            {activeTab==='ingredients' && 
            <div>
            <ul>
                {details.extendedIngredients.map((ingredients)=>(
                    <li key={ingredients.id}>{ingredients.original}</li>
                ))}
            </ul>
            </div>
}
        </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
    margin-top: 4rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
    h4 {
        margin-top: 2rem;
    }
`
const ImgWrapper = styled.div`
    width: 50%;
    img {
        width: 100%;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 1rem;
    margin-bottom: 2rem;
    font-weight: 600;
    cursor: pointer;
`
const Info = styled.div`
    margin-left: 5rem;
    width: 50%;
`

export default Recipe