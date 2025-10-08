import Contact from "../models/Contacts.js";

export const contactController = async (req, res) => {
  const { fullName, email, subject, company, message } = req.body;

  try {
    if (!fullName || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "All star marked fields are mandatory." });
    }

    if (message.length < 20) {
      return res.status(400).json({
        message: "Pls make your message more longer so we can understand.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const contact = new Contact({
      email,
      fullName,
      subject,
      company,
      message,
    });

    if (contact) {
      const savedDetails = contact.save();

      res.status(201).json({
        message: `Will get back to you ${(await savedDetails).fullName}!`,
      });
    } else {
      res.status(400).json({ message: "Something is missing" });
    }
  } catch (error) {
    console.log("Error in contact controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
