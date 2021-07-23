import {Link} from 'react-router-dom';
import './PokemonCard.scss';
import { Card, Icon, Image, Placeholder } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useState } from 'react';
import { css } from '@emotion/css';
function PokemonCard(props){

    const [loaded,setLoaded]=useState(false);
    const [like,setLike]=useState(false);
    
    let poke=props.pokemon;
    let loading=poke==='loading';
    
    
    let liked=false;
    if(!loading){
        liked=localStorage.getItem(poke.name)!=null;
    }
    

    return (
    <div className="card bg-surface "key={poke.name} style={{ textDecoration:'none'}}>
        <Card key={poke.name} className={"full bg-surface "+css`
            overflow:hidden;

        `}>
            {!loaded||loading?<Placeholder className='ph-image'>
            <Placeholder.Image square className='ph-image'/>
            </Placeholder>:<div></div>
            }
            {loading?<div></div>:
                <div className={'poke-image '+css`
                    
                `}>
                    <Link  to={`./pokemon/${poke.name}`} >
                    <Image src={poke.image}  onLoad={()=>setLoaded(true)} className='poke-image'  alt='Failed to load'/>
                    </Link>
                    
                </div>
            }
            <Card.Content className="bg-surface full center-flex">
            {loading?
                        <Placeholder className="ph center-flex">
                            <Placeholder.Header className="ph center-flex">
                                <Placeholder.Line className="ph center-flex" length='long' />
                            </Placeholder.Header>
                        </Placeholder>
                        :
                        <div className="full txt-primary center-flex">
                            <Card.Header className="full center-flex"><h4>{poke.name}</h4></Card.Header>

                                <div className={css`
                            
                        `} >

                            {
                                loading?<></>:<Icon name='like' color={like||liked?"red":"grey"} className={css`
                                
                                `} onClick={()=>{
                                    if(!liked&&!like){
                                        localStorage.setItem(poke.name,0);                                        
                                    }else{
                                        localStorage.removeItem(poke.name);
                                    }
    
                                    setLike(!like);
    
                                }} />
                            }
                        </div>
                        </div> 
                    }
                </Card.Content>
            </Card>
        </div>
   
    

    );
}




export default PokemonCard