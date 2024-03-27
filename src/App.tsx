
import { useRef, useState, useEffect, RefObject, useCallback } from 'react';
import { IPokemon, IPokemonMove } from '../IPokemon';

export const API_URL: string = "https://pokeapi.co/api/v2/pokemon/";
const abortConroller = new AbortController();

const NO_RESULTS: string = "No Results";

function App() {

  /**
   * DOM refs
   */
  const searchBoxRef: RefObject<any> = useRef();
  const searchBtnRef: RefObject<any> = useRef();

  // flag - when search button is clicked this is set to true
  //        after async fetch has been dispatched this is reset
  const [fetchCalled, setFetchCalled] = useState(false);

  // flag - loading is set to true when a fetch will be called
  //        and is reset once the fetch promise is complete
  const [loading, setLoading] = useState(false);

  // string - set when the fetch returns an unexpected result from
  //          from the server
  const [error, setError] = useState("");

  // flag - when a fetch returns a 404, that means there are no results
  const [noResults, setNoResults] = useState(false);

  // array - in case the API changes to support multiple results,
  //         this component would still work
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  // flag - used to prevent calling fetch before component is mounted
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
      // prevent fetch when `fetchCalled` is set back to false;
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

    const fetchUrl: string = `${API_URL}${searchTerm.toLowerCase()}`;
    // console.log(fetchUrl);

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
        // console.log(result);

        if (result === NO_RESULTS) {
          setNoResults(true); // render "Empty State" (no results)
          setPokemonList([]); // no pokenmon rendered
          setError("");       // no error message
        }
        else {
          // I didn't realize the API would only ever return one Pokemon.
          // Since Pokemon is both singular and plural, and there are
          // over 1000 pokemon, I made the wrong assumtion under the time
          // pressure.  I thought a search would act like a filter and yield
          // multiple results.
          setPokemonList(Array.isArray(result) ? result : [result]);  // render Pokemon Data
          setNoResults(false);  // clear empty state
          setError("");         // clear error
        }
      })

      .catch((e) => {

        console.error(e);
        setError(e);

      }).finally(() => {

        // console.log("loading is false");
        setLoading(false);

      });

    // after fetch request has been dispatched, set to false, 
    // the "loading" flag will handle the rest
    setFetchCalled(false);
  }

  const renderMovesList = useCallback((pokemon: IPokemon) => {
    return (
      <>
        <h2>Moves</h2>
        <ul data-testid='pokemon-moves' className='moves-list'>
          {
            pokemon.moves.sort((a, b) => {
              return a.move.name <= b.move.name ? -1 : 1;
            }).map(
              ($move, index) => {
                const move = $move.move;
                return (
                  // This is extra
                  <li className="move" key={ index }
                    onMouseOver={ (e) => {
                      // console.log(`window.innerWidth - e.clientX = ${window.innerWidth - e.clientX}`);
                      if (window.innerWidth - e.clientX < 220) {
                        e.currentTarget.lastElementChild?.classList.add('left');
                      }
                      else if (e.clientX < 220) {
                        e.currentTarget.lastElementChild?.classList.add('right');
                      }
                      e.currentTarget.lastElementChild?.classList.add('show');
                    } }

                    onMouseOut={ (e) => { e.currentTarget.lastElementChild?.classList.remove('show', 'left', 'right') } }>
                    { move.name }
                    <LearningInfo $move={ $move } />
                  </li>
                );
              })
          }
        </ul>
      </>
    )
  }, [pokemonList]);

  const renderPokemonList = useCallback(() => {

    const list = pokemonList.map((pokemon: IPokemon, index) => {
      // console.log(index);
      // console.log(pokemon);
      return (
        <div key={ 'poke' + index } data-testid="pokemon-result" className="pokemon-card">
          <div>
            <h1 data-testid="pokemon-name" className="pokemon-name rounded">{ pokemon.name }</h1>
          </div>
          <div className='picture-wrapper rounded'>
            <img data-testid="pokemon-image" className="pokemon-image"
              src={ `${pokemon.sprites?.front_default ?? ''}` }
              alt="no image" />
          </div>
          { renderMovesList(pokemon) }
        </div >
      );
    })

    return list;
  }, [pokemonList]);


  const searchClick = useCallback(() => {
    if (!searchBoxRef.current.value) {
      return
    };
    setFetchCalled(true);
  }, []);

  return (
    <>
      <header data-testid="header">The Definitive Rx Pokedex <span style={ { fontSize: "2.4rem" } }>Front-End</span> <span style={ { fontSize: "1.8rem" } }>(tribute)</span></header>
      <div className='form-wrapper'>
        <input data-testid="search-input" id="Search" type='text' ref={ searchBoxRef }
          placeholder='enter a pokemon name'
          onFocus={ () => {
            // when focused, pressing enter will trigger the search
            window.onkeydown = (e) => { if (e.key === "Enter") { searchClick() } }
          } }
          onBlur={ () => {
            window.onkeydown = null;
          } }

        />
        <button data-testid="search-button" id="Button" ref={ searchBtnRef } onClick={ searchClick } disabled={ loading }>{ loading ? 'Loading' : 'Search' }</button>
        { error &&
          <h3 data-testid="error-state" className='error'>{ "Error:" + error }</h3>
        }
      </div>

      { pokemonList && pokemonList.length > 0 && renderPokemonList() }
      { noResults &&

        <div data-testid="empty-state" className="empty"><h1>{ NO_RESULTS }</h1></div>
      }
    </>
  );
}

export default App;


const LearningInfo = (props: { $move: IPokemonMove }) => {
  const { $move } = props;
  const move = $move.move;
  return (
    <div className='hover-tip'>
      <h4>{ move.name }</h4>
      <h4>( Learning Info )</h4>
      <table>
        <thead>
          <tr>
            <th>Version</th>
            <th>Level</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          { $move.version_group_details.sort((a, b) => {
            // sort by game version, level learned ascending 
            if (a.version_group.name < b.version_group.name) {
              return -1;
            }
            else if (a.version_group.name === b.version_group.name) {
              return (a.level_learned_at < b.level_learned_at) ? -1 : 1;
            }
            else {
              return 1;
            }
          }).map((detail, index) => {
            return (
              <tr key={ index + 'r' }>
                <td key={ index + 'c' }>{ detail.version_group.name }</td>
                <td key={ index + 'a' }>{ detail.level_learned_at }</td>
                <td key={ index + 'b' }>{ detail.move_learn_method.name }</td>
              </tr>
            );
          })
          }
        </tbody>
      </table>

    </div>
  );
}
