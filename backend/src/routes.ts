import { Router } from 'express';

// Admin controllers
import { EventController } from './controllers/admin/EventController';
import { VenueController } from './controllers/admin/VenueController';
import { SeatController } from './controllers/admin/SeatController';
import { TicketAdminController } from './controllers/admin/TicketAdminController';
import { AdminAuthController } from './controllers/admin/AdminAuthController';
import { AdminSettingsController } from './controllers/admin/AdminSettingsController';

// Public controllers
import { PublicEventController } from './controllers/public/PublicEventController';
import { BookingController } from './controllers/public/BookingController';
import { UserAuthController } from './controllers/public/UserAuthController';
import { PaymentController } from './controllers/public/PaymentController';

import { HealthController } from './controllers/HealthController';

const router = Router();

//
// 🌐 Public Booking Portal Routes
//
/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get public events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/', HealthController.status);

router.post('/auth/register', UserAuthController.register);
router.post('/auth/login', UserAuthController.login);

router.get('/events', PublicEventController.listEvents);
router.get('/events/:id', PublicEventController.getEventDetails);

router.get('/events/:id/seats', BookingController.getSeatMap);
router.post('/bookings', BookingController.bookTicket);
router.get('/bookings/:id', BookingController.getBookingDetails);

router.post('/payments', PaymentController.processPayment);

//
// 🔒 Admin Portal Routes
//
router.post('/admin/login', AdminAuthController.login);

router.get('/admin/events', EventController.getAll);
router.post('/admin/events', EventController.create);
router.get('/admin/events/:id', EventController.getById);
router.put('/admin/events/:id', EventController.update);
router.delete('/admin/events/:id', EventController.remove);

router.get('/admin/venues', VenueController.getAll);
router.post('/admin/venues', VenueController.create);
router.get('/admin/venues/:id', VenueController.getById);
router.put('/admin/venues/:id', VenueController.update);
router.delete('/admin/venues/:id', VenueController.remove);

router.get('/admin/seats/:venueId', SeatController.getByVenue);
router.post('/admin/seats', SeatController.create);

router.get('/admin/tickets/:eventId', TicketAdminController.getByEvent);

router.get('/admin/settings', AdminSettingsController.getAll);
router.put('/admin/settings/:key', AdminSettingsController.updateSetting);

export default router;
