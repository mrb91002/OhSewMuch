-----------------------Site Description-----------------------------------------
#Oh Sew Much
A transactional retail site geared toward women who are in the market to purchase a handmade toy as a gift for a young child.

Primary user Jeanette. Jeanette is paranoid and doesn't want to sign in to the site or receive our intrusive newsletter. She will still be able to purchase her handmade toys without logging in, but if she does log in, she will receive points towards discounts on future purchases and many many offers to sign up to our news letter.

A logged in user will have access to their order history. A user will only be logged in from the landing page - via a view my order history button - or through the purchase summary page.

---------------------------API--------------------------------------------------
API: Address verification - free verification anywhere in the US.

Lob API home page and API docs
https://lob.com/

API library for Node.js
https://github.com/lob/lob-node

test apikey: test_4f2a9a1e1ceb3697e262fa8cf5500ca9913
live apikey:

Verify an address
Validates a given address.

ARGUMENTS

name:
optional
address_line1:
optional
address_line2:
optional
address_city:
optional
address_state:
optional
address_zip:
optional
address_country:
optional
Must be a 2 letter country short-name code (ISO 3166)

RETURNS

Returns the validated address object. If there is only a partial match and more information is required (e.g. Apt#, etc), a message string with more information will also be returned.
test_4e00b94a3f4e72376756182a0e2ffaca055

curl https://api.lob.com/v1/verify \
  -u test_4e00b94a3f4e72376756182a0e2ffaca055: \
  -d "address_line1=185 Berry Street" \
  -d "address_city=San Francisco" \
  -d "address_state=CA" \
  -d "address_zip=94107"

Sample invalid response:
{
    "address": {
        "address_line1": "185 BERRY ST",
        "address_line2": "",
        "address_city": "SAN FRANCISCO",
        "address_state": "CA",
        "address_zip": "94107-5705",
        "address_country": "US",
        "object": "address"
    },
    "message": "Default address: The address you entered was found but more information is needed (such as an apartment, suite, or box number) to match to a specific address."
}

curl https://api.lob.com/v1/verify \
  -u test_4e00b94a3f4e72376756182a0e2ffaca055: \
  -d "address_line1=6821 S Gove St" \
  -d "address_city=Tacoma" \
  -d "address_state=WA" \
  -d "address_zip=98409"

Sample valid response:
{
    "address": {
        "address_line1": "6821 S GOVE ST",
        "address_line2": "",
        "address_city": "TACOMA",
        "address_state": "WA",
        "address_zip": "98409-1549",
        "address_country": "US",
        "object": "address"
    }
}

Node callback syntax:
Lob.verification.verify({
  address_line1: '185 Berry Street',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94107'
}, function (err, res) {
  console.log (err, res);
});

Node Promise syntax:
Lob.verification.verify({
  address_line1: '185 Berry Street',
  address_city: 'San Francisco',
  address_state: 'CA',
  address_zip: '94107'
})
.then((address) => {
  res.send(address);
})
.catch((err) => {
  next(err);
})

----------------------------------Database--------------------------------------
ERD: Relatations
customers, orders, products, orders_products, categories, product_images, promos, product_prices

customers:
id - primary key
created_at - timestamp
updated_at - timestamp
user_name - varchar(60) - nullable
hashed_password - char(60) - nullable
address_line1 - varchar(255) - required
address_line2 - varchar(255) - nullable
address_city - varchar(255) - required
address_state - char(2) - required
address_zip - varchar(255) - required
address_country (US ONLY) 2 letter code - char(2) - required
first_name - varchar(255) - required
last_name - varchar(255) - required
phone - varchar(255) - required
email - varchar(255) - required
ship_first_name - varchar(255) - required
ship_last_name - varchar(255) - required
ship_address_line1 - varchar(255) - required
ship_address_line2 - varchar(255) - required
ship_address_city - varchar(255) - required
ship_address_state - char(2) - required
ship_address_zip - varchar(255) - required
ship_address_country (US ONLY) - char(2)
deleted - timestamp

orders:
id - primary key
created_at - timestamp
updated_at - timestamp
customer_id - foreign key
ship_type_id - foreign key
promo_id - foreign key
shipped_date - timestamp
ship_first_name - varchar(255) - required
ship_last_name - varchar(255) - required
ship_address_line1 - varchar(255) - required
ship_address_line2 - varchar(255) nullable
ship_address_city - varchar(255) - required
ship_address_state - char(2) - required
ship_address_zip - varchar(255) - required
ship_address_country (US ONLY) - char(2)
cancelled - timestamp

products:
id - primary key
created_at - timestamp
updated_at - timestamp
category - varchar(255) - from embedded array
product_price_id - foreign key
name - varChar(255)
description - text
units_in_stock - integer required
deleted - timestamp

product_prices:
id - primary key
created_at - timestamp
updated_at - timestamp
product_id - foreign key
price - float precision 2 decimals
deleted - timestamp

order_products:
id - primary key
order_id - foreign key
product_id - foreign key
product_price_id - foreign key

product_images:
id - primary key
product_id - foreign key
created_at - timestamp
updated_at - timestamp
display_order - integer - required
image_url - varchar(255) url
alt_text - varchar(255), max 40

promos:
id - primary key
promo_code - unique - required
product_id - foreign key - nullable (null indicates apply to order)
created_at - timestamp
updated_at - timestamp
expires_at - timestamp required
discount_rate - float between 0 exclusive and 1 inclusive - required

shippers:
id - primary key
created_at - timestamp
updated_at - timestamp
name - string
deleted - timestamp

ship_types:
id - primary key
created_at - timestamp
updated_at - timestamp
shipper_id - foreign key
type - varchar(255)
price - float(8,2)
deleted - timestamps

-----------------------Modified Database----------------------------------------
ERD: Relatations
customers, orders, products, orders_products, product_images, promos

customers: - migration 1
id - primary key
created_at - timestamp
updated_at - timestamp
first_name - varchar(255) - required
last_name - varchar(255) - required
phone - varchar(255) - required
email - varchar(255) - required
user_name - varchar(255) - required (default to email address for no signin)
hashed_password - char(60) - nullable
admin - boolean - required - default to false
address_line1 - varchar(255) - required
address_line2 - varchar(255) - nullable
address_city - varchar(255) - required
address_state - char(2) - required
address_zip - varchar(255) - required
address_country (US ONLY) 2 letter code - char(2) - required
ship_first_name - varchar(255) - required
ship_last_name - varchar(255) - required
ship_address_line1 - varchar(255) - required
ship_address_line2 - varchar(255) - required
ship_address_city - varchar(255) - required
ship_address_state - char(2) - required
ship_address_zip - varchar(10) - required
ship_address_country (US ONLY) - char(2)
deleted - timestamp

products: - migration 2
id - primary key
created_at - timestamp
updated_at - timestamp
category - varchar(255) - from embedded array - required
price - float(8,2) - required
name - varChar(255)
description - text
dimensions - varChar(255) - notNullable - default to ''
units_in_stock - integer required - negative ok
deleted - timestamp

promos: - migration 3
id - primary key
product_id - foreign key - nullable (null means apply to order)
created_at - timestamp
updated_at - timestamp
expires_at - timestamp required
promo_code - unique - required
discount_rate - float(8,4) limit between 0 exclusive and 1 inclusive - required

product_images: - migration 4
id - primary key
product_id - foreign key
created_at - timestamp
updated_at - timestamp
display_order - integer - required
image_url - varchar(255) url
alt_text - varchar(50)

orders: - migration 5
id - primary key
customer_id - foreign key
promo_id - foreign key
created_at - timestamp
updated_at - timestamp
cancelled - timestamp
ship_type - varchar(255) - from embedded array - required
ship_date - timestamp
ship_first_name - varchar(255) - required
ship_last_name - varchar(255) - required
ship_address_line1 - varchar(255) - required
ship_address_line2 - varchar(255) nullable
ship_address_city - varchar(255) - required
ship_address_state - char(2) - required
ship_address_zip - varchar(10) - required
ship_address_country (US ONLY) - char(2)

orders_products: - migration 6
id - primary key
order_id - foreign key
product_id - foreign key
price - decimal(8,2) - required
--------------------------------------------------------------------------------

To login a session:
http --session guest post localhost:8000/api/token userName=guest1 password=GuestUser1!

http --session admin post localhost:8000/api/token userName=ohsewmuch password=Ohsewmuchadmin1!

To use a logged in session:
http --session guest get localhost:8000/api/customers

http --session admin get localhost:8000/api/customers

To post a customer with a un/pw:
http post localhost:8000/api/customers firstName=Chad lastName=Latham email=chadlatham33@gmail.com addressLine1='6821 S Gove St' addressCity=Tacoma addressState=WA addressZip=98409-1111 addressCountry=US shipFirstName=Chad shipLastName=Latham shipAddressLine1='6821 S Gove St' shipAddressCity=Tacoma shipAddressState=WA shipAddressZip=98409-1111 shipAddressCountry=US phone=253.335.7059 userName=guest2 password=GuestUser1!
--------------------------------------------------------------------------------

The Square API:
curl -H "Authorization: Bearer sq0atb-YNNIgBEgcqBGnmR8oU9Rbg" https://connect.squareup.com/v2/locations
http get https://connect.squareup.com/v2/locations Authorization:"Bearer sq0atb-YNNIgBEgcqBGnmR8oU9Rbg"

request_headers = {'Authorization': 'Bearer ' + access_token,
                   'Accept':        'application/json',
                   'Content-Type':  'application/json'}


--------------------------------------------------------------------------------


Hypothesis to test:
Primary user is a mother.

Users will be hesitant about giving information in registration form.

User will wonder why would I register?

Users will have trouble understanding what we do initially due to scroll height.

Users will be able to see how to login quickly.

Users will understand how to add to cart.
