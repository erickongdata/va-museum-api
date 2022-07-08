import { useContext } from 'react';
import { AppContext } from '../AppContext';
import SearchBar from '../components/SearchBar';

function Home() {
  const { searchTerm } = useContext(AppContext);
  return (
    <div>
      <SearchBar />
      <div>{searchTerm}</div>
    </div>
  );
}

export default Home;
