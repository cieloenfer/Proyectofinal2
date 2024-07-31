const User = require('../Dao/Models/userModel');
const multer = require('multer');
const path = require('path');
const { sendEmail } = require('../utils/email');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profile') {
      cb(null, 'public/uploads/profiles');
    } else if (file.fieldname === 'product') {
      cb(null, 'public/uploads/products');
    } else {
      cb(null, 'public/uploads/documents');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.deleteInactiveUsers = async (req, res) => {
  try {
    const cutoffDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const inactiveUsers = await User.find({ last_connection: { $lt: cutoffDate } });

    inactiveUsers.forEach(async (user) => {
      await sendEmail(user.email, 'Account Deletion', 'Your account has been deleted due to inactivity.');
      await User.findByIdAndDelete(user._id);
    });

    res.status(200).json({ message: 'Inactive users deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inactive users' });
  }
};

exports.uploadDocuments = upload.array('documents', 10), async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.files.forEach(file => {
      user.documents.push({ name: file.fieldname, reference: file.path });
    });

    await user.save();
    res.status(200).json({ message: 'Documents uploaded' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading documents' });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
    const uploadedDocuments = user.documents.map(doc => doc.name);
    const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));

    if (!hasAllDocuments) {
      return res.status(400).json({ message: 'User has not uploaded all required documents' });
    }

    user.role = 'premium';
    await user.save();
    res.status(200).json({ message: 'User role updated to premium' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role' });
  }
};
