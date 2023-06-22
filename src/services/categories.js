import gql from "graphql-tag";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { apolloClient, provideApolloClient } from "@/config/apollo";

provideApolloClient();

const defaultReturnData = `{
  _id
  name
}`;

let REFETCH_QUERY = gql`
	query categories {
	  categories ${defaultReturnData}
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
  const CATEGORIES_QUERY = gql`
		query categories {
		  categories ${returnData}
		}
	`;
  const data = useQuery(CATEGORIES_QUERY);

  REFETCH_QUERY = CATEGORIES_QUERY;

  return formatResult(data);
}

function save(inputData, returnData = defaultReturnData) {
  const CATEGORIES_MUTATION = gql`
		mutation saveCategory($data: CategoryInput!) {
		  saveCategory(data: $data) ${returnData}
		}
	`;

  const data = useMutation(CATEGORIES_MUTATION, {
    variables: { data: inputData },
    update: updateCallback
  });

  function updateCallback(cache, { data: { saveCategory: newCategory } }) {
    const cachedData = cache.readQuery({ query: REFETCH_QUERY });

    for (const category of cachedData.categories) {
      if (category._id === newCategory._id) return;
    }

    cache.writeQuery({
      query: REFETCH_QUERY,
      data: {
        categories: [...cachedData.categories, newCategory]
      }
    });
  }

  data.mutate();

  return formatResult(data);
}

function deleteCategory(id) {
  const CATEGORIES_MUTATION = gql`
    mutation deleteCategory($id: ID!) {
      deleteCategory(id: $id)
    }
  `;

  const data = useMutation(CATEGORIES_MUTATION, {
    variables: { id },
    update: updateCallback
  });

  function updateCallback(cache) {
    cache.evict({
      _id: cache.identify({ id, __typename: "Category" })
    });
    cache.gc();
  }

  data.mutate();

  return formatResult(data);
}

const categoriesService = { list, save, deleteCategory };

export { categoriesService };
