import { useState } from "react";
import { Route, Switch } from "react-router";
import {  Container, Menu, Segment, Visibility } from "semantic-ui-react";
import FavPage from "../FavPage/FavPage";
import ListPage from "../ListPage/ListPage";
import PokemonDetail from "../PokemonDetailPage/PokemonDetail";
import SearchPage from "../SearchPage/SearchPage";


function Desktop(){

    const [fixed,setFixed]=useState(false);

    function hideFixedMenu ()  {
        setFixed(false)
        
    }

    function showFixedMenu ()  {
        setFixed(true)
        
    }
    return (
    <div>
      <Visibility
      once={false}
      onBottomPassed={showFixedMenu}
      onBottomPassedReverse={hideFixedMenu}
    >
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 80, padding: '1em 0em' }}
        vertical
      >
        <Menu
          fixed={fixed ? 'top' : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size='large'
        >
          <Container>
            <Switch>
              
            <Route path='/pokemon'>
              <Menu.Item as='a' href='../'>List</Menu.Item>
              <Menu.Item as='a' href='../search'>Search</Menu.Item>
              <Menu.Item as='a' href='../favorites'>Favorites</Menu.Item>
            </Route>
            <Route path='/favorites'>
              <Menu.Item as='a' href='../'>List</Menu.Item>
              <Menu.Item as='a' href='../search'>Search</Menu.Item>
              <Menu.Item as='a' active href='../favorites'>Favorites</Menu.Item>
            </Route>
            <Route path='/search'>
              <Menu.Item as='a' href='../'>List</Menu.Item>
              <Menu.Item as='a' active href='../search'>Search</Menu.Item>
              <Menu.Item as='a' href='../favorites'>Favorites</Menu.Item>
            </Route>
            <Route path='/'>
              <Menu.Item as='a' active href='../'>List</Menu.Item>
              <Menu.Item as='a' href='../search'>Search</Menu.Item>
              <Menu.Item as='a' href='../favorites'>Favorites</Menu.Item>
            </Route>
            
          </Switch>
          </Container>
        </Menu>
      </Segment>
      
    </Visibility>
      <Switch>
          <Route path='/favorites'>
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
    </div>
    )
}


export default Desktop