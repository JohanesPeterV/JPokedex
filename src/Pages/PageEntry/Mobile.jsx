import { css, cx } from '@emotion/css'
import { useState } from "react";
import { Redirect } from 'react-router';
import { Link, Route, Router, Switch } from 'react-router-dom';
import { Button, Container, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import FavPage from '../FavPage/FavPage';
import ListPage from '../ListPage/ListPage';
import PokemonDetail from '../PokemonDetailPage/PokemonDetail';
import SearchPage from '../SearchPage/SearchPage';



function Mobile(){

    const [sidebarOpened,setSidebar]=useState(false);

    function handleSidebarHide ()  {
        setSidebar(false)
    }

    function handleToggle ()  {
        setSidebar(true)
    }
    return (
      
      <Sidebar.Pushable>
      
       <Sidebar
       as={Menu}
       animation='overlay'
       inverted
       onHide={handleSidebarHide}
       vertical
       visible={sidebarOpened}
       width='thin'
       

       
     >

       <Menu.Item as='a' href='./'>List</Menu.Item>
       <Menu.Item as='a' href='./search'>Search</Menu.Item>        
       <Menu.Item as='a' href='./favorites'>Favorites</Menu.Item>
     </Sidebar>

     

     <Sidebar.Pusher dimmed={sidebarOpened}>
       <Segment
         inverted
         textAlign='center'
         style={{ minHeight: 80, padding: '1em 0em' }}
         vertical
         color='black'
       >
         <Container>
           <Menu inverted pointing secondary size='large'>

             <Menu.Item onClick={handleToggle}>
             <Icon name='sidebar' />
             </Menu.Item>

           </Menu>
         </Container>
       </Segment>
         <Switch>

         <Route path='/favourites'>
           
           <FavPage/>
         </Route>
         <Route path='/pokemon/:name'>
           <PokemonDetail/>
           
         </Route>
         <Route path='/search'>
         
           <SearchPage/>
        

         </Route>
         <Route path='/'>
           <ListPage/>
         </Route>
       </Switch>
     </Sidebar.Pusher>
   </Sidebar.Pushable>
   
    

    )
}


export default Mobile