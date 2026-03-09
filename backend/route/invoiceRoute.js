import express from 'express';
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


router.get('/all', getAllServices);
router.get('/categories', getAllCategories);
router.get('/category/:category', getServicesByCategory);
router.get('/:serviceId', getServiceById);


router.post('/create', createService);
router.put('/update/:serviceId', updateService);


router.delete('/delete/:serviceId', deleteService);

export default router;