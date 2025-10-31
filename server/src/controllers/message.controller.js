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

    const savedDetails = await contact.save();
    res.status(201).json({
      message: `Will get back to you ${savedDetails.fullName}!`,
    });
  } catch (error) {
    console.log("Error in contact controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// 📋 Get all contact messages (for admin Messages page)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

// 🗑 Delete a contact message
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }

  
};

//  Mark message as read
// ✅ markMessageAsRead (fixed)
export const markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Contact.findByIdAndUpdate(
      id,
      { read: true },
      { new: true } // returns full updated doc
    );

    if (!updated) {
      return res.status(404).json({ message: "Message not found" });
    }

    // ✅ Send the full updated document
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error marking message as read:", err);
    res.status(500).json({ message: "Failed to update message" });
  }
};


