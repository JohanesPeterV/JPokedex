import React,{useState, useEffect} from "react";

import {gql, useQuery} from '@apollo/client';
import PokemonCard from "../../Components/PokemonCard/PokemonCard";
import './FavPage.scss';
import { Card,  Grid,  Header,  Label,  Pagination,  Placeholder, Search, Segment } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { css } from "@emotion/css";
function FavPage(){

    
    const [page, setPage]=useState(0);
    
    var maxPage;
    const POKEMON_QUERY=gql`
    query pokemons{
        pokemons(limit: 9999, offset: 0) {
            count
            next
            previous
            status
            message
            results {
              url
              name
              image
            }
          }
      }
    `;

    const{loading ,error, data}=useQuery(POKEMON_QUERY,{
        variables:{
            limit:30,
            offset:page*30
        }
    });
    function test(){
        var row=[];
    
        for(let i=0;i<localStorage.length;i++){
        
            row.push(<PokemonCard pokemon='loading'/>);
        }
        return row;
    }
    if(loading)return <div id="list-page">

    <Card.Group doubling itemsPerRow={8} className="card-container">
    {
        test()
    }
    </Card.Group>
        <div  className="center-flex">
    
        </div>

</div>;
    maxPage=Math.round(data.pokemons.count/30);
    let pokemons=data.pokemons.results;
    function nextPage(){
        if(page<maxPage)
        setPage(page+1);
    }
    function prevPage(){
        if(page>0)setPage(page+1);
    }

    return (

        <div id="list-page">
            <Card.Group doubling itemsPerRow={8} className="card-container">
                {pokemons?.map(pokemon=>{
                    let temp=localStorage.getItem(pokemon.name);
                    
                    if(temp!=null){
                        return <PokemonCard key={pokemon.name} pokemon={pokemon}/>;
                    }
                    else {
                        <>;</>
                    }
                })}
            </Card.Group>
        </div>
    );




}


export default FavPage





