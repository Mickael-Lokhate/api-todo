import request from "supertest";
import app from "../server/server.js";

describe("Testing Categories requests", () => {
  it("Should get all categories with id, name, color", async () => {
    const res = await request(app)
      .post("/api")
      .send({ query: "{categories {id,name,color}}" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("categories");
    expect(res.body.data.categories).toBeInstanceOf(Array);
    expect(res.body.data.categories).not.toBeNull();
    expect(res.body.data.categories[0]).not.toBeNull();
    expect(res.body.data.categories[0]).toHaveProperty("id");
    expect(res.body.data.categories[0]).toHaveProperty("name");
    expect(res.body.data.categories[0]).toHaveProperty("color");
  });

  it("Should get all categories with id only", async () => {
    const res = await request(app)
      .post("/api")
      .send({ query: "{categories {id}}" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("categories");
    expect(res.body.data.categories).toBeInstanceOf(Array);
    expect(res.body.data.categories).not.toBeNull();
    expect(res.body.data.categories[0]).not.toBeNull();
    expect(res.body.data.categories[0]).toHaveProperty("id");
    expect(res.body.data.categories[0]).not.toHaveProperty("name");
    expect(res.body.data.categories[0]).not.toHaveProperty("color");
  });

  it("Should get one category 0 with id, name, color", async () => {
    const res = await request(app)
      .post("/api")
      .send({
        query:
          "query Category($id: Int!) { category(id: $id) { id, name, color } }",
        variables: { id: 0 },
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("category");
    expect(res.body.data.category).not.toBeNull();
    expect(res.body.data.category).toHaveProperty("id");
    expect(res.body.data.category.id).toEqual(0);
    expect(res.body.data.category).toHaveProperty("name");
    expect(res.body.data.category).toHaveProperty("color");
  });

  it("Should get category 1 with id only", async () => {
    const res = await request(app)
      .post("/api")
      .send({
        query: "query Category($id: Int!) { category(id: $id) { id } }",
        variables: { id: 1 },
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("category");
    expect(res.body.data.category).not.toBeNull();
    expect(res.body.data.category).toHaveProperty("id");
    expect(res.body.data.category.id).toEqual(1);
    expect(res.body.data.category).not.toHaveProperty("name");
    expect(res.body.data.category).not.toHaveProperty("color");
  });
});
