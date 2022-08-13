import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "test1234" })
    .expect(201);
});

it("returns 1 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "testtest.com", password: "test1234" })
    .expect(400);
});

it("disalllows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "test1234" })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "test1234" })
    .expect(400);
});
