const User = require('../models/user.model');

// Lấy danh sách người dùng và render ra view index.ejs
const list = async (req, res) => {
    try {
        const users = await User.find();  // Lấy tất cả người dùng từ MongoDB
        res.render('index', { users });   // Render ra view index.ejs và truyền danh sách users
    } catch (err) {
        res.status(500).send({ message: 'Có lỗi xảy ra khi lấy danh sách người dùng.' });
    }
};

// Hiển thị form thêm người dùng mới (add.ejs)
const showAddForm = (req, res) => {
    res.render('add');  // Render ra view add.ejs
};

// Thêm người dùng mới vào CSDL
const add = async (req, res) => {
    const { name, email, age, address } = req.body;
    const newUser = new User({ name, email, age, address });

    try {
        await newUser.save();  // Lưu người dùng mới vào MongoDB
        res.redirect('/');     // Sau khi thêm xong, quay về trang danh sách
    } catch (err) {
        res.status(400).send({ message: 'Có lỗi xảy ra khi thêm người dùng.' });
    }
};

// Hiển thị form chỉnh sửa người dùng (edit.ejs)
const showEditForm = async (req, res) => {
    const userId = req.params.id;  // Lấy ID của người dùng từ URL
    try {
        const user = await User.findById(userId);  // Tìm người dùng theo ID
        if (!user) return res.status(404).send({ message: 'Người dùng không tồn tại.' });
        res.render('edit', { user });  // Render ra view edit.ejs với thông tin người dùng
    } catch (err) {
        res.status(500).send({ message: 'Có lỗi xảy ra khi hiển thị form chỉnh sửa.' });
    }
};

// Cập nhật thông tin người dùng
const edit = async (req, res) => {
    // const userId = req.params.id;  // Lấy ID của người dùng từ URL
    // const { name, email, age, address } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedUser) return res.status(404).send({ message: 'Người dùng không tồn tại.' });
        res.redirect('/');  // Sau khi cập nhật xong, quay về trang danh sách
    } catch (err) {
        res.status(400).send({ message: 'Có lỗi xảy ra khi cập nhật người dùng.' });
    }
};

// Xóa người dùng
const del = async (req, res) => {
    const userId = req.params.id;  // Lấy ID của người dùng từ URL

    try {
        const deletedUser = await User.findByIdAndDelete(userId);  // Xóa người dùng
        if (!deletedUser) return res.status(404).send({ message: 'Người dùng không tồn tại.' });
        res.redirect('/');  // Sau khi xóa xong, quay về trang danh sách
    } catch (err) {
        res.status(500).send({ message: 'Có lỗi xảy ra khi xóa người dùng.' });
    }
};

module.exports = {list, showAddForm, add, showEditForm,edit, del}
