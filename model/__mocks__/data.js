const contacts = [
  {
    _id: "604cec2a45d8c632bc1fake1",
    name: "FAKE-ONE",
    phone: "0915088491",
    subscription: "free",
  },
  {
    _id: "604cec3345d8c632bc1fake2",
    name: "FAKE-SECOND",
    phone: "0914088491",
    subscription: "free",
  },
  {
    _id: "604cec3345d8c632bc1fake3",
    name: "FAKE-SECOND",
    phone: "0914088491",
    subscription: "free",
  },
];
const newContact = {
  name: "newUser",
  phone: "9810088491",
  subscription: "free",
};

const User = {
  subscription: "free",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNGUzMTY4YTA1ZDNkMzQzMDBjMDA0ZiIsImlhdCI6MTYxNTczNzIyNSwiZXhwIjoxNjE1NzQ0NDI1fQ.8byA4KylqGkp9j9AV1eqL1EogAA0VDxr2GbBB7YIkoA",
  _id: "604cec3345d8c632bc1fake2",
  email: "12345678@gmail.com",
  password: "$2a$08$7Ri2ggA1VXgal7.MUrnRa.rS1lja0y6j0VRQMu495ssO5PFyQ1hQO",
  avatarUrl:
    "https://s.gravatar.com/avatar/0ffd40d14c2320ab59aa28ff91e8d813?s=250",
};

const users = [];
users[0] = User;

const newUser = { email: "newuser@gmail.com", password: "newUser" };

module.exports = { contacts, newContact, users, User, newUser };
