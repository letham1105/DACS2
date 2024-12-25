import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Ví dụ: bạn có thể sử dụng Gmail hoặc dịch vụ SMTP khác
  auth: {
    user: process.env.EMAIL_USER, // Tài khoản email
    pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (có thể tạo trong Google nếu sử dụng Gmail)
  },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Tài khoản email gửi
    to: to, // Địa chỉ email người nhận
    subject: subject, // Tiêu đề email
    text: text, // Nội dung email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
