
import { useRef, useState, useEffect, RefObject } from 'react';
import { IPokemon } from '../IPokemon';

const API_URL: string = "https://pokeapi.co/api/v2/pokemon/";
const abortConroller = new AbortController();

const NO_RESULTS: string = "No Results";

function App() {

  const searchBoxRef: RefObject<any> = useRef();
  const searchBtnRef: RefObject<any> = useRef();

  const [fetchCalled, setFetchCalled] = useState(false);
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [noResults, setNoResults] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isMounting = useRef(false);

  useEffect(() => {
    isMounting.current = true;
  }, []);

  useEffect(() => {

    if (isMounting.current) {
      isMounting.current = false;
      return;
    }

    if (!fetchCalled) {
      // prevent fetch when `fetching` is set back to false;
      return;
    }

    if (loading) {
      abortConroller.abort("search was cancelled due to new seach");
    }
    setLoading(true);

    const searchTerm = searchBoxRef.current.value;
    fetchPokemon(searchTerm);

    return () => {
      //clean up

    }
  }, [fetchCalled]);


  const fetchPokemon = async (searchTerm: string) => {
    const signal = abortConroller.signal;

    const fetchUrl: string = `${API_URL}${searchTerm}`;
    console.log(fetchUrl);

    fetch(fetchUrl, { signal })

      .then((response: Response) => {

        if (!response.ok) {
          if (response.status === 404) {
            return (NO_RESULTS);
          }
          setError(response.statusText);
          throw new Error(response.statusText);
        }

        return response.json();
      })

      .then((result) => {
        console.log(result);

        if (result === NO_RESULTS) {
          setNoResults(true);
          setPokemonList([]);
        }
        else {
          // I didn't realize the API would only ever return one Pokemon.
          // Since Pokemon is both singular and plural, and there are
          // over 1000 pokemon, I made the wrong assumtion under the time
          // pressure.  I thought a search would act like a filter and yield
          // multiple results.
          setPokemonList(Array.isArray(result) ? result : [result]);
          setNoResults(false);
        }
      })

      .catch((e) => {
        console.log(e);
        setFetchCalled(false);
        setLoading(false);
        setError(e);

      }).finally(() => {
        setFetchCalled(false);
        setLoading(false);
      })
  }

  const renderPokemonList = () => {


    const list = pokemonList.map((pokemon: IPokemon, index) => {
      console.log(index);
      console.log(pokemon);
      return (
        <div className="pokemon-card">
          <div>
            <h1 className="pokemon-name rounded-border">{ pokemon.name }</h1>
          </div>
          <div className='picture-wrapper rounded-border'>
            <img height={ 300 } width={ 300 }
              src={ `${pokemon.sprites?.front_default ?? ''}` }
              alt="no image" />
          </div>
          <h1>Abilities</h1>
          <ul className='abilities-list'>
            {
              pokemon.moves.map(
                ($move, index) => {
                  const move = $move.move;
                  return (
                    // This is extra
                    <li className="ability" key={ index }
                      onMouseOver={ (e) => {
                        if (window.innerWidth - e.screenX < 200) {
                          e.currentTarget.lastElementChild?.classList.add('left');
                        }
                        e.currentTarget.lastElementChild?.classList.add('show');
                      } }

                      onMouseOut={ (e) => { e.currentTarget.lastElementChild?.classList.remove('show', 'left') } }>
                      •{ move.name } <ul className='hover-tip'><h4>Details: ( { move.name } )</h4>
                        { $move.version_group_details.map((detail, index) => {
                          return (
                            <>
                              <li key={ index + 'a' }>Lvl Learned: { detail.level_learned_at }</li>
                              <li key={ index + 'b' }>Learn Method: { detail.move_learn_method.name }</li>
                              <li key={ index + 'c' }>Learn Method: { detail.version_group.name }</li>
                            </>
                          );
                        })
                        }

                        <li>{ move.name }</li>
                        <li>{ move.name }</li>
                      </ul>
                    </li>
                  )
                })
            }
          </ul>
        </div >
      );
    })

    return list;
  };

  return (
    <>
      <header>The Definitive Rx Pokedex <span style={ { fontSize: "2.4rem" } }>Front-End</span> <span style={ { fontSize: "1.8rem" } }>(tribute)</span></header>
      <div className='form-wrapper'>
        <input id="Search" type='text' ref={ searchBoxRef }
          placeholder='enter a pokemon name' />
        <button id="Button" ref={ searchBtnRef } onClick={ () => {
          if (!searchBoxRef.current.value) {
            return
          };
          setFetchCalled(true);
        } } disabled={ loading }>{ loading ? 'Loading' : 'Search' }</button>
      </div>

      { error &&
        <h3 className='error'>{ "Error:" + error }</h3>
      }

      { pokemonList && pokemonList.length > 0 && renderPokemonList() }
      { noResults &&

        <div className="empty"><h1>{ NO_RESULTS }</h1></div>
      }


    </>
  );
}


export default App;
