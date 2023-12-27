// eperiment to bring in ES search into the chat app

import { GetServerSideProps, NextPage } from 'next';
import { getMaudESData } from 'lib/esdata';

// Assuming the shape of your data, you might need to adjust the type accordingly
interface Data {
  // Define the structure of your data here
}

interface ResultsPageProps {
  data: Data;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.query as string;

  // Call your API function to fetch data based on the search term
  const data: Data = await getMaudESData({ query: { match_phrase: { "search_field": query } } });

  return {
    props: { data },
  };
}

const ResultsPage: NextPage<ResultsPageProps> = ({ data }) => {
  return (
    <div>
      {/* Render your search results here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ResultsPage;
