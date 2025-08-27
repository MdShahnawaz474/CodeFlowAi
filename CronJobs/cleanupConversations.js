const cron = require("node-cron");
const Conversation = require("../models/Conversation");

// Run job every day at midnight
cron.schedule("0 0 * * *", async () => {
    // cron.schedule("* * * * *", async () => {
        console.log("🧹 Running cleanup job for old conversations...");
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

  try {
    const result = await Conversation.deleteMany({ startTime: { $lt: cutoff } });
    console.log(`🗑️ Deleted ${result.deletedCount} old conversations`);
  } catch (err) {
    console.error("❌ Error deleting old conversations:", err);
  }
});

