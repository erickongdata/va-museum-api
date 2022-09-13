/* eslint no-underscore-dangle: 0 */
import { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import SearchBar from '../components/SearchBar';
import LoadingGraphic from '../components/LoadingGraphic';
import Gallery from '../components/Gallery';
import GalleryPageNavigator from '../components/GalleryPageNavigator';
import StartPageGallery from '../components/StartPageGallery';
import LayoutButtons from '../components/LayoutButtons';

function Home() {
  const {
    objectData,
    isObjectDataLoaded,
    searchParams,
    setGalleryLayout,
    searchError,
  } = useContext(AppContext);

  useEffect(() => {
    document.title = `V&A ${
      searchParams.get('query') ? searchParams : 'Collection'
    }`;
  }, [searchParams]);

  const display = () => {
    if (!isObjectDataLoaded) return <LoadingGraphic />;
    if (!searchParams.get('query')) return <StartPageGallery />;
    if (objectData.records.length === 0) return null;
    return (
      <div className="display margin-top">
        <div>
          <div className="display__control">
            <h2 data-cy="object-count">{`${objectData.info.record_count} Objects`}</h2>
            <LayoutButtons
              setColumn={() => setGalleryLayout('column')}
              setList={() => setGalleryLayout('list')}
            />
          </div>
          <div className="display__inner">
            <div>
              <GalleryPageNavigator />
            </div>
            <Gallery />
            <div>
              <GalleryPageNavigator />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header>
        <div className="container search-header">
          <h1 className="title">Explore the V&A</h1>
          <SearchBar />
          <h3 className="text-center">
            Search more than 1.2 million art objects
          </h3>
          <h4 className="text-center">Bookmark your favourites</h4>
        </div>
      </header>
      <section>
        <div className="container">
          {searchError ? <p className="error-message">{searchError}</p> : null}
          {display()}
        </div>
      </section>
    </>
  );
}

export default Home;
