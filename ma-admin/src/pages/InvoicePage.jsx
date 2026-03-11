import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const InvoiceGenerator = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [taxPercent, setTaxPercent] = useState(0);
  const [items, setItems] = useState([{ 
    mode: 'service', // 'service' or 'custom'
    category: '', 
    serviceId: '', 
    description: '', 
    price: 0, 
    count: 1 
  }]);

  const [formErrors, setFormErrors] = useState({});

  // API data states
  const [categories, setCategories] = useState([]);
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(false);

  // Get values from .env
  const companyName = import.meta.env.VITE_COMPANY_NAME;
  const companyAddress = import.meta.env.VITE_COMPANY_ADDRESS;
  const companyCity = import.meta.env.VITE_COMPANY_CITY;
  const companyPhone = import.meta.env.VITE_COMPANY_PHONE;
  const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
  
  const primaryColor = import.meta.env.VITE_PRIMARY_COLOR;
  const secondaryColor = import.meta.env.VITE_SECONDARY_COLOR;
  const accentColor = import.meta.env.VITE_ACCENT_COLOR;
  const borderColor = import.meta.env.VITE_BORDER_COLOR;

  // API base URL - update this to your backend URL
  const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/invoices/categories`);
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // Fetch services when category is selected
  const fetchServicesByCategory = async (category) => {
    if (servicesByCategory[category]) {
      return; // Already fetched
    }

    try {
      const response = await fetch(`${API_BASE_URL}/invoices/category/${encodeURIComponent(category)}`);
      const result = await response.json();
      
      if (result.success) {
        setServicesByCategory(prev => ({
          ...prev,
          [category]: result.data
        }));
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Failed to load services');
    }
  };

  const addItem = () => {
    setItems([...items, { 
      mode: 'service',
      category: '', 
      serviceId: '', 
      description: '', 
      price: 0, 
      count: 1 
    }]);
  };

  const toggleItemMode = (index) => {
    const newItems = [...items];
    newItems[index].mode = newItems[index].mode === 'service' ? 'custom' : 'service';
    // Reset fields when switching modes
    if (newItems[index].mode === 'custom') {
      newItems[index].category = '';
      newItems[index].serviceId = '';
    }
    setItems(newItems);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleCategoryChange = async (index, category) => {
    const newItems = [...items];
    newItems[index].category = category;
    newItems[index].serviceId = '';
    newItems[index].description = '';
    newItems[index].price = 0;
    setItems(newItems);

    // Fetch services for this category
    if (category) {
      await fetchServicesByCategory(category);
    }
  };

  const handleServiceChange = (index, serviceId) => {
    const newItems = [...items];
    const category = newItems[index].category;
    const services = servicesByCategory[category] || [];
    const selectedService = services.find(s => s._id === serviceId);

    if (selectedService) {
      newItems[index].serviceId = serviceId;
      newItems[index].description = selectedService.serviceName;
      newItems[index].price = selectedService.price;
    }
    
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const subTotal = items.reduce((acc, item) => acc + (item.price * item.count), 0);
  const taxAmount = (subTotal * taxPercent) / 100;
  const total = subTotal + taxAmount;

  // Helper to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const validateForm = () => {
    const errors = {};

    if (!customerName.trim())
      errors.customerName = "Customer name is required";

    if (!invoiceNumber.trim())
      errors.invoiceNumber = "Invoice number is required";

    if (!date)
      errors.date = "Invoice date is required";

    const validItems = items.filter(item => item.description.trim() && item.price > 0);
    if (validItems.length === 0)
      errors.items = "At least one item with a description and price is required";

    const hasEmptyItem = items.some(item => !item.description.trim() || item.price <= 0);
    if (hasEmptyItem && validItems.length > 0)
      errors.items = "All items must have a description and a price greater than 0";

    return errors;
  };

  const downloadPDF = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstKey = Object.keys(errors)[0];
      const el = document.querySelector(`[data-error="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setFormErrors({});
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPos = 20;

    const primaryRgb = hexToRgb(primaryColor);
    const secondaryRgb = hexToRgb(secondaryColor);

    // Helper function for text
    const addText = (text, x, y, options = {}) => {
      pdf.setFontSize(options.size || 10);
      pdf.setFont(options.font || 'helvetica', options.style || 'normal');
      
      if (options.color === 'primary') {
        pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      } else if (options.color === 'secondary') {
        pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
      } else if (options.color) {
        pdf.setTextColor(options.color);
      } else {
        pdf.setTextColor(0, 0, 0);
      }
      
      pdf.text(text, x, y, options.align ? { align: options.align } : undefined);
    };

    // Helper for lines
    const addLine = (x1, y1, x2, y2, width = 0.5, color = 'secondary') => {
      pdf.setLineWidth(width);
      if (color === 'primary') {
        pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
      } else {
        pdf.setDrawColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
      }
      pdf.line(x1, y1, x2, y2);
    };

    // Top brand accent line
    pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.rect(0, 0, pageWidth, 5, 'F');

    yPos = 20;

    // Header - Company Name
    addText(companyName, 20, yPos, { size: 18, style: 'bold', color: 'secondary' });
    addText('INVOICE', pageWidth - 20, yPos, { size: 24, style: 'bold', color: 'primary', align: 'right' });
    
    yPos += 8;
    pdf.setFontSize(9);
    pdf.setTextColor(102, 102, 102);
    pdf.text(companyAddress, 20, yPos);
    
    yPos += 5;
    pdf.text(companyCity, 20, yPos);
    
    yPos += 5;
    pdf.text(companyPhone, 20, yPos);
    
    if (companyEmail) {
      yPos += 5;
      pdf.text(companyEmail, 20, yPos);
    }

    // Invoice details (right side)
    const rightX = pageWidth - 20;
    let invoiceDetailY = 28;
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Invoice #: ${invoiceNumber || 'N/A'}`, rightX, invoiceDetailY, { align: 'right' });
    
    invoiceDetailY += 5;
    pdf.text(`Date: ${date || 'N/A'}`, rightX, invoiceDetailY, { align: 'right' });

    yPos += 10;
    
    // Separator line
    addLine(20, yPos, pageWidth - 20, yPos, 1.5, 'primary');
    
    yPos += 10;

    // Bill To section
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.text('BILL TO:', 20, yPos);
    
    yPos += 7;
    
    // Bill To box
    const boxHeight = 25;
    pdf.setFillColor(250, 250, 250);
    pdf.rect(20, yPos - 5, pageWidth - 40, boxHeight, 'F');
    pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.setLineWidth(0.5);
    pdf.rect(20, yPos - 5, pageWidth - 40, boxHeight);
    
    // Customer Name
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(26, 26, 26);
    pdf.text(customerName || 'Customer Name', 25, yPos);
    
    yPos += 6;
    
    // Customer Address
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    if (customerAddress) {
      pdf.text(customerAddress, 25, yPos);
    } else {
      pdf.text('Address', 25, yPos);
    }
    
    yPos += 5;
    
    // Customer Phone
    if (customerPhone) {
      pdf.text(customerPhone, 25, yPos);
    } else {
      pdf.text('Phone Number', 25, yPos);
    }
    
    yPos += 15;

    // Table Header
    const tableStartY = yPos;
    const colDesc = 20;
    const colPrice = 110;
    const colQty = 145;
    const colAmount = 165;
    
    // Header background
    pdf.setFillColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
    pdf.rect(colDesc, tableStartY, pageWidth - 40, 10, 'F');
    
    // Header text
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('DESCRIPTION', colDesc + 2, tableStartY + 6);
    pdf.text('UNIT PRICE', colPrice + 2, tableStartY + 6);
    pdf.text('QTY', colQty + 2, tableStartY + 6);
    pdf.text('AMOUNT', colAmount + 2, tableStartY + 6);
    
    yPos = tableStartY + 10;

    // Table rows
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 51, 51);
    
    items.forEach((item, index) => {
      yPos += 8;
      
      // Zebra striping
      if (index % 2 === 1) {
        pdf.setFillColor(250, 250, 250);
        pdf.rect(colDesc, yPos - 6, pageWidth - 40, 8, 'F');
      }
      
      pdf.setFontSize(9);
      pdf.text(item.description || '---', colDesc + 2, yPos);
      pdf.text(`£${item.price.toFixed(2)}`, colPrice + 2, yPos);
      pdf.text(item.count.toString(), colQty + 2, yPos);
      
      pdf.setFont('helvetica', 'bold');
      pdf.text(`£${(item.price * item.count).toFixed(2)}`, colAmount + 2, yPos);
      pdf.setFont('helvetica', 'normal');
    });
    
    yPos += 10;
    
    // Bottom border of table
    pdf.setDrawColor(224, 224, 224);
    pdf.line(colDesc, yPos, pageWidth - 20, yPos);

    yPos += 15;

    // Totals section
    const totalsX = pageWidth - 75;
    
    pdf.setFontSize(10);
    pdf.setTextColor(102, 102, 102);
    pdf.text('Subtotal:', totalsX, yPos);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`£${subTotal.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 7;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    pdf.text(`Tax (${taxPercent}%):`, totalsX, yPos);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text(`£${taxAmount.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });
    
    yPos += 10;
    
    // Total box
    const totalBoxX = totalsX - 5;
    const totalBoxY = yPos - 6;
    const totalBoxWidth = pageWidth - totalBoxX - 15;
    const totalBoxHeight = 12;
    
    pdf.setFillColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
    pdf.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, 'F');
    
    pdf.setDrawColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b);
    pdf.setLineWidth(0.5);
    pdf.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, 'S');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('TOTAL:', totalsX, yPos);
    pdf.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.text(`£${total.toFixed(2)}`, pageWidth - 20, yPos, { align: 'right' });

    yPos += 15;
    
    // Footer
    pdf.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.setLineWidth(0.5);
    pdf.line(20, yPos, pageWidth - 20, yPos);

    // Bottom brand strip
    yPos = pdf.internal.pageSize.getHeight() - 5;
    pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    pdf.rect(0, yPos, pageWidth, 5, 'F');

    // Save
    pdf.save(`Invoice_${invoiceNumber || 'Draft'}_${customerName || 'Customer'}.pdf`);
  };

  return (
    <div className="min-h-screen py-4 md:py-6 lg:py-10 px-3 md:px-4" style={{ backgroundColor: '#f5f5f5' }}>
      <div 
        className="max-w-4xl mx-auto bg-white shadow-lg p-4 md:p-8 lg:p-12 xl:p-16 border-t-4 md:border-t-8"
        style={{ 
          borderColor: primaryColor,
          fontFamily: 'Georgia, "Times New Roman", Times, serif'
        }}
      >
        {/* Header */}
        <div className="border-b-2 md:border-b-4 pb-4 md:pb-6 lg:pb-8 mb-6 md:mb-8 lg:mb-10" style={{ borderColor: primaryColor, borderBottomStyle: 'double' }}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-2">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-wide" style={{ color: secondaryColor }}>
                {companyName}
              </h1>
              <div className="text-xs md:text-sm leading-relaxed" style={{ color: accentColor }}>
                {companyAddress}<br/>
                {companyCity}<br/>
                {companyPhone}
                {companyEmail && <><br/>{companyEmail}</>}
              </div>
            </div>
            <div className="w-full md:w-auto md:text-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-5 tracking-widest" style={{ color: primaryColor }}>
                INVOICE
              </h2>
              <div className="flex flex-col gap-2">
                <div data-error="invoiceNumber" className="text-xs md:text-sm flex flex-col items-end gap-1">
                  <div className="flex items-center md:justify-end gap-2" style={{ color: accentColor }}>
                    <span className="font-bold whitespace-nowrap">Invoice #:</span>
                    <input 
                      className="px-2 py-1 border text-xs md:text-sm flex-1 md:flex-none"
                      style={{ 
                        width: '100%',
                        maxWidth: '120px',
                        borderColor: formErrors.invoiceNumber ? '#ef4444' : borderColor,
                        backgroundColor: formErrors.invoiceNumber ? '#fef2f2' : 'transparent',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      type="text" 
                      placeholder="INV-001"
                      value={invoiceNumber} 
                      onChange={(e) => { setInvoiceNumber(e.target.value); setFormErrors(p => ({...p, invoiceNumber: ''})); }} 
                    />
                  </div>
                  {formErrors.invoiceNumber && <p className="text-red-500 text-xs">{formErrors.invoiceNumber}</p>}
                </div>
                <div data-error="date" className="text-xs md:text-sm flex flex-col items-end gap-1">
                  <div className="flex items-center md:justify-end gap-2" style={{ color: accentColor }}>
                    <span className="font-bold whitespace-nowrap">Date:</span>
                    <input 
                      className="px-2 py-1 border text-xs md:text-sm flex-1 md:flex-none"
                      style={{ 
                        width: '100%',
                        maxWidth: '130px',
                        borderColor: formErrors.date ? '#ef4444' : borderColor,
                        backgroundColor: formErrors.date ? '#fef2f2' : 'transparent',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      type="date" 
                      value={date} 
                      onChange={(e) => { setDate(e.target.value); setFormErrors(p => ({...p, date: ''})); }} 
                    />
                  </div>
                  {formErrors.date && <p className="text-red-500 text-xs">{formErrors.date}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6 md:mb-8 lg:mb-10">
          <div className="text-xs md:text-sm font-bold mb-2 md:mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
            Bill To:
          </div>
          <div data-error="customerName" className="p-3 md:p-4 lg:p-5 border" style={{ backgroundColor: '#fafafa', borderColor: formErrors.customerName ? '#ef4444' : primaryColor }}>
            <input 
              placeholder="Customer Name *"
              className="w-full text-base md:text-lg font-semibold mb-1 bg-transparent border-none outline-none"
              style={{ 
                color: secondaryColor,
                fontFamily: 'Georgia, "Times New Roman", Times, serif'
              }}
              type="text" 
              value={customerName} 
              onChange={(e) => { setCustomerName(e.target.value); setFormErrors(p => ({...p, customerName: ''})); }} 
            />
            {formErrors.customerName && <p className="text-red-500 text-xs mb-1">{formErrors.customerName}</p>}
            <input 
              placeholder="Address"
              className="w-full text-xs md:text-sm mb-1.5 bg-transparent border-none outline-none"
              style={{ 
                color: accentColor,
                fontFamily: 'Georgia, "Times New Roman", Times, serif'
              }}
              type="text" 
              value={customerAddress} 
              onChange={(e) => setCustomerAddress(e.target.value)} 
            />
            <input 
              placeholder="Phone Number"
              className="w-full text-xs md:text-sm bg-transparent border-none outline-none"
              style={{ 
                color: accentColor,
                fontFamily: 'Georgia, "Times New Roman", Times, serif'
              }}
              type="text" 
              value={customerPhone} 
              onChange={(e) => setCustomerPhone(e.target.value)} 
            />
          </div>
        </div>

        {/* Items Table - Desktop View */}
        <div className="mb-6 md:mb-8 lg:mb-10 hidden lg:block">
          <table className="w-full border-2" style={{ borderColor: secondaryColor, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: secondaryColor }}>
                <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-white w-24" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Type
                </th>
                <th className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Description
                </th>
                <th className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white w-24" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Unit Price
                </th>
                <th className="px-3 py-3.5 text-center text-xs font-bold uppercase tracking-wide text-white w-20" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Qty
                </th>
                <th className="px-3 py-3.5 text-right text-xs font-bold uppercase tracking-wide text-white w-28" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Amount
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b" style={{ borderColor: borderColor }}>
                  <td className="px-3 py-3.5">
                    <button
                      onClick={() => toggleItemMode(index)}
                      className="px-3 py-1.5 text-xs font-semibold rounded border transition-colors"
                      style={{
                        backgroundColor: item.mode === 'service' ? primaryColor : '#6b7280',
                        color: '#ffffff',
                        borderColor: item.mode === 'service' ? primaryColor : '#6b7280',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                      }}
                      title={item.mode === 'service' ? 'Click to switch to Custom entry' : 'Click to switch to Service selection'}
                    >
                      {item.mode === 'service' ? 'Service' : 'Custom'}
                    </button>
                  </td>
                  <td className="px-3 py-3.5">
                    {item.mode === 'service' ? (
                      <div className="space-y-2">
                        <select
                          className="w-full outline-none border px-2 py-1 text-sm"
                          style={{ 
                            color: '#333333',
                            borderColor: borderColor,
                            fontFamily: 'Georgia, "Times New Roman", Times, serif'
                          }}
                          value={item.category}
                          onChange={(e) => handleCategoryChange(index, e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <select
                          className="w-full outline-none border px-2 py-1 text-sm"
                          style={{ 
                            color: '#333333',
                            borderColor: borderColor,
                            fontFamily: 'Georgia, "Times New Roman", Times, serif'
                          }}
                          value={item.serviceId}
                          onChange={(e) => handleServiceChange(index, e.target.value)}
                          disabled={!item.category}
                        >
                          <option value="">Select Service</option>
                          {item.category && servicesByCategory[item.category]?.map((service) => (
                            <option key={service._id} value={service._id}>
                              {service.serviceName}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <input 
                        className="w-full outline-none border px-2 py-1 text-sm"
                        style={{ 
                          color: '#333333',
                          borderColor: borderColor,
                          fontFamily: 'Georgia, "Times New Roman", Times, serif'
                        }}
                        placeholder="Item or service description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      />
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span className="text-sm" style={{ color: accentColor }}>£</span>
                    <input 
                      className="w-16 text-right outline-none border-none text-sm"
                      style={{ 
                        color: '#333333',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <input 
                      className="w-12 text-center outline-none border-none text-sm"
                      style={{ 
                        color: '#333333',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}
                      type="number"
                      value={item.count}
                      onChange={(e) => handleItemChange(index, 'count', parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td className="px-3 py-3.5 text-right text-base font-semibold" style={{ 
                    color: secondaryColor,
                    fontFamily: 'Georgia, "Times New Roman", Times, serif'
                  }}>
                    £{(item.price * item.count).toFixed(2)}
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <button 
                      onClick={() => removeItem(index)} 
                      className="text-base px-2 transition-colors"
                      style={{ color: '#999999' }}
                      onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.target.style.color = '#999999'}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {formErrors.items && (
            <div data-error="items" className="mt-2 px-3 py-2 bg-red-50 border border-red-300 rounded text-red-600 text-xs flex items-center gap-2">
              <span>⚠</span> {formErrors.items}
            </div>
          )}
          <button 
            onClick={addItem}
            className="mt-3 px-5 py-2 text-xs font-semibold border transition-colors tracking-wide"
            style={{ 
              color: primaryColor, 
              backgroundColor: '#ffffff',
              borderColor: primaryColor,
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = primaryColor;
            }}
          >
            + ADD LINE ITEM
          </button>
        </div>

        {/* Items - Mobile & Tablet Card View */}
        <div className="mb-6 md:mb-8 lg:mb-10 block lg:hidden">
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="border-2 p-3 md:p-4 rounded" style={{ borderColor: secondaryColor }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: primaryColor }}>
                      Item {index + 1}
                    </span>
                    <button
                      onClick={() => toggleItemMode(index)}
                      className="px-2 py-1 text-xs font-semibold rounded border"
                      style={{
                        backgroundColor: item.mode === 'service' ? primaryColor : '#6b7280',
                        color: '#ffffff',
                        borderColor: item.mode === 'service' ? primaryColor : '#6b7280',
                        fontFamily: 'Arial, Helvetica, sans-serif'
                      }}
                    >
                      {item.mode === 'service' ? 'Service' : 'Custom'}
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(index)} 
                    className="text-base px-2 transition-colors"
                    style={{ color: '#999999' }}
                    onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.target.style.color = '#999999'}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  {item.mode === 'service' ? (
                    <>
                      <div>
                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Category</label>
                        <select
                          className="w-full outline-none border rounded px-3 py-2 text-sm"
                          style={{ 
                            color: '#333333',
                            borderColor: borderColor,
                            fontFamily: 'Georgia, "Times New Roman", Times, serif'
                          }}
                          value={item.category}
                          onChange={(e) => handleCategoryChange(index, e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Service</label>
                        <select
                          className="w-full outline-none border rounded px-3 py-2 text-sm"
                          style={{ 
                            color: '#333333',
                            borderColor: borderColor,
                            fontFamily: 'Georgia, "Times New Roman", Times, serif'
                          }}
                          value={item.serviceId}
                          onChange={(e) => handleServiceChange(index, e.target.value)}
                          disabled={!item.category}
                        >
                          <option value="">Select Service</option>
                          {item.category && servicesByCategory[item.category]?.map((service) => (
                            <option key={service._id} value={service._id}>
                              {service.serviceName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Description</label>
                      <input 
                        className="w-full outline-none border rounded px-3 py-2 text-sm"
                        style={{ 
                          color: '#333333',
                          borderColor: borderColor,
                          fontFamily: 'Georgia, "Times New Roman", Times, serif'
                        }}
                        placeholder="Item or service description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Unit Price</label>
                      <div className="flex items-center border rounded px-2 py-2" style={{ borderColor: borderColor }}>
                        <span className="text-xs mr-1" style={{ color: accentColor }}>£</span>
                        <input 
                          className="w-full outline-none border-none text-sm"
                          style={{ 
                            color: '#333333',
                            fontFamily: 'Georgia, "Times New Roman", Times, serif'
                          }}
                          type="number"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Qty</label>
                      <input 
                        className="w-full text-center outline-none border rounded px-2 py-2 text-sm"
                        style={{ 
                          color: '#333333',
                          borderColor: borderColor,
                          fontFamily: 'Georgia, "Times New Roman", Times, serif'
                        }}
                        type="number"
                        value={item.count}
                        onChange={(e) => handleItemChange(index, 'count', parseInt(e.target.value) || 1)}
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-semibold mb-1.5 block" style={{ color: accentColor }}>Amount</label>
                      <div className="text-sm md:text-base font-bold text-right px-2 py-2 border rounded" style={{ 
                        color: secondaryColor,
                        borderColor: borderColor,
                        backgroundColor: '#fafafa',
                        fontFamily: 'Georgia, "Times New Roman", Times, serif'
                      }}>
                        £{(item.price * item.count).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {formErrors.items && (
            <div data-error="items" className="mt-2 px-3 py-2 bg-red-50 border border-red-300 rounded text-red-600 text-xs flex items-center gap-2">
              <span>⚠</span> {formErrors.items}
            </div>
          )}
          <button 
            onClick={addItem}
            className="mt-3 w-full px-4 py-2.5 text-xs font-semibold border transition-colors tracking-wide rounded"
            style={{ 
              color: primaryColor, 
              backgroundColor: '#ffffff',
              borderColor: primaryColor,
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = primaryColor;
            }}
          >
            + ADD LINE ITEM
          </button>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-80">
            <div className="flex justify-between py-2 md:py-3 border-b text-sm md:text-base" style={{ 
              borderColor: borderColor,
              fontFamily: 'Georgia, "Times New Roman", Times, serif'
            }}>
              <span style={{ color: accentColor }}>Subtotal:</span>
              <span className="font-semibold" style={{ color: secondaryColor }}>£{subTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 md:py-3 border-b text-sm md:text-base" style={{ 
              borderColor: borderColor,
              fontFamily: 'Georgia, "Times New Roman", Times, serif'
            }}>
              <div className="flex items-center gap-2">
                <span style={{ color: accentColor }}>Tax</span>
                <input 
                  type="number" 
                  className="w-12 px-1 py-1 border text-center text-xs md:text-sm rounded"
                  style={{ 
                    borderColor: borderColor,
                    fontFamily: 'Georgia, "Times New Roman", Times, serif'
                  }}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                />
                <span style={{ color: accentColor }}>%</span>
              </div>
              <span className="font-semibold" style={{ color: secondaryColor }}>£{taxAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mt-3 px-3 md:px-4 py-3 md:py-4 rounded" style={{ 
              backgroundColor: secondaryColor,
              fontFamily: 'Georgia, "Times New Roman", Times, serif'
            }}>
              <span className="font-bold text-white text-xs md:text-sm">TOTAL:</span>
              <span className="font-bold text-xl md:text-2xl" style={{ color: primaryColor }}>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t text-center text-xs" style={{ 
          borderColor: primaryColor, 
          color: '#999999',
          fontFamily: 'Arial, Helvetica, sans-serif'
        }}>
        </div>

        {/* Download Button */}
        <div className="mt-6 md:mt-8 lg:mt-10 text-center">
          <button 
            onClick={downloadPDF}
            className="w-full md:w-auto px-8 md:px-10 py-3 md:py-3.5 text-xs md:text-sm font-bold tracking-wider shadow-md transition-colors rounded"
            style={{
              backgroundColor: primaryColor,
              color: '#ffffff',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            DOWNLOAD PDF
          </button>
        </div>

        {loading && (
          <div className="mt-4 text-center text-sm" style={{ color: accentColor }}>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceGenerator;