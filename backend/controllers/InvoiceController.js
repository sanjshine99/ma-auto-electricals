import Invoice from "../models/Invoice.js";

export const getAllCategories = async (req, res) => {
  try {
    
    const categories = await Invoice.distinct('category');
    res.json({
      success: true,
      data: categories.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

export const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Invoice.find({ category }).sort({ serviceName: 1 });
    
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};


export const getAllServices = async (req, res) => {
  try {
    const services = await Invoice.find().sort({ category: 1, serviceName: 1 });
    
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};


export const getServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Invoice.findById(serviceId);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
};


export const createService = async (req, res) => {
  try {
    const { category, serviceName, price } = req.body;
    const service = await Invoice.create({
      category,
      serviceName,
      price
    });
    
    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    });
  }
};


export const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { category, serviceName, price } = req.body;
    
    const service = await Invoice.findByIdAndUpdate(
      serviceId,
      { category, serviceName, price },
      { new: true, runValidators: true }
    );
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};


export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Invoice.findByIdAndDelete(serviceId);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};