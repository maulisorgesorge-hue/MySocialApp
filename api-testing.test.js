const request = require("supertest");
const mongoose = require("mongoose");
// आपकी मुख्य app फाइल यहाँ से आएगी
const app = require("./server"); 

describe("🚀 Instagram Clone - API Integration Tests", () => {
  let postId = "";

  // टेस्ट शुरू होने से पहले DB कनेक्शन
  beforeAll(async () => {
    const url = process.env.MONGO_TEST_URI || "mongodb://127.0.0.1:27017/testdb";
    await mongoose.connect(url);
  });

  // सारे टेस्ट होने के बाद कनेक्शन बंद और सफाई
  afterAll(async () => {
    await mongoose.connection.db.dropDatabase(); // टेस्ट डेटा डिलीट करना अच्छी प्रैक्टिस है
    await mongoose.connection.close();
  });

  // 1. CREATE POST TEST
  test("Should create a new post", async () => {
    const res = await request(app)
      .post("/api/post")
      .send({
        userId: "tester_1",
        image: "https://test.com/photo.jpg",
        caption: "Automation testing is cool!"
      });

    expect(res.statusCode).toBe(201); // 201 Created is better
    expect(res.body).toHaveProperty("_id");
    postId = res.body._id; // अगले टेस्ट के लिए ID सेव की
  });

  // 2. LIKE SYSTEM TEST
  test("Should toggle like on a post", async () => {
    // Like करना
    const resLike = await request(app)
      .post(`/api/like/${postId}`)
      .send({ userId: "tester_1" });
    
    expect(resLike.body.likes).toContain("tester_1");

    // Unlike करना (दोबारा कॉल करके)
    const resUnlike = await request(app)
      .post(`/api/like/${postId}`)
      .send({ userId: "tester_1" });
    
    expect(resUnlike.body.likes).not.toContain("tester_1");
  });

  // 3. COMMENT SYSTEM TEST
  test("Should add a comment to the post", async () => {
    const res = await request(app)
      .post(`/api/comment/${postId}`)
      .send({
        userId: "tester_2",
        text: "Automated comment check ✅"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.comments.some(c => c.text === "Automated comment check ✅")).toBe(true);
  });
});
