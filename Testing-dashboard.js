// TESTING DASHBOARD SYSTEM (INSTAGRAM-Like - Admin/QA purposes)

// MODEL FOR TEST LOGS
const TestLog = mongoose.model("TestLog", {
  testerId: String,
  module: String,        // e.g., "Reels", "DM", "Explore"
  action: String,        // e.g., "Create", "Like", "Share"
  status: String,        // "passed", "failed"
  details: String,
  createdAt: { type: Date, default: Date.now }
});

// LOG A TEST ACTION
app.post("/testing/log", async (req, res) => {
  const { testerId, module, action, status, details } = req.body;

  const log = new TestLog({ testerId, module, action, status, details });
  await log.save();

  res.json({ message: "Test logged", log });
});

// GET ALL TEST LOGS
app.get("/testing/logs", async (req, res) => {
  const logs = await TestLog.find().sort({ createdAt: -1 }).limit(100);
  res.json({ total: logs.length, logs });
});

// GET TEST LOGS BY MODULE
app.get("/testing/logs/module/:module", async (req, res) => {
  const logs = await TestLog.find({ module: req.params.module }).sort({ createdAt: -1 });
  res.json({ total: logs.length, logs });
});

// GET TEST LOGS BY STATUS
app.get("/testing/logs/status/:status", async (req, res) => {
  const logs = await TestLog.find({ status: req.params.status }).sort({ createdAt: -1 });
  res.json({ total: logs.length, logs });
});
