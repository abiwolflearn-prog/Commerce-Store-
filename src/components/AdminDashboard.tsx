import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Package, ShoppingBag, MessageSquare, Tag, 
  Plus, Trash, Edit3, Check, X, ArrowLeft, TrendingUp, AlertTriangle, 
  Percent, DollarSign, Users, Award, ShieldAlert, CheckCircle, RefreshCw,
  Star
} from 'lucide-react';
import { Product, Order, Review, PromoCode } from '../types';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  reviews: Record<string, Review[]>;
  setReviews: React.Dispatch<React.SetStateAction<Record<string, Review[]>>>;
  promoCodes: PromoCode[];
  setPromoCodes: React.Dispatch<React.SetStateAction<PromoCode[]>>;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export default function AdminDashboard({
  products,
  setProducts,
  orders,
  setOrders,
  reviews,
  setReviews,
  promoCodes,
  setPromoCodes,
  onClose,
  showToast
}: AdminDashboardProps) {
  // --- SUB TABS ---
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'products' | 'orders' | 'reviews' | 'promos'>('overview');

  // --- PRODUCT FORM STATE ---
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // New Product Data State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Skincare' as 'Skincare' | 'Hair Care' | 'Body Care' | 'Bundles',
    tagline: '',
    price: 0,
    volume: '',
    stock: 50,
    image: '',
    description: '',
    benefitsString: '',
    ingredients: '',
    howToUse: ''
  });

  // --- COUPLON FORM STATE ---
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  // --- DYNAMIC OVERVIEW CALCULATIONS ---
  const totalSales = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.total, 0);
  }, [orders]);

  const averageOrderValue = useMemo(() => {
    if (orders.length === 0) return 0;
    return totalSales / orders.length;
  }, [orders, totalSales]);

  const lowStockProducts = useMemo(() => {
    return products.filter(p => (p.stock ?? 0) < 15);
  }, [products]);

  // Analytics graph mock representing days of the current month
  const salesChartData = [
    { day: 'Aug 26', sales: 420 },
    { day: 'Aug 27', sales: 510 },
    { day: 'Aug 28', sales: 380 },
    { day: 'Aug 29', sales: 620 },
    { day: 'Aug 30', sales: 780 },
    { day: 'Aug 31', sales: 890 },
    { day: 'Sept 01', sales: totalSales > 0 ? Math.min(1200, totalSales) : 150 },
  ];

  const salesByCategory = useMemo(() => {
    const categories: Record<string, number> = { 'Skincare': 0, 'Hair Care': 0, 'Body Care': 0, 'Bundles': 0 };
    orders.forEach(order => {
      order.items.forEach(item => {
        const cat = item.product.category;
        if (categories[cat] !== undefined) {
          categories[cat] += item.product.price * item.quantity;
        }
      });
    });
    return categories;
  }, [orders]);

  // --- INVENTORY OPERATIONS ---
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.tagline || newProduct.price <= 0 || !newProduct.image) {
      showToast('Please fill out all required fields with valid values.');
      return;
    }

    const benefitsArray = newProduct.benefitsString
      ? newProduct.benefitsString.split(',').map(b => b.trim()).filter(Boolean)
      : ['Botanically formulated', 'Gently conditions skin', 'Cruelty-free formulation'];

    const newlyCreated: Product = {
      id: String(products.length + 101), // generate simple unique ID
      name: newProduct.name,
      category: newProduct.category,
      tagline: newProduct.tagline,
      price: Number(newProduct.price),
      rating: 5.0,
      reviewsCount: 0,
      image: newProduct.image,
      description: newProduct.description || 'A premium beauty formulation designed to nourish your natural skin elements.',
      benefits: benefitsArray,
      ingredients: newProduct.ingredients || 'Organic botanicals, Essential moisture lock factors.',
      howToUse: newProduct.howToUse || 'Gently massage a few drops onto target zones after fresh cleansing.',
      volume: newProduct.volume || '50 ml / 1.7 fl. oz',
      stock: Number(newProduct.stock)
    };

    setProducts(prev => [...prev, newlyCreated]);
    setIsAddingProduct(false);
    // Reset form
    setNewProduct({
      name: '',
      category: 'Skincare',
      tagline: '',
      price: 0,
      volume: '',
      stock: 50,
      image: '',
      description: '',
      benefitsString: '',
      ingredients: '',
      howToUse: ''
    });
    showToast(`Successfully launched "${newlyCreated.name}" to inventory!`);
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    showToast(`Updated "${editingProduct.name}" details successfully.`);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (confirm(`Are you sure you want to remove "${productName}" from Élane Beauty catalog?`)) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      showToast(`Removed "${productName}" from active catalog.`);
    }
  };

  // --- ORDER FULFILLMENT OPERATIONS ---
  const handleUpdateOrderStatus = (orderId: string, nextStatus: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, status: nextStatus };
      }
      return order;
    }));
    showToast(`Order ${orderId} marked as ${nextStatus}`);
  };

  // --- REVIEW MODERATION OPERATIONS ---
  const handleReviewStatus = (productId: string, reviewIndex: number, action: 'Approve' | 'Flag' | 'Delete') => {
    setReviews(prev => {
      const productReviewsList = prev[productId] ? [...prev[productId]] : [];
      if (productReviewsList[reviewIndex]) {
        if (action === 'Delete') {
          productReviewsList.splice(reviewIndex, 1);
          showToast('Review permanently deleted.');
        } else {
          productReviewsList[reviewIndex] = {
            ...productReviewsList[reviewIndex],
            status: action === 'Approve' ? 'Approved' : 'Flagged'
          };
          showToast(`Review marked as ${action}d.`);
        }
      }
      return {
        ...prev,
        [productId]: productReviewsList
      };
    });
  };

  // --- PROMO CODE OPERATIONS ---
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedCode = newCouponCode.trim().toUpperCase();
    if (!formattedCode) {
      showToast('Please specify a promotional coupon code name.');
      return;
    }

    if (promoCodes.some(c => c.code === formattedCode)) {
      showToast('A promotional coupon with this code already exists.');
      return;
    }

    const newPromo: PromoCode = {
      code: formattedCode,
      discountPercent: Number(newCouponDiscount),
      isActive: true,
      useCount: 0
    };

    setPromoCodes(prev => [...prev, newPromo]);
    setNewCouponCode('');
    showToast(`Promo code "${formattedCode}" is now active!`);
  };

  const toggleCouponStatus = (code: string) => {
    setPromoCodes(prev => prev.map(c => c.code === code ? { ...c, isActive: !c.isActive } : c));
    showToast(`Coupon status changed.`);
  };

  const deleteCoupon = (code: string) => {
    setPromoCodes(prev => prev.filter(c => c.code !== code));
    showToast(`Deleted coupon code ${code}.`);
  };

  // List of all flattened reviews for quick bulk moderation
  const flattenedReviews = useMemo(() => {
    const list: { productId: string; productName: string; review: Review; index: number }[] = [];
    Object.entries(reviews).forEach(([prodId, reviewList]) => {
      const productObj = products.find(p => p.id === prodId);
      const name = productObj ? productObj.name : `Product ID: ${prodId}`;
      reviewList.forEach((rev, index) => {
        list.push({
          productId: prodId,
          productName: name,
          review: rev,
          index
        });
      });
    });
    return list;
  }, [reviews, products]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] pb-24">
      {/* Admin Subheader / Breadcrumb */}
      <div className="bg-[#F5F2ED] border-b border-[#E5E2DA] py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1.5 border border-[#E5E2DA] hover:border-[#1A1A1A] bg-white transition-colors"
              title="Return to Storefront"
              id="back-to-store-btn"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold block">INTERNAL PORTAL</span>
              <h1 className="text-2xl font-serif tracking-tight">Élane Management Engine</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold rounded-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Operations Sync
            </span>
          </div>
        </div>
      </div>

      {/* Admin Tab Selectors */}
      <div className="border-b border-[#E5E2DA] bg-white sticky top-18 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto whitespace-nowrap scrollbar-none divide-x divide-[#E5E2DA]/50">
          {[
            { id: 'overview', label: 'Store Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Inventory Catalog', icon: Package },
            { id: 'orders', label: 'Fulfillment Pipeline', icon: ShoppingBag },
            { id: 'reviews', label: 'Review Moderation', icon: MessageSquare },
            { id: 'promos', label: 'Promotional Coupons', icon: Tag }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`py-5 px-6 flex items-center gap-2.5 text-[11px] uppercase tracking-widest font-bold transition-colors ${
                  activeSubTab === tab.id 
                    ? 'bg-[#FAF9F6] text-[#1A1A1A] border-b-2 border-[#1A1A1A]' 
                    : 'text-[#4A4A4A] hover:bg-neutral-50 hover:text-black'
                }`}
                id={`admin-tab-${tab.id}`}
              >
                <IconComponent className="w-4 h-4 text-[#5A5A40]" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* ======================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ======================================================= */}
        {activeSubTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white border border-[#E5E2DA] p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block font-bold">Accumulated Revenue</span>
                  <h3 className="text-3xl font-serif mt-1 font-semibold">${totalSales.toFixed(2)}</h3>
                  <p className="text-[10px] text-neutral-400 mt-1">Based on {orders.length} real purchases</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-[#E5E2DA]">
                  <DollarSign className="w-5 h-5 text-[#5A5A40]" />
                </div>
              </div>

              <div className="bg-white border border-[#E5E2DA] p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block font-bold">Total Placed Orders</span>
                  <h3 className="text-3xl font-serif mt-1 font-semibold">{orders.length}</h3>
                  <p className="text-[10px] text-emerald-600 mt-1">✓ 100% processing rate</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-[#E5E2DA]">
                  <ShoppingBag className="w-5 h-5 text-[#5A5A40]" />
                </div>
              </div>

              <div className="bg-white border border-[#E5E2DA] p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block font-bold">Average Ticket Value</span>
                  <h3 className="text-3xl font-serif mt-1 font-semibold">${averageOrderValue.toFixed(2)}</h3>
                  <p className="text-[10px] text-neutral-400 mt-1">Healthy ritual basket size</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-[#E5E2DA]">
                  <TrendingUp className="w-5 h-5 text-[#5A5A40]" />
                </div>
              </div>

              <div className="bg-white border border-[#E5E2DA] p-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block font-bold">Low Stock Warning</span>
                  <h3 className={`text-3xl font-serif mt-1 font-semibold ${lowStockProducts.length > 0 ? 'text-amber-700' : ''}`}>
                    {lowStockProducts.length}
                  </h3>
                  <p className="text-[10px] text-neutral-400 mt-1">Products with stock under 15</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-[#E5E2DA]">
                  <AlertTriangle className={`w-5 h-5 ${lowStockProducts.length > 0 ? 'text-amber-700' : 'text-[#5A5A40]'}`} />
                </div>
              </div>

            </div>

            {/* Split row: Sales Analytics Graph and Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sales Graph */}
              <div className="bg-white border border-[#E5E2DA] p-6 lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold">Real-time Revenue Analysis</h4>
                      <p className="text-[11px] text-[#5A5A40]">Calculated daily based on direct storefront triggers</p>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">Currency: USD</span>
                  </div>

                  {/* Graphical chart visualization (Bespoke SVG representation for high layout reliability) */}
                  <div className="h-64 flex items-end justify-between pt-4 pb-2 border-b border-[#E5E2DA]">
                    {salesChartData.map((data, index) => {
                      const maxVal = Math.max(...salesChartData.map(d => d.sales));
                      const percentHeight = maxVal > 0 ? (data.sales / maxVal) * 100 : 10;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center group relative px-1">
                          {/* Tooltip on hover */}
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-[#1A1A1A] text-[#FAF9F6] text-[10px] px-2 py-1 transition-opacity whitespace-nowrap z-10 shadow-md">
                            ${data.sales.toFixed(2)}
                          </div>
                          {/* Interactive Bar */}
                          <div 
                            className="w-full sm:w-10 bg-[#5A5A40]/15 group-hover:bg-[#5A5A40] transition-colors border-t border-[#5A5A40]" 
                            style={{ height: `${percentHeight}%`, minHeight: '8px' }}
                          ></div>
                          <span className="text-[9px] text-[#5A5A40] mt-3 tracking-wider font-semibold text-center leading-none">
                            {data.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-[#5A5A40]">
                  <p>✨ Real-time order placement will instantly expand the last bar graph.</p>
                  <p className="font-semibold text-neutral-800">Total logged sessions: 3,420</p>
                </div>
              </div>

              {/* Stock Warning details */}
              <div className="bg-white border border-[#E5E2DA] p-6 lg:col-span-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Urgent Replenish Alerts</h4>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {lowStockProducts.map(p => (
                      <div key={p.id} className="flex gap-3 pb-3 border-b border-[#E5E2DA]/60 justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <img src={p.image} alt={p.name} className="w-8 h-10 object-cover border border-[#E5E2DA]" />
                          <div>
                            <h5 className="font-serif text-xs font-bold text-black">{p.name}</h5>
                            <span className="text-[10px] text-neutral-400">{p.category}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-700 font-mono">{p.stock ?? 0} Left</span>
                          <span className="block text-[8px] uppercase tracking-wider text-neutral-400">Low stock</span>
                        </div>
                      </div>
                    ))}
                    {lowStockProducts.length === 0 && (
                      <div className="text-center py-8 text-[#5A5A40]">
                        <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                        <p className="text-xs italic">All product shelves are well-stocked.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-[#E5E2DA] pt-4">
                  <button 
                    onClick={() => setActiveSubTab('products')} 
                    className="w-full bg-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase tracking-widest font-bold py-3 hover:bg-neutral-800 transition-colors"
                  >
                    Manage Inventory
                  </button>
                </div>
              </div>

            </div>

            {/* Sales Distribution By Category */}
            <div className="bg-white border border-[#E5E2DA] p-6">
              <h4 className="text-xs uppercase tracking-widest font-bold mb-5">Sales Contribution Breakdown</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(salesByCategory).map(([cat, amount]) => {
                  const val = amount as number;
                  return (
                    <div key={cat} className="p-4 bg-[#FAF9F6] border border-[#E5E2DA]">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-[#5A5A40] block">{cat}</span>
                      <h5 className="text-xl font-serif mt-1 font-semibold">${val.toFixed(2)}</h5>
                      {/* Visual bar tracker */}
                      <div className="w-full bg-[#E5E2DA] h-1.5 mt-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#5A5A40] h-full" 
                          style={{ width: `${totalSales > 0 ? (val / totalSales) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 2: PRODUCTS (CRUD) */}
        {/* ======================================================= */}
        {activeSubTab === 'products' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold">Live Inventory Control</h4>
                <p className="text-[11px] text-[#5A5A40]">Directly customize product listings, pricing, and volume settings.</p>
              </div>
              <button
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2.5 hover:bg-neutral-800 transition-colors flex items-center gap-2"
                id="add-product-btn"
              >
                {isAddingProduct ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                {isAddingProduct ? 'Cancel' : 'Introduce New Product'}
              </button>
            </div>

            {/* Form to Add New Product */}
            {isAddingProduct && (
              <form onSubmit={handleAddProductSubmit} className="bg-white border border-[#E5E2DA] p-6 md:p-8 space-y-6 animate-fade-in">
                <h3 className="font-serif text-lg border-b border-[#E5E2DA] pb-3 text-black">New Botanical Formula Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Product Name *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Cleansing Scalp Treatment" 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Category *</label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    >
                      <option value="Skincare">Skincare</option>
                      <option value="Hair Care">Hair Care</option>
                      <option value="Body Care">Body Care</option>
                      <option value="Bundles">Bundles</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Retail Price ($ USD) *</label>
                    <input 
                      required
                      type="number" 
                      placeholder="e.g. 35" 
                      value={newProduct.price || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Aesthetic Tagline *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Infused with Mint Essence & tea tree" 
                      value={newProduct.tagline}
                      onChange={(e) => setNewProduct({ ...newProduct, tagline: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Volume Capacity</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 100 ml / 3.4 fl. oz" 
                      value={newProduct.volume}
                      onChange={(e) => setNewProduct({ ...newProduct, volume: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Starting Stock Count</label>
                    <input 
                      type="number" 
                      placeholder="50" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Image URL *</label>
                  <input 
                    required
                    type="url" 
                    placeholder="https://images.unsplash.com/photo-..." 
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                  />
                  <span className="text-[9px] text-neutral-400 mt-1 block">Please supply a high-quality cosmetics or botanicals photography address.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Editorial Formulation Description</label>
                    <textarea 
                      rows={3}
                      placeholder="Describe the aesthetic and tactile properties..." 
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Key Product Benefits (Comma-separated)</label>
                    <textarea 
                      rows={3}
                      placeholder="Benefit A, Benefit B, Benefit C" 
                      value={newProduct.benefitsString}
                      onChange={(e) => setNewProduct({ ...newProduct, benefitsString: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Full Ingredients List</label>
                    <textarea 
                      rows={2}
                      placeholder="Aloe Vera, Glycerin, Rosemary Essence..." 
                      value={newProduct.ingredients}
                      onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">How To Use Directions</label>
                    <textarea 
                      rows={2}
                      placeholder="Apply 2-3 drops after standard cleansing ritual..." 
                      value={newProduct.howToUse}
                      onChange={(e) => setNewProduct({ ...newProduct, howToUse: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black resize-none"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="bg-[#1A1A1A] text-[#FAF9F6] text-[10px] uppercase tracking-widest font-bold px-8 py-4 hover:bg-neutral-800 transition-colors"
                >
                  Publish Formula to Catalog
                </button>
              </form>
            )}

            {/* Inline Product Editor Drawer/Panel (Only visible when editingProduct is set) */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-[#FAF9F6] border border-[#E5E2DA] max-w-lg w-full p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-3">
                    <h3 className="font-serif text-lg">Modify &quot;{editingProduct.name}&quot;</h3>
                    <button onClick={() => setEditingProduct(null)} className="p-1 hover:opacity-60"><X className="w-5 h-5" /></button>
                  </div>

                  <form onSubmit={handleUpdateProductSubmit} className="space-y-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Retail Price ($ USD)</label>
                      <input 
                        type="number" 
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Stock Level Capacity</label>
                      <input 
                        type="number" 
                        value={editingProduct.stock ?? 0}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                        className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Aesthetic Tagline</label>
                      <input 
                        type="text" 
                        value={editingProduct.tagline}
                        onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                        className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#5A5A40] font-bold block mb-1">Volume Capacity</label>
                      <input 
                        type="text" 
                        value={editingProduct.volume}
                        onChange={(e) => setEditingProduct({ ...editingProduct, volume: e.target.value })}
                        className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-3">
                      <button 
                        type="submit" 
                        className="flex-grow bg-black text-white text-[10px] uppercase tracking-widest font-bold py-3.5"
                      >
                        Save Changes
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setEditingProduct(null)} 
                        className="px-6 border border-[#E5E2DA] text-neutral-500 text-[10px] uppercase tracking-widest bg-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Product Table List */}
            <div className="bg-white border border-[#E5E2DA] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-b border-[#E5E2DA] text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold">
                      <th className="py-4 px-6">Product details</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Price</th>
                      <th className="py-4 px-6">Volume</th>
                      <th className="py-4 px-6">Stock Status</th>
                      <th className="py-4 px-6 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E2DA]/60">
                    {products.map((p) => {
                      const isLow = (p.stock ?? 0) < 15;
                      return (
                        <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-4 px-6 flex items-center gap-3">
                            <div className="w-10 h-12 border border-[#E5E2DA] bg-[#FAF9F6] overflow-hidden flex-shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <strong className="font-serif text-sm font-semibold text-black">{p.name}</strong>
                              <span className="block text-[10px] text-neutral-400 font-mono mt-0.5">ID: #{p.id}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-0.5 border border-[#E5E2DA] text-[10px] uppercase tracking-wider bg-[#FAF9F6]">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-mono font-bold text-neutral-900">${p.price}.00</td>
                          <td className="py-4 px-6 text-neutral-500 font-mono">{p.volume}</td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col">
                              <span className={`font-mono font-bold ${isLow ? 'text-amber-700' : 'text-[#5A5A40]'}`}>
                                {p.stock ?? 0} units
                              </span>
                              <span className="text-[9px] text-neutral-400">
                                {isLow ? '⚠️ Replenish required' : '✓ Good level'}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="text-[9px] uppercase tracking-widest bg-[#FAF9F6] border border-[#E5E2DA] hover:border-black px-3 py-1.5 font-bold inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              className="text-[9px] uppercase tracking-widest bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 px-3 py-1.5 font-bold inline-flex items-center gap-1"
                            >
                              <Trash className="w-3 h-3" /> Archive
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 3: ORDERS (Fulfillment) */}
        {/* ======================================================= */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold">Fulfillment Control Center</h4>
              <p className="text-[11px] text-[#5A5A40]">Acknowledge newly logged client orders and progress shipment logistics.</p>
            </div>

            <div className="bg-white border border-[#E5E2DA] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-b border-[#E5E2DA] text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold">
                      <th className="py-4 px-6">Reference</th>
                      <th className="py-4 px-6">Date Placed</th>
                      <th className="py-4 px-6">Items Purchased</th>
                      <th className="py-4 px-6">Total Amount</th>
                      <th className="py-4 px-6">Status Tracker</th>
                      <th className="py-4 px-6 text-right">Fulfillment action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E2DA]/60">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-4 px-6 font-mono font-bold text-black">{order.id}</td>
                        <td className="py-4 px-6 text-neutral-500">{order.date}</td>
                        <td className="py-4 px-6 max-w-xs">
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="truncate">
                                {item.product.name} <span className="font-mono text-[10px] text-neutral-400">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-mono font-bold text-black">${order.total}.00</td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 text-[9px] uppercase tracking-widest font-bold inline-block rounded-none ${
                            order.status === 'Processing' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
                            order.status === 'Shipped' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                            order.status === 'Out for Delivery' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                            'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {/* Drops to update shipping pipeline */}
                          <div className="inline-flex gap-1.5">
                            {(['Processing', 'Shipped', 'Out for Delivery', 'Delivered'] as const).map((st) => (
                              <button
                                key={st}
                                disabled={order.status === st}
                                onClick={() => handleUpdateOrderStatus(order.id, st)}
                                className={`text-[9px] uppercase tracking-wider px-2 py-1.5 border font-semibold transition-all ${
                                  order.status === st 
                                    ? 'bg-[#1A1A1A] text-white border-black' 
                                    : 'bg-white text-neutral-600 border-[#E5E2DA] hover:border-black'
                                }`}
                              >
                                {st === 'Processing' ? 'Process' : st === 'Shipped' ? 'Ship' : st === 'Out for Delivery' ? 'Out' : 'Deliver'}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 italic text-neutral-400">
                          No client orders have been logged yet in this session. Go place some orders!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 4: REVIEWS MODERATION */}
        {/* ======================================================= */}
        {activeSubTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold">Review Moderation Center</h4>
              <p className="text-[11px] text-[#5A5A40]">Audit, flag, or delete user reviews left on catalog items to preserve Élane high-quality feedback guidelines.</p>
            </div>

            <div className="bg-white border border-[#E5E2DA] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-b border-[#E5E2DA] text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold">
                      <th className="py-4 px-6">Product details</th>
                      <th className="py-4 px-6">Reviewer Info</th>
                      <th className="py-4 px-6">Rating</th>
                      <th className="py-4 px-6">Feedback text</th>
                      <th className="py-4 px-6">Moderation Status</th>
                      <th className="py-4 px-6 text-right font-bold">Auditing Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E2DA]/60">
                    {flattenedReviews.map(({ productId, productName, review, index }, rIdx) => {
                      const isFlagged = review.status === 'Flagged';
                      const isApproved = review.status === 'Approved';
                      return (
                        <tr key={rIdx} className={`hover:bg-neutral-50/50 transition-colors ${isFlagged ? 'bg-red-50/30' : ''}`}>
                          <td className="py-4 px-6 font-semibold font-serif text-black">{productName}</td>
                          <td className="py-4 px-6">
                            <strong className="block text-neutral-900">{review.name}</strong>
                            <span className="text-[10px] text-neutral-400">{review.date}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex text-amber-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-neutral-200'}`} />
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6 max-w-md italic text-neutral-700">
                            &quot;{review.text}&quot;
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-widest font-semibold ${
                              isApproved ? 'bg-green-50 text-green-700 border-green-200' :
                              isFlagged ? 'bg-red-50 text-red-700 border-red-200' :
                              'bg-neutral-50 text-neutral-500 border-[#E5E2DA]'
                            }`}>
                              {review.status || 'Pending Audit'}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-1.5">
                            <button
                              onClick={() => handleReviewStatus(productId, index, 'Approve')}
                              className="text-[9px] uppercase tracking-wider bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-2.5 py-1.5 font-bold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReviewStatus(productId, index, 'Flag')}
                              className="text-[9px] uppercase tracking-wider bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 px-2.5 py-1.5 font-bold"
                            >
                              Flag
                            </button>
                            <button
                              onClick={() => handleReviewStatus(productId, index, 'Delete')}
                              className="text-[9px] uppercase tracking-wider bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2.5 py-1.5 font-bold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {flattenedReviews.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 italic text-neutral-400">
                          No reviews have been generated in active records.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 5: PROMO CODES */}
        {/* ======================================================= */}
        {activeSubTab === 'promos' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Promo Generator Form */}
              <div className="bg-white border border-[#E5E2DA] p-6 lg:col-span-4 self-start">
                <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Generate Promo Code</h4>
                <form onSubmit={handleAddCoupon} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] block mb-1">Coupon Code Name *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. FALLGLOW" 
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#5A5A40] block mb-1">Discount Percentage (%) *</label>
                    <input 
                      required
                      type="number" 
                      min={1}
                      max={95}
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-bold py-3 hover:bg-neutral-800 transition-all"
                  >
                    Activate Coupon
                  </button>
                </form>
              </div>

              {/* Promo Codes List Table */}
              <div className="bg-white border border-[#E5E2DA] lg:col-span-8 overflow-hidden">
                <div className="p-4 border-b border-[#E5E2DA] bg-[#FAF9F6] flex justify-between items-center">
                  <h4 className="text-xs uppercase tracking-widest font-bold">Active Store Coupons</h4>
                  <span className="text-[9px] text-neutral-400">Total active codes: {promoCodes.length}</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF9F6] border-b border-[#E5E2DA] text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold">
                        <th className="py-4 px-6">Code</th>
                        <th className="py-4 px-6">Discount</th>
                        <th className="py-4 px-6">Current Status</th>
                        <th className="py-4 px-6">Usage Count</th>
                        <th className="py-4 px-6 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E2DA]/60">
                      {promoCodes.map((c) => (
                        <tr key={c.code} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-mono font-bold text-xs border-2 border-dashed border-[#5A5A40] px-3 py-1 bg-neutral-50">
                              {c.code}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-neutral-900 font-bold">{c.discountPercent}% OFF</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-0.5 border text-[9px] uppercase tracking-widest font-bold ${
                              c.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-neutral-50 text-neutral-400 border-[#E5E2DA]'
                            }`}>
                              {c.isActive ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-mono text-neutral-500">{c.useCount} checkouts</td>
                          <td className="py-4 px-6 text-right space-x-1.5">
                            <button
                              onClick={() => toggleCouponStatus(c.code)}
                              className="text-[9px] uppercase tracking-wider bg-[#FAF9F6] border border-[#E5E2DA] hover:border-black px-2.5 py-1.5 font-bold"
                            >
                              {c.isActive ? 'Disable' : 'Enable'}
                            </button>
                            <button
                              onClick={() => deleteCoupon(c.code)}
                              className="text-[9px] uppercase tracking-wider bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2.5 py-1.5 font-bold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
