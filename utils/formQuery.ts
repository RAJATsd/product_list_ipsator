const formQuery = (paramsArray: { key: string; value: string }[]) => {
  const queryParams = new URLSearchParams();

  for (let param of paramsArray) {
    queryParams.append(param.key, param.value);
  }

  return queryParams.toString();
};

export default formQuery;
