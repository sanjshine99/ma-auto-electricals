import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
    getAllCategories,
    getServicesByCategory,
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from '../controllers/InvoiceController.js';

const router = express.Router();

// Public read endpoints
router.get('/all', getAllServices);
router.get('/categories', getAllCategories);
router.get('/category/:category', getServicesByCategory);
router.get('/:serviceId', getServiceById);

// Protected write endpoints (require admin auth)
router.post('/create', authMiddleware, createService);
router.put('/update/:serviceId', authMiddleware, updateService);
router.delete('/delete/:serviceId', authMiddleware, deleteService);

export default router;
