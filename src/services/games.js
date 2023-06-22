import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { apolloClient, provideApolloClient } from "@/config/apollo";

provideApolloClient();

const defaultReturnData = `{
  _id
  name
  image
  stockTotal
  pricePerDay
  category {
    _id
    name
  }
}`;

let REFETCH_QUERY = gql`
	query Games {
	  games ${defaultReturnData}
	}
`;

function formatResult(data) {
  const result = {};

  for (const key in data) {
    const value = data[key];

    if (value._value !== undefined) {
      result[key] = value._value;
      continue;
    }

    result[key] = value;
  }

  return result;
}

function list(returnData = defaultReturnData) {
  const GAMES_QUERY = gql`
		query Games {
		  games ${returnData}
		}
	`;
  const data = useQuery(GAMES_QUERY);

  REFETCH_QUERY = GAMES_QUERY;

  return formatResult(data);
}

function create(inputData, returnData = defaultReturnData) {
  const GAMES_MUTATION = gql`
		mutation createGame($data: GameInput!) {
		  createGame(data: $data) ${returnData}
		}
	`;

  const data = useMutation(GAMES_MUTATION, {
    variables: { data: inputData },
    update: updateCallback
  });

  function updateCallback(cache, { data: { createGame: newGame } }) {
    const cachedData = cache.readQuery({ query: REFETCH_QUERY });

    cache.writeQuery({
      query: REFETCH_QUERY,
      data: {
        ...cachedData,
        games: [...cachedData.games, newGame]
      }
    });
  }

  data.mutate();

  return formatResult(data);
}

function update(id, inputData, returnData = defaultReturnData) {
  const GAMES_MUTATION = gql`
		mutation updateGame($id: ID!, $data: GameInput!) {
		  updateGame(id: $id, data: $data) ${returnData}
		}
	`;

  const data = useMutation(GAMES_MUTATION, {
    variables: { id, data: inputData }
  });

  data.mutate();

  return formatResult(data);
}

function deleteGame(id) {
  const GAMES_MUTATION = gql`
    mutation deleteGame($id: ID!) {
      deleteGame(id: $id)
    }
  `;

  const data = useMutation(GAMES_MUTATION, {
    variables: { id },
    update: updateCallback
  });

  function updateCallback(cache) {
    cache.evict({
      _id: cache.identify({ id, __typename: "Games" })
    });
    cache.gc();
  }

  data.mutate();

  return formatResult(data);
}

const gamesService = { list, create, update, deleteGame };

export { gamesService };
