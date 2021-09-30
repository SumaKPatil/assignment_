export const clientSearch = (data, name, searchQuery) => {
  const _searchQuery = searchQuery.toLowerCase();
  const pattern = `(?=,*${_searchQuery})`;
  const regex = new RegExp(`${pattern}`, "g");
  return data?.filter((eachData) => regex.test(eachData[name]?.toLowerCase()));
};
