import request from "supertest";
import chai from "chai";
import app from "../server.js";
import { reverseText } from "../controllers/controllers.js";

const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;

describe("GET /apihost/iecho/:text", () => {
  it("reply with a string", (done) => {
    request(app)
      .get("/apihost/iecho/camilo")
      .set("Accept", "application/json")
      .expect('"olimac"')
      .expect(200, done());
  });
});

describe("Testing function reverseText", function () {
  describe("Check reverseText Function", function () {
    it("Check the returned value using : assert.equal(value, value): ", function () {
      const result = reverseText("lora");
      assert.equal(result, "arol");
    });

    it("Check the returned value using : assert.equal(value, value): ", function () {
      const result = reverseText(0);
      assert.equal(result, "no es un texto");
    });
  });
});
