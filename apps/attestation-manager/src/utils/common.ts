import moment from 'moment';

const calculateExpiry = (expiry: string) => {
  if (!expiry || expiry === '-1') return 'NA';

  // Adding 'expiryHours' as number of hours to the Credential Definition
  const expirationDate = moment().add(Number(expiry), 'h').toDate();

  return expirationDate;
};

export default { calculateExpiry };
