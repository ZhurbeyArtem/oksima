import request from "supertest";
import app from "../index";

describe("auth API", () => {
  it("should login", async () => {
    try {
      const res = await request(app).post("/api/users/login").send({
        email: "test@gmail.com",
        password: "test1234",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body.user.email).toEqual("test@gmail.com");
    } catch (error) {
      console.error("Error in test:", error);
      throw error;
    }
  });
  it("should register", async () => {
    try {
      const res = await request(app).post("/api/users/registration").send({
        email: "admin@gmail.com",
        password: "admin123",
        firstName: "artem",
        lastName: "zhurbei",
        role: "manager",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual("admin@gmail.com");
    } catch (error) {
      console.error("Error in test:", error);
      throw error;
    }
  });
});
