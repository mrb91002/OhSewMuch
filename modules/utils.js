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

module.exports = { sanitizeCustomer };
