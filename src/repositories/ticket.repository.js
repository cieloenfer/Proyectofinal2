const TicketDAO = require('../Dao/ticket.dao');

class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async createTicket(ticketData) {
        return await this.dao.createTicket(ticketData);
    }
}

module.exports = TicketRepository;
