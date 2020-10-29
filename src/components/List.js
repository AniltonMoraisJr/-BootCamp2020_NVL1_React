import React, { useCallback, useEffect, useState } from 'react';

import ListContext from './ListContext';

import { addNewRepository, deleteRepository, listRepositories } from '../services/repositoryService';
import ListItem from './ListItem';

const List = () => {
    const [repositoriesList, setRepositoriesList] = useState([]);

    useEffect(() => {
        async function fetchData(){
          try {
              const {data} = await listRepositories();
              setRepositoriesList(data);
          } catch (error) {
              console.error(error);
          }
        }
        fetchData();
    },[]);
    
    // Methods
    
    async function handleAddRepository() {
      try {
        const body = {
          url: "https://github.com/josepholiveira",
          title: "Desafio ReactJS",
          techs: ["React", "Node.js"],
        };
        await addNewRepository({body});
        const {data} = await listRepositories();
        setRepositoriesList(data);
      } catch (error) {
        console.error(error);
      }
    }

    const handleRemoveRepository = useCallback(async (id) => {
      try {
        await deleteRepository({id});
        const {data} = await listRepositories();
        setRepositoriesList(data);
      } catch (error) {
          console.error(error);
      }
    }, []);
    
    return (
      <>
        <ul data-testid="repository-list">
          <ListContext.Provider value={{handleRemoveRepository}}>
              {repositoriesList.length === 0 ? null : 
                  repositoriesList.map(repo => (<ListItem  key={repo.id} data={repo} />))
              }
          </ListContext.Provider>
        </ul>
        <button onClick={handleAddRepository}>Adicionar</button>
      </>
    );
}

export default List;