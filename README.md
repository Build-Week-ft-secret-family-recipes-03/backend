# Secret Family Recipes API

## Host - https://ft-secret-family-recipes.herokuapp.com/

Backend API for Secret Family Recipes

## Description

Implements a full authentication/authorization system along with endpoints to produce each CRUD operation to a database

### Stack

- Node.JS
- Express.JS
- JWT (JSON Web Tokens)
- BCrypt
- KnexJS
- PostgreSQL

## API Endpoints

#### [GET] /api/users

Returns every user in the database.

#### [GET] /api/users/:id

Returns user by their ID in the database.

#### [POST] /auth/register

Expects first_name, last_name, username, and password to be in body for request to be successful.

```
{
    "first_name":"jan",
    "last_name":"doe",
    "username": "jan123",
    "password": "123"
}
```

#### [POST] /auth/login

Expects username and password to be in body. Credentials must match someone within the database for request to be successful. Returns token with data from logged in user.

```
{
    "username": "johndoe123",
    "password": "123"
}
```

#### [POST] /api/recipes

Expects token to be in body. The token used here should be the token given out by the login endpoint. If proper token is received, client should get an array of objects with all their recipes like so:

```
[
    {
        "title": "grilled cheese",
        "username": "johndoe123",
        "source": "family recipe",
        "pic_url": "",
        "category": "snack",
        "ingredients": [
            "bread",
            "cheese",
            "butter"
        ]
    },
    {
        "title": "quesadilla",
        "username": "johndoe123",
        "source": "online",
        "pic_url": "",
        "category": "lunch",
        "ingredients": [
            "cheese",
            "tortilla"
        ]
    }
]

```

#### [POST] /api/recipes/create

Expects a body with a token from that user, a title, source, pic_url, category, and an ingredients array.

```
{
    "token": "token",
    "title": "milkshake",
    "source": "grannys recipe",
    "pic_url": "",
    "category": "drink",
    "ingredients": [
        "milk",
        "banana",
        "oats"
    ]
}
```

#### [PUT] /api/recipes/edit/:id

Expects the exact same body that the create endpoint above expects.

#### [DELETE] /api/recipes/delete/:id

Expects body to have token for the users information.
