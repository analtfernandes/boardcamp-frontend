import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { provideApolloClient } from "@/config/apollo";

provideApolloClient();

const defaultReturnData = `{
  _id
  name
  phone
  cpf
  birthday
}`;

let REFETCH_QUERY = gql`
	query Customers {
	  customers ${defaultReturnData}
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
  const CUSTOMERS_QUERY = gql`
		query Customers {
		  customers ${returnData}
		}
	`;
  const data = useQuery(CUSTOMERS_QUERY);

  REFETCH_QUERY = CUSTOMERS_QUERY;

  return formatResult(data);
}

function getById(id, returnData = defaultReturnData) {
  const CUSTOMERS_QUERY = gql`
		query Customer {
		  customer(id: "${id}") ${returnData}
		}
	`;
  const data = useQuery(CUSTOMERS_QUERY);

  return formatResult(data);
}

function create(inputData, returnData = defaultReturnData) {
  const CUSTOMERS_MUTATION = gql`
		mutation createCustomer($data: CustomerInput!) {
		  createCustomer(data: $data) ${returnData}
		}
	`;

  const data = useMutation(CUSTOMERS_MUTATION, {
    variables: { data: inputData },
    update: updateCallback
  });

  function updateCallback(cache, { data: { createCustomer: newCustomer } }) {
    const cachedData = cache.readQuery({ query: REFETCH_QUERY });

    cache.writeQuery({
      query: REFETCH_QUERY,
      data: {
        customers: [...cachedData.customers, newCustomer]
      }
    });
  }

  data.mutate();

  return formatResult(data);
}

function update(id, inputData, returnData = defaultReturnData) {
  const CUSTOMERS_MUTATION = gql`
		mutation updateCustomer($id: ID!, $data: CustomerInput!) {
		  updateCustomer(id: $id, data: $data) ${returnData}
		}
	`;

  const data = useMutation(CUSTOMERS_MUTATION, {
    variables: { id, data: inputData }
  });

  data.mutate();

  return formatResult(data);
}

function deleteCustomer(id) {
  const CUSTOMERS_MUTATION = gql`
    mutation deleteCustomer($id: ID!) {
      deleteCustomer(id: $id)
    }
  `;

  const data = useMutation(CUSTOMERS_MUTATION, {
    variables: { id },
    update: updateCallback
  });

  function updateCallback(cache) {
    cache.evict({
      _id: cache.identify({ id, __typename: "Customers" })
    });
    cache.gc();
  }

  data.mutate();

  return formatResult(data);
}

const customersService = { list, getById, create, update, deleteCustomer, defaultReturnData };

export { customersService };
