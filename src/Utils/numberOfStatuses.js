export const NumberOfStatuses = (id, usersData, statusName) => {
  // First, filter the user data to get only records created by the specified user (with the given ID).
  const filterData = usersData?.filter((item) => item.createdBy == id);

  // Next, filter the filtered data to get only records with the specified status name.
  const superFilter = filterData?.filter((item) => item.status === statusName);

  // Return the length of the filtered array, which represents the number of matching records.
  return superFilter?.length ? superFilter?.length : 0;
};