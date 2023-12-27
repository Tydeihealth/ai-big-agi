import axios from 'axios';

const MAUD_DATA_ES_ENDPOINT = '...'; // your endpoint URL

interface SearchQuery {
  match_phrase: {
    [key: string]: string;
  };
}

export async function getMaudESData({ query }: { query: SearchQuery }): Promise<any> {
  const response = await axios.post(MAUD_DATA_ES_ENDPOINT, { query });
  return response.data ? response.data : null;
}
