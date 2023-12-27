// pages/api/search.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface SearchRequest {
  searchTerm: string;
}

interface ElasticsearchResponse {
  // Define the structure of your Elasticsearch response here
  hits: {
    hits: Array<any>; // Replace 'any' with a more specific type if possible
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { searchTerm } = req.body as SearchRequest;
      const response = await axios.get<ElasticsearchResponse>('https://ddf5334afb3a42199ee7772ee0a700e6.us-east-1.aws.found.io:9243/', {
        params: { q: searchTerm },
      });
      res.status(200).json(response.data);
    } catch (error) {
    res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
