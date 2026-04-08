const nodemailer = require("nodemailer");

async function testMail() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shabber12396@gmail.com",
      pass: "eifkvjojsukiajzx",
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"Test App" <shabber12396@gmail.com>',
      to: "shabber12396@gmail.com",
      subject: "Test Email",
      text: "Hello from Node.js!",
    });
    console.log("✅ Mail sent:", info.response);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

testMail();
