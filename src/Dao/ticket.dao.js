const Ticket = require('../Models/ticket.model');

class TicketDAO {
    async createTicket(ticketData) {
        try {
            const newTicket = new Ticket(ticketData);
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error('Error al crear ticket en la base de datos');
        }
    }
}

module.exports = TicketDAO;
