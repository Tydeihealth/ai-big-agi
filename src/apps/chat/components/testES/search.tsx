// Experiment to bring ES search into the chat app

// pages/search.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface SearchResult {
  _id: string;
  _source: {
    referencenumber: string;
    // Add other fields from your Elasticsearch data
  };
}

interface SearchResults {
  hits: {
    hits: SearchResult[];
  };
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<SearchResults>('/api/search', { searchTerm });
      setResults(response.data.hits.hits);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reference Number</th>
            {/* Add more headers based on your data */}
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td>{result._id}</td>
            <td>{result._source.referencenumber}</td>
              {/* Render other fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPage;
