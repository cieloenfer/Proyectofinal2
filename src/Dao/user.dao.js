const User = require('../Models/user.model');

class UserDAO {
    async createUser(userData) {
        try {
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error('Error al crear usuario en la base de datos');
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            throw new Error('Error al obtener usuario por ID desde la base de datos');
        }
    }

    async updateUserById(userId, updateData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error('Error al actualizar usuario en la base de datos');
        }
    }
}

module.exports = UserDAO;
