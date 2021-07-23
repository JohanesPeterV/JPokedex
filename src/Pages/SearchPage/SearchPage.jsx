import React,{useState, useEffect} from "react"

import {gql, useQuery} from '@apollo/client';
import PokemonCard from "../../Components/PokemonCard/PokemonCard";
import './SearchPage.scss';
import { Card,  Grid,  Header,  Icon,  Image,  Label,  Placeholder, Search, Segment } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import { css } from "@emotion/css";
import _ from "lodash";


function SearchPage(){

    
    const [displayPokemons, setDisplayPokemon]=useState([]);
    
    var maxPage;
    let searchString='';
    const POKEMON_QUERY=gql`
    query pokemons {
        pokemons(limit: 999999, offset: 0) {
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
    `

    const{loading ,error, data}=useQuery(POKEMON_QUERY,{

    })

    if(loading)return <div id="list-page" >
     <div className={css`
            display:flex;
            align-items:center;
            justify-content:center;
            padding: 1% 0;
            background-color: #1b1c1d;
            width:100%;

            
        `}>
            <div className={css`
            display:flex;                    
            align-items:center;
            justify-content:flex-end;
            padding: 1% 0;
        `}>
                <Search
                onClick={()=>{}}
                icon={null}
                size="small"/>
                <div className={css`
                    position:absolute;
                `}>
                    <Icon 
                    className={css`cursor:pointer;`}
                    onClick={()=>{
                        setDisplayPokemon(pokemons.filter((pokemon)=>{
                            return pokemon.name.includes(searchString);
                        }));
                    }} name='search'/>
                </div>
            </div>
            
        </div>
</div>
    
   
    maxPage=Math.round(data.pokemons.count/18);
    console.log(maxPage);
    console.log(data);
    let pokemons=data.pokemons.results;
    let searchValue=''
    const initialState = {
        loading: false,
        results: [],
        value: '',
    };
    function searchReducer(state, action) {
        switch (action.type) {
          case 'CLEAN_QUERY':
            return initialState
          case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }
          case 'FINISH_SEARCH':
            return { ...state, loading: false, results: action.results }
          case 'UPDATE_SELECTION':
            searchString=action.selection;
      
            return { ...state, value: action.selection }
          default:
            throw new Error()
        }
      }
      const resultRenderer = ({ name }) => <Label content={name} />
      
    function SearchPokemon() {
    const [state, dispatch] = React.useReducer(searchReducer, initialState)
    const { loading, results, value } = state
    
    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
      clearTimeout(timeoutRef.current)
      searchString=data.value;
      dispatch({ type: 'START_SEARCH', query: data.value })
  
      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: 'CLEAN_QUERY' })
          return
        }
  
        const re = new RegExp(_.escapeRegExp(data.value), 'i')
        const isMatch = (result) => re.test(result.name)
  
        dispatch({
          type: 'FINISH_SEARCH',
          results: _.filter(pokemons, isMatch),
        })
      }, 300)
    }, [])
    React.useEffect(() => {
      return () => {
        clearTimeout(timeoutRef.current)
      }
    }, [])
  
    return (
        <div className={css`
            display:flex;
            align-items:center;
            justify-content:center;
            padding: 1% 0;
            background-color: #1b1c1d;
            width:100%;

        `}>
            <div className={css`
            display:flex;                    
            align-items:center;
            justify-content:flex-end;
            padding: 1% 0;
        `}>
                <Search
                loading={loading}
                onResultSelect={(e, data) =>dispatch({ type: 'UPDATE_SELECTION', selection: data.result.name })}
                onSearchChange={handleSearchChange}
                resultRenderer={resultRenderer}
                results={results}
                value={value}
                icon={null}
                size="small"/>
                <div className={css`
                    position:absolute;
                `}>
                    <Icon 
                    className={css`cursor:pointer;`}
                    onClick={()=>{
                        setDisplayPokemon(pokemons.filter((pokemon)=>{
                            return pokemon.name.includes(searchString);
                        }));
                    }} name='search'/>
                </div>
            </div>
            
        </div>


        
    )
  }


    return (
        
        <div id="list-page">
            <SearchPokemon/>            
            <Card.Group doubling itemsPerRow={8} className={"card-container "+css`
              height:100vw;
              
              `}>
                {displayPokemons?.map(pokemon=>{
                    return <PokemonCard key={pokemon.name} pokemon={pokemon}/>
                })}
            </Card.Group>
        </div>
        
    )




}


export default SearchPage