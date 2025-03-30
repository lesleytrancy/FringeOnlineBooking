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

// 🌐 Public Booking Portal Routes

/**
 * @swagger
 * /:
 *   get:
 *     summary: API homepage health status (HTML UI)
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: Health HTML page loaded
 */
router.get('/', HealthController.status);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: API service health check (JSON)
 *     tags: [Monitoring]
 *     responses:
 *       200:
 *         description: Health OK
 *       503:
 *         description: Service unavailable
 */
router.get('/health', HealthController.checkStatus);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/auth/register', UserAuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login for public users
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/auth/login', UserAuthController.login);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get list of all public events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get('/events', PublicEventController.listEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event details by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details returned
 */
router.get('/events/:id', PublicEventController.getEventDetails);

/**
 * @swagger
 * /events/{id}/seats:
 *   get:
 *     summary: Get seat map for a specific event
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat map returned
 */
router.get('/events/:id/seats', BookingController.getSeatMap);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Book tickets for an event
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *               userId:
 *                 type: string
 *               seats:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/bookings', BookingController.bookTicket);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking details by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details returned
 */
router.get('/bookings/:id', BookingController.getBookingDetails);

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Process payment for a booking
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Payment successful
 */
router.post('/payments', PaymentController.processPayment);

// 🔒 Admin Portal Routes

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin Auth]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/admin/login', AdminAuthController.login);

/**
 * @swagger
 * /admin/events:
 *   get:
 *     summary: Get all events (admin)
 *     tags: [Admin - Events]
 *     responses:
 *       200:
 *         description: List of all events
 */
router.get('/admin/events', EventController.getAll);

/**
 * @swagger
 * /admin/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Admin - Events]
 *     responses:
 *       201:
 *         description: Event created
 */
router.post('/admin/events', EventController.create);

/**
 * @swagger
 * /admin/events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Admin - Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event detail
 */
router.get('/admin/events/:id', EventController.getById);

/**
 * @swagger
 * /admin/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Admin - Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event updated
 */
router.put('/admin/events/:id', EventController.update);

/**
 * @swagger
 * /admin/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Admin - Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted
 */
router.delete('/admin/events/:id', EventController.remove);

/**
 * @swagger
 * /admin/venues:
 *   get:
 *     summary: Get all venues
 *     tags: [Admin - Venues]
 *     responses:
 *       200:
 *         description: List of venues
 */
router.get('/admin/venues', VenueController.getAll);

/**
 * @swagger
 * /admin/venues:
 *   post:
 *     summary: Create a venue
 *     tags: [Admin - Venues]
 *     responses:
 *       201:
 *         description: Venue created
 */
router.post('/admin/venues', VenueController.create);

/**
 * @swagger
 * /admin/venues/{id}:
 *   get:
 *     summary: Get a venue by ID
 *     tags: [Admin - Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venue detail
 */
router.get('/admin/venues/:id', VenueController.getById);

/**
 * @swagger
 * /admin/venues/{id}:
 *   put:
 *     summary: Update a venue
 *     tags: [Admin - Venues]
 *     responses:
 *       200:
 *         description: Venue updated
 */
router.put('/admin/venues/:id', VenueController.update);

/**
 * @swagger
 * /admin/venues/{id}:
 *   delete:
 *     summary: Delete a venue
 *     tags: [Admin - Venues]
 *     responses:
 *       204:
 *         description: Venue deleted
 */
router.delete('/admin/venues/:id', VenueController.remove);

/**
 * @swagger
 * /admin/seats/{venueId}:
 *   get:
 *     summary: Get seats for a venue
 *     tags: [Admin - Seats]
 *     parameters:
 *       - in: path
 *         name: venueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat list
 */
router.get('/admin/seats/:venueId', SeatController.getByVenue);

/**
 * @swagger
 * /admin/seats:
 *   post:
 *     summary: Create new seats
 *     tags: [Admin - Seats]
 *     responses:
 *       201:
 *         description: Seats created
 */
router.post('/admin/seats', SeatController.create);

/**
 * @swagger
 * /admin/tickets/{eventId}:
 *   get:
 *     summary: Get tickets by event ID
 *     tags: [Admin - Tickets]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket list
 */
router.get('/admin/tickets/:eventId', TicketAdminController.getByEvent);

/**
 * @swagger
 * /admin/settings:
 *   get:
 *     summary: Get all system settings
 *     tags: [Admin - Settings]
 *     responses:
 *       200:
 *         description: List of settings
 */
router.get('/admin/settings', AdminSettingsController.getAll);

/**
 * @swagger
 * /admin/settings/{key}:
 *   put:
 *     summary: Update a system setting
 *     tags: [Admin - Settings]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Setting updated
 */
router.put('/admin/settings/:key', AdminSettingsController.updateSetting);

export default router;