const jwt = require("jsonwebtoken");
require("dotenv").config();
const request = require("supertest");
const { User, contacts, newContact } = require("../model/__mocks__/data");
const app = require("../app");

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;
const wrongId = "lol";
const wrongToken = "lol";
const contact = contacts[0];

jest.mock("../model/contact.js");
jest.mock("../model/user.js");

describe("Test for route /api/contacts", () => {
  describe("should handle request PUT contact by id ", () => {
    it("should return 200 on request PUT  contact", async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ phone: "0995688412" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(200);
      done();
    });
    it("should return 404 on request PUT  contacts by id", async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${wrongId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Grigore" });
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return 403 on request on request PUT  contacts by id without token", async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${wrongToken}`)
        .send({ name: "Grigore" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(403);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return 500 on request on request PUT  with wrong filed", async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ WrongField: "Grigore" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(500);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("should handle GET request", () => {
    it("should return 200 on GET request All contacts", async (done) => {
      const res = await request(app)
        .get(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });
    it("should return 403 on GET request All contacts by wrong  token", async (done) => {
      const res = await request(app)
        .get(`/api/contacts`)
        .set("Authorization", `Bearer ${wrongToken}`);
      expect(res.status).toEqual(403);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return 200 on request GET  contact by ID", async (done) => {
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toHaveProperty("_id");
      expect(res.body.data.contact._id).toBe(contact._id);
      done();
    });
    it("should return 403 on GET request GET  contact by ID by wrong  token", async (done) => {
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${wrongToken}`);
      expect(res.status).toEqual(403);
      expect(res.body).toBeDefined();
      done();
    });

    it("should return 404 on request GET  contact by wrong ID", async (done) => {
      const res = await request(app)
        .get(`/api/contacts/${wrongId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("should handle POST request", () => {
    it("should return 201 on request POST  create new contact", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send(newContact)
        .set("Accept", "application/json");
      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return 500 on request POST  with wrong field or fields", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send({ ...newContact, wrongFiled: "axe" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(500);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return 500 on request POST without required fields like : name,email,phone,password,subscription", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Simon" })
        .set("Accept", "application/json");
      expect(res.status).toEqual(500);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return 403 on request POST without token", async (done) => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set("Authorization", `Bearer ${wrongToken}`)
        .send(newContact)
        .set("Accept", "application/json");
      expect(res.status).toEqual(403);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("should handle request DELETE contact by id ", () => {
    it("should return 201 on request DELETE  contact", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      contacts.pop(contact);
      done();
    });
    it("should return 404 on request DELETE  contacts by id", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/${wrongId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
    it("should return 403 on request on request DELETE  contacts by id without token", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${wrongToken}`);
      expect(res.status).toEqual(403);
      expect(res.body).toBeDefined();
      done();
    });
  });
});
