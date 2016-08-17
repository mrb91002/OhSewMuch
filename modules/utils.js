'use strict';

const sanitizeCustomer = (customer) => {
  delete customer.admin;
  delete customer.createdAt;
  delete customer.deleted;
  delete customer.hashedPassword;
  delete customer.id;
  delete customer.updatedAt;

  return customer;
};

const processShipAddress = (cust) => {
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

const verifySameAddress = (cust) => {
  if (cust.addressLine1 !== cust.shipAddressLine1) {
    return false;
  }

  if (cust.addressLine2 !== cust.shipAddressLine2) {
    return false;
  }

  if (cust.addressCity !== cust.shipAddressCity) {
    return false;
  }

  if (cust.addressState !== cust.shipAddressState) {
    return false;
  }

  if (cust.addressZip !== cust.shipAddressZip) {
    return false;
  }

  if (cust.addressCountry !== cust.shipAddressCountry) {
    return false;
  }

  return true;
}

module.exports = { sanitizeCustomer, processShipAddress, verifySameAddress };
