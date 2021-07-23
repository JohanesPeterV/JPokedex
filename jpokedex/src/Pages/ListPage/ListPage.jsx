import React,{useState, useEffect} from "react";

import {gql, useQuery} from '@apollo/client';
import PokemonCard from "../../Components/PokemonCard/PokemonCard";
import './ListPage.scss';
import { Card,  Grid,  Header,  Label,  Pagination,  Placeholder, Search, Segment } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { css } from "@emotion/css";
function ListPage(){

    
    const [page, setPage]=useState(0);
    
    var maxPage;
    const POKEMON_QUERY=gql`
    query pokemons($limit: Int, $offset: Int){
        pokemons(limit: $limit, offset: $offset) {
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

    if(loading)return <div id="list-page">

    <Card.Group doubling itemsPerRow={8} className="card-container">
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    <PokemonCard pokemon='loading'/>
    </Card.Group>
        <div  className="center-flex">
    <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                onPageChange={(e,page)=>{}}
                totalPages={maxPage}
            />
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
                    return <PokemonCard key={pokemon.name} pokemon={pokemon}/>;
                })}
            </Card.Group>



            <div  className={"center-flex " + css`display:flex; align-items:flex-start;height:20vh;`}>
            <Pagination
                boundaryRange={0}
                defaultActivePage={page}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={3}
                onPageChange={(e,page)=>{
                    setPage(page.activePage);}}
                totalPages={maxPage}
            />
            </div>
        </div>
        
    );




}


export default ListPage





