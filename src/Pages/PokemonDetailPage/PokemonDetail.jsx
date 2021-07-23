
import { gql, useQuery } from '@apollo/client';
import { css } from '@emotion/css';
import {  useState } from 'react';
import { useParams } from 'react-router';
import {  Header,  Table } from 'semantic-ui-react';
import './PokemonDetail.scss';

function PokemonDetail(){
    const [width, setWidth] = useState(window.innerWidth);

    let{name}=useParams();
    // const [pokemon,setPokemon]=useState();

    const POKEMON_QUERY=gql`
      query pokemon($name: String!) {
          pokemon(name: $name) {
            id
            name
            types{
              type{
                name
              }
            }
            
		height
    weight
    abilities{
      ability{
        name
      }
    }
            sprites {
              front_default
              front_shiny
              back_default
              back_shiny
            }        
            stats{
              base_stat

              stat{
                name
              }
              
            }
            moves {
              move {
                name
              }
            }
            types {
              type {
                name
              }
            }
          }
        }
    `;
    const{loading , error, data}=useQuery(POKEMON_QUERY,{
      variables:{
          name:name
      }
    });
    

    // var mobile = (width <= 768);
    if(loading)return(
      <div></div>
    );
    console.log(data);
    let pokemon=data.pokemon;
    return(
      <div className={css`
        display:flex;
        width:100%;
        height:100%;
        flex-direction:column;
        align-items:center;
        justify-content:center;
      `}>
        
        <div className="image-container">
          <img src={pokemon.sprites.front_default} alt="Failed to load" />
          <img src={pokemon.sprites.front_shiny} alt="Failed to load" />
        </div>
      <div className="tables-container">
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell><h3>Attributes</h3></Table.HeaderCell>
                <Table.HeaderCell><h3>Description</h3></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image >
                        
                    <Header.Content>
                      <h3>Pokemon</h3>
                      
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                <h3 className={css`display:flex;`}>{pokemon.name}
                              {pokemon.types?.map((type)=>{
                            return (
                            <div className={type.type.name+' '+css`
                              padding: 0 2vw;
                              display:flex;
                              color:var(--txt-sec);
                              justify-content:center;
                              
                              margin: 0 0 0 5px ;
                              font-size:min(max(0.8rem, 2vw), 18px);
                            `}>

                              {type.type.name}
                            </div>)
                        })}
                      </h3>
                  </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header  as='h4'>
                    <Header.Content>
                      <h3>
                        Abilities
                      </h3>

                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                <h3 className={css`display:flex;`}>
                              {pokemon.abilities?.map((ability)=>{
                            return (
                            <div className={css`
                              padding: 0 2vw;
                              display:flex;
                              background-color:var(--bg-surface);
                              justify-content:center;
                              margin: 0 5px 0 0 ;
                              font-size:min(max(0.6rem, 1.6vw), 14px);

                            `}>
                              {ability.ability.name} 
                            </div>)
                        })}
                      </h3>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header  as='h4' >
                    <Header.Content>
                    <h3>Height</h3>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.height}</h3></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' >
                    <Header.Content>
                    <h3>Weight</h3>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.weight}</h3></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table celled >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell><h3>Stats</h3></Table.HeaderCell>
                <Table.HeaderCell><h3>Value</h3></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image >
                        
                    <Header.Content>
                      <h3>{pokemon.stats[0].stat.name}</h3>
                      
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.stats[0].base_stat}</h3></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header  as='h4'>
                    <Header.Content>
                      <h3>
                      {pokemon.stats[1].stat.name}
                      </h3>

                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.stats[1].base_stat}</h3>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header  as='h4' >
                    <Header.Content>
                    <h3>{pokemon.stats[2].stat.name}</h3>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.stats[2].base_stat}</h3></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' >
                    <Header.Content>
                    <h3>{pokemon.stats[3].stat.name}</h3>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.stats[3].base_stat}</h3></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' >
                    <Header.Content>
                    <h3>{pokemon.stats[4].stat.name}</h3>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.stats[4].base_stat}</h3></Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Header as='h4' >
                    <Header.Content>
                    <h3>{pokemon.stats[5].stat.name}</h3>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell><h3>{pokemon.stats[5].base_stat}</h3></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div className={css`
            
          `}>
          </div>
        </div>
        
        </div>
    );  
    
}

export default PokemonDetail

