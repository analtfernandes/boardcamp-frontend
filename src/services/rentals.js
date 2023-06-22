import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { provideApolloClient } from "@/config/apollo";
import { customersService, gamesService } from "./index";

provideApolloClient();

const defaultReturnData = `{
  _id
	rentDate
	returnDate
	daysRented
	originalPrice
	delayFee
	customer ${customersService.defaultReturnData}
	game ${gamesService.defaultReturnData}
}`;

let REFETCH_QUERY = gql`
	query rentals {
	  rentals ${defaultReturnData}
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
  const RENTALS_QUERY = gql`
		query rentals {
		  rentals ${returnData}
		}
	`;
  const data = useQuery(RENTALS_QUERY);

  REFETCH_QUERY = RENTALS_QUERY;

  return formatResult(data);
}

function getById(id, returnData = defaultReturnData) {
  const RENTALS_QUERY = gql`
		query rental {
		  rental(id: "${id}") ${returnData}
		}
	`;
  const data = useQuery(RENTALS_QUERY);

  return formatResult(data);
}

function create(inputData, returnData = defaultReturnData) {
  const RENTALS_MUTATION = gql`
		mutation createRental($data: RentalInput!) {
		  createRental(data: $data) ${returnData}
		}
	`;

  const data = useMutation(RENTALS_MUTATION, {
    variables: { data: inputData },
    update: updateCallback
  });

  function updateCallback(cache, { data: { createRental: newRental } }) {
    const cachedData = cache.readQuery({ query: REFETCH_QUERY });

    cache.writeQuery({
      query: REFETCH_QUERY,
      data: {
        rentals: [...cachedData.rentals, newRental]
      }
    });
  }

  data.mutate();

  return formatResult(data);
}

function returnRental(id, returnData = defaultReturnData) {
  const RENTALS_MUTATION = gql`
		mutation returnRental($id: ID!) {
		  returnRental(id: $id) ${returnData}
		}
	`;

  const data = useMutation(RENTALS_MUTATION, {
    variables: { id }
  });

  data.mutate();

  return formatResult(data);
}

function deleteRental(id) {
  const RENTALS_MUTATION = gql`
    mutation deleteRental($id: ID!) {
      deleteRental(id: $id)
    }
  `;

  const data = useMutation(RENTALS_MUTATION, {
    variables: { id },
    update: updateCallback
  });

  function updateCallback(cache) {
    cache.evict({
      _id: cache.identify({ id, __typename: "Rental" })
    });
    cache.gc();
  }

  data.mutate();

  return formatResult(data);
}

const rentalsService = { list, getById, create, returnRental, deleteRental, defaultReturnData };

export { rentalsService };
