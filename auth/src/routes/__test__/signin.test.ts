import request from "supertest";
import { app } from "../../app";

it("fails when email that does not exixts ", async () => {
  request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});
