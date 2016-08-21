'use strict';

const sanitizeCustomer = (customer) => {
  delete customer.admin;
  delete customer.createdAt;
  delete customer.deleted;
  delete customer.hashedPassword;
  delete customer.updatedAt;

  return customer;
};

const processShipAddress = (cust) => {
  if (!cust.shipFirstName) {
    cust.shipFirstName = cust.firstName;
  }

  if (!cust.shipLastName) {
    cust.shipLastName = cust.lastName;
  }

  if (!cust.shipAddressLine1) {
    cust.shipAddressLine1 = cust.addressLine1;
  }

  if (!cust.shipAddressLine2) {
    cust.shipAddressLine2 = cust.addressLine2;
  }

  if (!cust.shipAddressCity) {
    cust.shipAddressCity = cust.addressCity;
  }

  if (!cust.shipAddressState) {
    cust.shipAddressState = cust.addressState;
  }

  if (!cust.shipAddressZip) {
    cust.shipAddressZip = cust.addressZip;
  }

  if (!cust.shipAddressCountry) {
    cust.shipAddressCountry = cust.addressCountry;
  }

  return cust;
};

const verifySameAddress = (primary, ship) => {
  if (primary.addressLine1 !== ship.addressLine1) {
    return false;
  }

  if (primary.addressLine2 !== ship.addressLine2) {
    return false;
  }

  if (primary.addressCity !== ship.addressCity) {
    return false;
  }

  if (primary.addressState !== ship.addressState) {
    return false;
  }

  if (primary.addressZip !== ship.addressZip) {
    return false;
  }

  if (primary.addressCountry !== ship.addressCountry) {
    return false;
  }

  return true;
};

const getPrimaryAddress = (cust) => {
  const address = {
    addressLine1: cust.addressLine1,
    addressLine2: cust.addressLine2,
    addressCity: cust.addressCity,
    addressState: cust.addressState,
    addressZip: cust.addressZip,
    addressCountry: cust.addressCountry
  };

  return address;
};

const getShipAddress = (cust) => {
  const address = {
    addressLine1: cust.shipAddressLine1,
    addressLine2: cust.shipAddressLine2,
    addressCity: cust.shipAddressCity,
    addressState: cust.shipAddressState,
    addressZip: cust.shipAddressZip,
    addressCountry: cust.shipAddressCountry
  };

  return address;
};

const embedAddresses = (cust, primaryAddress, shipAddress) => {
  cust.addressLine1 = primaryAddress.addressLine1;
  cust.addressLine2 = primaryAddress.addressLine2;
  cust.addressCity = primaryAddress.addressCity;
  cust.addressState = primaryAddress.addressState;
  cust.addressZip = primaryAddress.addressZip;
  cust.addressCountry = primaryAddress.addressCountry;

  cust.shipAddressLine1 = shipAddress.addressLine1;
  cust.shipAddressLine2 = shipAddress.addressLine2;
  cust.shipAddressCity = shipAddress.addressCity;
  cust.shipAddressState = shipAddress.addressState;
  cust.shipAddressZip = shipAddress.addressZip;
  cust.shipAddressCountry = shipAddress.addressCountry;
};

const mergeAddresses = (exist, primary, ship) => {
  if (!primary.addressLine1) {
    primary.addressLine1 = exist.addressLine1;
  }

  if (!primary.addressLine2) {
    primary.addressLine2 = exist.addressLine2;
  }

  if (!primary.addressCity) {
    primary.addressCity = exist.addressCity;
  }

  if (!primary.addressState) {
    primary.addressState = exist.addressState;
  }

  if (!primary.addressZip) {
    primary.addressZip = exist.addressZip;
  }

  if (!primary.addressCountry) {
    primary.addressCountry = exist.addressCountry;
  }

  if (!ship.addressLine1) {
    ship.addressLine1 = exist.shipAddressLine1;
  }

  if (!ship.addressLine2) {
    ship.addressLine2 = exist.shipAddressLine2;
  }

  if (!ship.addressCity) {
    ship.addressCity = exist.shipAddressCity;
  }

  if (!ship.addressState) {
    ship.addressState = exist.shipAddressState;
  }

  if (!ship.addressZip) {
    ship.addressZip = exist.shipAddressZip;
  }

  if (!ship.addressCountry) {
    ship.addressCountry = exist.shipAddressCountry;
  }
};

module.exports = {
  sanitizeCustomer,
  processShipAddress,
  verifySameAddress,
  getPrimaryAddress,
  getShipAddress,
  embedAddresses,
  mergeAddresses
};
