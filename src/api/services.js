import api from ".";

const ENDPOINT = {
  ACCOUNT: "/accounts",
};

const getAllAccounts = async () => {
  try {
    const accounts = await api.get(ENDPOINT.ACCOUNT);
    return accounts;
  } catch (err) {
    throw Error(err);
  }
};

const getSelectedAccount = async (slug) => {
  try {
    const selectedAccount = await api.get(
      `${ENDPOINT.ACCOUNT}?filters[slug][$eqi]=${slug}&populate=*`
    );
    return selectedAccount;
  } catch (err) {
    throw Error(err);
  }
};

export { getAllAccounts, getSelectedAccount };
