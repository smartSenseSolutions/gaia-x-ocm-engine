const pagination = (pageSize: number, page: number) => {
  const query: {
    skip?: number;
    take?: number;
  } = {};
  if (pageSize && (page || page === 0)) {
    query.skip = page * pageSize;
    query.take = pageSize;
  } else {
    query.skip = 0;
    query.take = 1000;
  }
  return query;
};

export default pagination;
