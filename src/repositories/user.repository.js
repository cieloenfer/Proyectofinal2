const UserDAO = require('../Dao/user.dao');

class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async createUser(userData) {
        return await this.dao.createUser(userData);
    }

    async getUserById(userId) {
        return await this.dao.getUserById(userId);
    }

    async updateUserById(userId, updateData) {
        return await this.dao.updateUserById(userId, updateData);
    }
}

module.exports = UserRepository;
