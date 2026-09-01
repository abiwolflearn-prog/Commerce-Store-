import { useState, useMemo } from 'react';
import { 
  ShoppingBag, Search, User, Heart, Star, X, Filter, Check, 
  ArrowRight, Mail, Phone, MapPin, ChevronRight, ChevronLeft, Plus, Minus,
  LayoutDashboard
} from 'lucide-react';
import { Product, Order, Review, PromoCode } from './types';
import AdminDashboard from './components/AdminDashboard';
import { ScrollReveal, StaggerContainer, StaggerItem } from './components/ScrollReveal';


// --- CURATED PRODUCTS ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Hydrating Face Serum',
    category: 'Skincare',
    tagline: 'Multi-weight Hyaluronic Acid & Squalane',
    price: 32,
    rating: 4.8,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    description: 'An intensely hydrating botanical serum formulated with multi-weight Hyaluronic Acid, Organic Aloe Vera, and skin-replenishing Squalane to restore plumpness and natural radiance.',
    benefits: ['Deeply hydrates and plumps skin', 'Reduces appearance of dry lines', 'Silky, lightweight and non-sticky'],
    ingredients: 'Aloe Barbadensis Leaf Juice, Sodium Hyaluronate (Hyaluronic Acid), Olive-derived Squalane, Niacinamide (Vitamin B3), Glycerin, Centella Asiatica Extract.',
    howToUse: 'Apply 3-4 drops to clean, damp face and neck morning and night. Gently press with palms until fully absorbed.',
    volume: '30 ml / 1.0 fl. oz'
  },
  {
    id: '2',
    name: 'Nourishing Hair Oil',
    category: 'Hair Care',
    tagline: 'Cold-pressed Argan & Rosemary Essence',
    price: 28,
    rating: 4.9,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=800',
    description: 'A weightless cold-pressed hair oil enriched with Argan Oil, Jojoba, and Rosemary Essence to smooth frizz, repair dry split ends, and promote healthy-looking shine.',
    benefits: ['Tames frizz and smooths flyaways', 'Restores natural shine and moisture', 'Lightweight, non-greasy formula'],
    ingredients: 'Argania Spinosa (Argan) Kernel Oil, Jojoba Seed Oil, Rosmarinus Officinalis (Rosemary) Leaf Extract, Sweet Almond Oil, Vitamin E.',
    howToUse: 'Warm 2-3 drops in your palms and apply evenly through clean, damp or dry hair, focusing on mid-lengths and ends.',
    volume: '50 ml / 1.7 fl. oz'
  },
  {
    id: '3',
    name: 'Daily Facial Cleanser',
    category: 'Skincare',
    tagline: 'Gentle pH-balanced hydrating milk',
    price: 24,
    rating: 4.7,
    reviewsCount: 12,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
    description: 'A gentle, non-foaming cream cleanser that lifts impurities, makeup, and pollution while keeping the skin’s essential moisture barrier intact.',
    benefits: ['Removes daily impurities gently', 'Protects skin natural pH barrier', 'Rich cream cleanser won’t dry skin'],
    ingredients: 'Organic Aloe Vera, Coconut-derived Glucosides, Chamomile Extract, Glycerin, Green Tea Extract, Jojoba Oil.',
    howToUse: 'Massage 1-2 pumps onto damp skin in circular motions. Rinse thoroughly with lukewarm water. Use daily, morning and night.',
    volume: '150 ml / 5.1 fl. oz'
  },
  {
    id: '4',
    name: 'Glow Moisturizer',
    category: 'Skincare',
    tagline: 'Brightening Vitamin C & Rosehip Cream',
    price: 30,
    rating: 4.8,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800',
    description: 'A luxurious moisture cream loaded with Vitamin C, Rosehip Oil, and Shea Butter to deliver a bright, dewy complexion and deep 24-hour hydration.',
    benefits: ['Boosts natural glow and skin clarity', 'Provides deep, long-lasting moisture', 'Whipped texture absorbs beautifully'],
    ingredients: 'Water, Rosehip Seed Oil, Shea Butter, Vitamin C, Niacinamide, Tocopheryl Acetate, Glyceryl Stearate, Citric Acid.',
    howToUse: 'Massage a dime-sized amount onto clean, dry skin after applying your serum. Perfect for morning and evening routines.',
    volume: '50 ml / 1.7 fl. oz'
  },
  {
    id: '5',
    name: 'Repair Hair Serum',
    category: 'Hair Care',
    tagline: 'Leave-in wheat protein bond repair',
    price: 29,
    rating: 4.6,
    reviewsCount: 9,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
    description: 'An advanced leave-in repair serum with hydrolyzed botanical proteins to target damage, strengthen internal hair bonds, and protect against heat.',
    benefits: ['Strengthens fragile hair fibers', 'Protects against styling heat damage', 'Leaves strands bouncy and light'],
    ingredients: 'Water (Aqua), Hydrolyzed Wheat Protein, Hydrolyzed Soy Protein, Provitamin B5 (Panthenol), Aloe Vera, Keratin Extract.',
    howToUse: 'Apply 1-2 pumps into clean, damp hair from mid-lengths to ends. Comb through for even distribution. Do not rinse.',
    volume: '40 ml / 1.4 fl. oz'
  },
  {
    id: '6',
    name: 'Body Nourishing Oil',
    category: 'Body Care',
    tagline: 'Sumptuous Lavender & Cedarwood oil',
    price: 34,
    rating: 4.9,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
    description: 'A sumptuous, nutrient-rich body oil that absorbs rapidly to leave skin feeling silky-smooth and lightly scented with lavender and cedarwood.',
    benefits: ['Instantly hydrates and softens skin', 'Deeply calming botanical aromatherapy', 'Satin glow without greasy residue'],
    ingredients: 'Sunflower Seed Oil, Organic Jojoba Seed Oil, Sweet Almond Oil, Lavender Oil, Cedarwood Bark Oil, Tocopherol.',
    howToUse: 'Massage generously onto slightly damp skin immediately after showering to lock in maximum hydration.',
    volume: '100 ml / 3.4 fl. oz'
  },
  {
    id: '7',
    name: 'Élane Radiance Bundle',
    category: 'Bundles',
    tagline: 'Complete 3-step skincare routine',
    price: 78,
    rating: 4.9,
    reviewsCount: 32,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate skin-renewing ritual bundle containing our full-size Daily Facial Cleanser, Hydrating Face Serum, and Glow Moisturizer to cleanse, treat, and seal a flawless daily glow.',
    benefits: ['Includes 3 full-size bestsellers', 'Value saving of over 15%', 'Complimentary organic linen travel pouch'],
    ingredients: 'See individual product listings for Cleanser, Face Serum, and Moisturizer.',
    howToUse: 'Morning and night: Step 1 Cleanse. Step 2 Apply Serum. Step 3 Moisturize and lock in your glow.',
    volume: '3 Full-size Products'
  }
];

export default function App() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'about' | 'journal' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>(() => 
    PRODUCTS.map(p => ({ ...p, stock: p.id === '5' ? 8 : p.id === '3' ? 12 : 35 }))
  );
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    { code: 'RADIANTSKIN', discountPercent: 10, isActive: true, useCount: 1 }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<PromoCode | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Skincare' | 'Hair Care' | 'Body Care' | 'Bundles'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailTab, setDetailTab] = useState<'ingredients' | 'how-to' | 'reviews'>('ingredients');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // --- REVIEW SYSTEM ---
  const [productReviews, setProductReviews] = useState<Record<string, Review[]>>({
    '1': [
      { name: 'Sarah M.', rating: 5, date: 'August 12, 2026', text: 'My skin feels so much more hydrated and comfortable. It leaves a beautiful dewy finish!' },
      { name: 'Jessica K.', rating: 4, date: 'July 28, 2026', text: 'Very hydrating serum, absorbs quickly. Highly recommend!' }
    ],
    '2': [
      { name: 'Maya L.', rating: 5, date: 'August 20, 2026', text: 'The hair oil has become part of my daily routine. Smells incredible and non-greasy!' }
    ],
    '3': [
      { name: 'Chloe T.', rating: 5, date: 'August 15, 2026', text: 'Beautiful packaging and products that actually feel premium. Does not dry skin.' }
    ]
  });
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  // --- ACCOUNT & ORDER TRACKING ---
  const [accountOpen, setAccountOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [myOrders, setMyOrders] = useState<Order[]>([
    {
      id: 'ELN-9824',
      date: 'Aug 24, 2026',
      items: [{ product: PRODUCTS[0], quantity: 1 }, { product: PRODUCTS[1], quantity: 1 }],
      total: 60,
      status: 'Shipped'
    }
  ]);

  // --- CHECKOUT FLOW ---
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'complete'>('shipping');
  const [shippingForm, setShippingForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [paymentForm, setPaymentForm] = useState({ card: '', expiry: '', cvc: '' });

  // --- ROUTINE SECTION TAB ---
  const [routineTab, setRoutineTab] = useState<'skincare' | 'hair'>('skincare');

  // --- JOURNAL MODAL ---
  const [selectedArticle, setSelectedArticle] = useState<{ title: string; date: string; readTime: string; text: string; image: string } | null>(null);

  // --- TOAST HELPER ---
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // --- CART UTILS ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as { product: Product; quantity: number }[]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product];
      }
    });
  };

  // --- CALCULATIONS ---
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!discountApplied) return 0;
    return cartSubtotal * ((appliedCoupon?.discountPercent ?? 10) / 100);
  }, [cartSubtotal, discountApplied, appliedCoupon]);

  const shippingCost = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartSubtotal >= 75 ? 0 : 7.5;
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal - discountAmount + shippingCost;
  }, [cartSubtotal, discountAmount, shippingCost]);

  const freeShippingProgress = useMemo(() => {
    if (cartSubtotal >= 75) return 100;
    return (cartSubtotal / 75) * 100;
  }, [cartSubtotal]);

  // --- FILTERED PRODUCTS ---
  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [products, selectedCategory, searchQuery]);

  // --- REVIEWS SUMMARY ---
  const getAverageRating = (productId: string, defaultRating: number) => {
    const list = productReviews[productId];
    if (!list || list.length === 0) return defaultRating;
    const sum = list.reduce((acc, r) => acc + r.rating, 0);
    return parseFloat((sum / list.length).toFixed(1));
  };

  const getReviewsCount = (productId: string, defaultCount: number) => {
    const list = productReviews[productId];
    if (!list) return defaultCount;
    return list.length;
  };

  // --- HANDLE ADD REVIEW ---
  const submitReview = (productId: string) => {
    if (!newReviewName.trim() || !newReviewText.trim()) {
      showToast('Please fill out all fields');
      return;
    }
    const newReview: Review = {
      name: newReviewName,
      rating: newReviewRating,
      date: 'Today',
      text: newReviewText
    };
    setProductReviews(prev => ({
      ...prev,
      [productId]: [newReview, ...(prev[productId] || [])]
    }));
    setNewReviewName('');
    setNewReviewText('');
    showToast('Thank you for your feedback!');
  };

  // --- INITIATE CHECKOUT ---
  const handleStartCheckout = () => {
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.');
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
    setCheckoutStep('shipping');
  };

  const handlePlaceOrder = () => {
    if (!shippingForm.name || !shippingForm.email || !shippingForm.address || !shippingForm.city || !shippingForm.zip) {
      showToast('Please complete shipping details.');
      return;
    }
    if (checkoutStep === 'shipping') {
      setCheckoutStep('payment');
      return;
    }
    if (!paymentForm.card || !paymentForm.expiry || !paymentForm.cvc) {
      showToast('Please complete payment details.');
      return;
    }

    // Success order placing
    const randomId = 'ELN-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: randomId,
      date: 'Today',
      items: [...cart],
      total: cartTotal,
      status: 'Processing'
    };

    setMyOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setDiscountApplied(false);
    setCheckoutStep('complete');
    setTrackingCode(randomId);
    setTrackedOrder(newOrder);
  };

  const handleTrackOrderSearch = () => {
    const found = myOrders.find(o => o.id.trim().toUpperCase() === trackingCode.trim().toUpperCase());
    if (found) {
      setTrackedOrder(found);
    } else {
      setTrackedOrder(null);
      showToast('Order reference not found.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white text-[12px] uppercase tracking-widest px-6 py-4 shadow-lg flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]"></div>
          {toast}
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1A1A1A] text-[#FAF9F6] text-[10px] py-2 text-center tracking-[0.2em] uppercase font-light border-b border-[#E5E2DA]">
        Free shipping on orders over $75 — Shop our natural rituals
      </div>

      {/* 2. PREMIUM STICKY HEADER */}
      <header className="sticky top-0 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E2DA] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Logo Left */}
          <div 
            onClick={() => { setActiveTab('home'); setSelectedCategory('All'); }}
            onDoubleClick={() => {
              setActiveTab('admin');
              showToast('Élane administrative portal loaded.');
            }}
            className="text-xl md:text-2xl tracking-[0.3em] font-serif uppercase font-light cursor-pointer hover:opacity-80 transition-opacity select-none"
          >
            ÉLANE BEAUTY
          </div>

          {/* Navigation Center */}
          <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.18em] font-medium text-[#4A4A4A]">
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }}
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${activeTab === 'shop' && selectedCategory === 'All' ? 'text-[#1A1A1A] border-b border-[#1A1A1A]' : ''}`}
            >
              Shop All
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('Skincare'); }}
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${activeTab === 'shop' && selectedCategory === 'Skincare' ? 'text-[#1A1A1A] border-b border-[#1A1A1A]' : ''}`}
            >
              Skincare
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('Hair Care'); }}
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${activeTab === 'shop' && selectedCategory === 'Hair Care' ? 'text-[#1A1A1A] border-b border-[#1A1A1A]' : ''}`}
            >
              Hair Care
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setSelectedCategory('Body Care'); }}
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${activeTab === 'shop' && selectedCategory === 'Body Care' ? 'text-[#1A1A1A] border-b border-[#1A1A1A]' : ''}`}
            >
              Body Care
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${activeTab === 'about' ? 'text-[#1A1A1A] border-b border-[#1A1A1A]' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => setActiveTab('journal')}
              className={`hover:text-[#1A1A1A] transition-colors py-1 relative ${activeTab === 'journal' ? 'text-[#1A1A1A] border-b border-[#1A1A1A]' : ''}`}
            >
              Journal
            </button>
          </nav>

          {/* Icons Right */}
          <div className="flex items-center gap-5">
            <button onClick={() => setSearchOpen(true)} className="p-1 hover:text-[#5A5A40] transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setAccountOpen(true)} className="p-1 hover:text-[#5A5A40] transition-colors">
              <User className="w-4 h-4" />
            </button>
            <button onClick={() => setWishlistOpen(true)} className="p-1 hover:text-[#5A5A40] transition-colors relative">
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5A5A40] text-[#FAF9F6] text-[8px] rounded-full w-3 h-3 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="p-1 hover:text-[#5A5A40] transition-colors relative">
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1A1A1A] text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                  {cart.reduce((s, c) => s + c.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAVIGATION PILLS */}
      <div className="md:hidden border-b border-[#E5E2DA] bg-[#FAF9F6] px-4 py-3 flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-none">
        <button onClick={() => { setActiveTab('home'); }} className={`text-[10px] uppercase tracking-widest px-4 py-1.5 border ${activeTab === 'home' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E2DA]'}`}>Home</button>
        <button onClick={() => { setActiveTab('shop'); setSelectedCategory('All'); }} className={`text-[10px] uppercase tracking-widest px-4 py-1.5 border ${activeTab === 'shop' && selectedCategory === 'All' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E2DA]'}`}>Shop All</button>
        <button onClick={() => { setActiveTab('shop'); setSelectedCategory('Skincare'); }} className={`text-[10px] uppercase tracking-widest px-4 py-1.5 border ${activeTab === 'shop' && selectedCategory === 'Skincare' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E2DA]'}`}>Skincare</button>
        <button onClick={() => { setActiveTab('shop'); setSelectedCategory('Hair Care'); }} className={`text-[10px] uppercase tracking-widest px-4 py-1.5 border ${activeTab === 'shop' && selectedCategory === 'Hair Care' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E2DA]'}`}>Hair Care</button>
        <button onClick={() => { setActiveTab('shop'); setSelectedCategory('Body Care'); }} className={`text-[10px] uppercase tracking-widest px-4 py-1.5 border ${activeTab === 'shop' && selectedCategory === 'Body Care' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E2DA]'}`}>Body Care</button>
      </div>

      {/* --- HOMEPAGE VIEW --- */}
      {activeTab === 'home' && (
        <main className="flex-grow">
          {/* 3. HERO SECTION (Bento Grid Inspired Layout) */}
          <section className="border-b border-[#E5E2DA] grid grid-cols-1 lg:grid-cols-12 min-h-[640px] overflow-hidden">
            <div className="lg:col-span-7 flex flex-col justify-center px-6 md:px-16 py-12 md:py-20 bg-[#F0EBE3] relative overflow-hidden">
              {/* Artistic high-resolution background with glowing skin representation */}
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-25"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1200')` }}
              ></div>
              <div className="relative z-10 max-w-xl animate-fade-in">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5A5A40] mb-4 block">
                  EVERYDAY BEAUTY, THOUGHTFULLY MADE
                </span>
                <h1 className="text-5xl md:text-7xl font-serif leading-[1.05] tracking-tight mb-6">
                  Healthy skin.<br />Beautiful hair.<br /><span className="italic">Naturally.</span>
                </h1>
                <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed mb-10 max-w-md">
                  Thoughtfully crafted skincare and nourishing hair oils designed to integrate seamlessly into your daily self-care ritual.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => { setActiveTab('shop'); setSelectedCategory('Skincare'); }}
                    className="bg-[#1A1A1A] text-[#FAF9F6] text-[11px] uppercase tracking-widest font-semibold px-8 py-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Shop Skincare <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => { setActiveTab('shop'); setSelectedCategory('Hair Care'); }}
                    className="border border-[#1A1A1A] text-[#1A1A1A] text-[11px] uppercase tracking-widest font-semibold px-8 py-4 hover:bg-[#1A1A1A] hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Shop Hair Care
                  </button>
                </div>
              </div>
            </div>

            {/* Right side large lifestyle representation */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#E5E2DA] relative min-h-[350px] lg:min-h-auto bg-[#FAF9F6]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200')` }}
              ></div>
              {/* Overlaid highlight info */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#FAF9F6]/90 backdrop-blur-sm p-4 border border-[#E5E2DA] flex justify-between items-center">
                <div>
                  <h4 className="text-[11px] uppercase tracking-widest font-bold">Cold-pressed Botanicals</h4>
                  <p className="text-[10px] text-[#4A4A4A] mt-0.5">Organic formulations from soil to bottle</p>
                </div>
                <span className="text-[11px] tracking-widest border-b border-[#1A1A1A] pb-0.5 uppercase cursor-pointer hover:opacity-75" onClick={() => setActiveTab('about')}>
                  Our Story
                </span>
              </div>
            </div>
          </section>

          {/* 4. BRAND TRUST SECTION */}
          <StaggerContainer className="border-b border-[#E5E2DA] bg-white grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E5E2DA] divide-y lg:divide-y-0 text-center">
            {[
              { num: '01', title: 'Thoughtfully Formulated', desc: 'Sourced with natural ingredients' },
              { num: '02', title: 'Cruelty Free & Vegan', desc: 'No testing on animals ever' },
              { num: '03', title: 'Quality Ingredients', desc: 'Free of synthetic parabens' },
              { num: '04', title: 'Secure & Free Shipping', desc: 'Comped on all orders over $75' }
            ].map((item, idx) => (
              <StaggerItem key={idx} className="p-6 md:p-8 flex flex-col justify-center items-center">
                <span className="font-serif italic text-lg text-[#5A5A40] mb-2">{item.num}</span>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-1">{item.title}</h4>
                <p className="text-[10px] text-[#5A5A40]">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* 5. BEST SELLERS SECTION */}
          <section className="py-16 px-6 max-w-7xl mx-auto">
            <ScrollReveal direction="up" delay={0.1} className="text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-3">Our Bestsellers</h2>
              <p className="text-sm text-[#5A5A40] leading-relaxed">
                Meet the highly celebrated formulas our community swears by for long-term skin and hair vitality.
              </p>

              {/* Grid Categories Filter */}
              <div className="flex justify-center gap-3 mt-8 flex-wrap">
                {['All', 'Skincare', 'Hair Care', 'Body Care'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as any)}
                    className={`text-[10px] uppercase tracking-widest px-5 py-2 border transition-all ${
                      (selectedCategory === cat || (cat === 'All' && selectedCategory === 'Bundles'))
                        ? 'bg-[#1A1A1A] text-[#FAF9F6] border-[#1A1A1A]' 
                        : 'border-[#E5E2DA] hover:border-[#1A1A1A]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Bestselling product cards grid */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.filter(p => selectedCategory === 'All' || p.category === selectedCategory).map((product) => (
                <StaggerItem key={product.id} className="group border border-[#E5E2DA] bg-white p-4 flex flex-col justify-between hover:shadow-sm transition-all">
                  
                  {/* Photo area with hover zooms */}
                  <div className="relative aspect-[4/5] bg-[#FAF9F6] mb-4 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 ${wishlist.some(item => item.id === product.id) ? 'fill-[#1A1A1A]' : ''}`} />
                    </button>
                    {/* Size marker */}
                    <span className="absolute bottom-3 left-3 bg-[#1A1A1A] text-[#FAF9F6] text-[9px] uppercase tracking-widest px-2.5 py-1">
                      {product.volume}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#5A5A40] block mb-1">{product.category}</span>
                    <h3 className="font-serif text-lg leading-tight group-hover:underline cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#5A5A40] mt-1 line-clamp-2 min-h-8">
                      {product.tagline}
                    </p>

                    {/* Star review ratings */}
                    <div className="flex items-center gap-1.5 mt-3 mb-4">
                      <div className="flex text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(getAverageRating(product.id, product.rating)) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#5A5A40] font-medium">
                        {getAverageRating(product.id, product.rating)} ({getReviewsCount(product.id, product.reviewsCount)})
                      </span>
                    </div>
                  </div>

                  {/* Cart trigger action footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E2DA] mt-auto">
                    <span className="font-serif text-[16px]">${product.price}.00</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="text-[10px] uppercase tracking-widest border-b border-[#1A1A1A] pb-0.5 hover:opacity-60 transition-all font-semibold"
                    >
                      Add to Bag
                    </button>
                  </div>

                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* 6. FEATURED HAIR OIL EDITORIAL HERO SECTION */}
          <section className="bg-[#EAE5DB] border-t border-b border-[#E5E2DA] grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 flex flex-col justify-center max-w-xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5A5A40] font-bold mb-4 block">SIGNATURE HERO FLUID</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Your hair&apos;s daily botanical ritual.</h2>
              <p className="text-[#4A4A4A] text-sm leading-relaxed mb-8">
                A lightweight botanical fluid crafted with certified organic Argan, Sweet Almond, and refreshing Rosemary essence. Restores moisture, repairs split ends, and leaves dry hair silky-smooth without any heavy, sticky residue.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { title: '✓ Lightweight oil', desc: 'No weighed down locks' },
                  { title: '✓ Deep botanical care', desc: 'Nourishes the strand' },
                  { title: '✓ Multi-use treatment', desc: 'Apply pre-wash or post-dry' },
                  { title: '✓ Vegan blend', desc: '100% plant sourced' }
                ].map((pt, idx) => (
                  <div key={idx}>
                    <h5 className="text-[11px] uppercase tracking-widest font-bold">{pt.title}</h5>
                    <p className="text-[10px] text-[#5A5A40] mt-0.5">{pt.desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => { setSelectedProduct(PRODUCTS[1]); }}
                className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest px-8 py-4 self-start hover:bg-neutral-800 transition-colors"
              >
                Shop Hair Oil
              </button>
            </div>

            <div className="relative min-h-[400px] lg:min-h-auto border-t lg:border-t-0 lg:border-l border-[#E5E2DA]">
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200" 
                alt="Hair Care editorial photography" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </section>

          {/* 7. BEAUTY EDITORIAL GRID (Bento Grid Composition) */}
          <section className="py-16 px-6 bg-white border-b border-[#E5E2DA]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-12">
                <h2 className="text-3xl font-serif">Curated Discoveries</h2>
                <p className="text-xs text-[#5A5A40] uppercase tracking-widest mt-2">Bespoke formulations designed with purpose</p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Promo Box (Col span 4) */}
                <div className="md:col-span-4 border border-[#E5E2DA] p-8 flex flex-col justify-between bg-[#F5F2ED] relative overflow-hidden">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#5A5A40] block mb-3">EXCLUSIVE BENEFIT</span>
                    <h3 className="text-2xl font-serif leading-snug">Enjoy 10% off your introductory purchase.</h3>
                    <p className="text-[11px] text-[#4A4A4A] mt-2">Use code below at the checkout screen.</p>
                  </div>
                  <div className="mt-8">
                    <span className="text-xs uppercase tracking-widest font-semibold border-2 border-dashed border-[#5A5A40] px-4 py-2 bg-white text-[#1A1A1A]">
                      RADIANTSKIN
                    </span>
                  </div>
                </div>

                {/* Routine discovery (Col span 5) */}
                <div className="md:col-span-5 border border-[#E5E2DA] relative group overflow-hidden min-h-[300px]">
                  <img 
                    src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=800" 
                    alt="Skincare Routine" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/45 group-hover:bg-[#1A1A1A]/50 transition-colors"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#FAF9F6]">
                    <span className="text-[9px] uppercase tracking-[0.2em]">KNOWLEDGE HUB</span>
                    <h3 className="text-2xl font-serif mt-1">Discover your tailored routine.</h3>
                    <p className="text-[11px] opacity-85 mt-2">Simplify your everyday self-care journey.</p>
                    <button 
                      onClick={() => {
                        const target = document.getElementById('simplified-routine-steps');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[9px] uppercase tracking-widest font-bold border-b border-[#FAF9F6] pb-0.5 mt-4 self-start"
                    >
                      Build Routine
                    </button>
                  </div>
                </div>

                {/* Natural components (Col span 3) */}
                <div className="md:col-span-3 border border-[#E5E2DA] p-6 flex flex-col justify-between bg-[#F0EBE3]">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#5A5A40]">ORIGIN MATTERS</span>
                    <h4 className="text-lg font-serif mt-2 mb-3">Our Raw Botanical Ingredients</h4>
                    <ul className="text-[10px] text-[#5A5A40] space-y-2">
                      <li>• Certified Organic Argan Oil</li>
                      <li>• Multi-Weight Hyaluronic Acid</li>
                      <li>• Whipped Cold-Pressed Shea Butter</li>
                      <li>• Rosemary Essence</li>
                    </ul>
                  </div>
                  <button 
                    onClick={() => setActiveTab('about')}
                    className="text-[9px] uppercase tracking-widest font-bold border-b border-[#1A1A1A] pb-0.5 self-start mt-6"
                  >
                    Botanical Index
                  </button>
                </div>

                {/* Clean beauty assurance (Col span 7) */}
                <div className="md:col-span-7 border border-[#E5E2DA] relative group overflow-hidden min-h-[300px]">
                  <img 
                    src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200" 
                    alt="Ingredients sourcing" 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/35 group-hover:bg-[#1A1A1A]/40 transition-colors"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#FAF9F6]">
                    <span className="text-[9px] uppercase tracking-[0.2em]">SUSTAINABILITY COMMITMENT</span>
                    <h3 className="text-2xl font-serif mt-1">Conscious footprint from soil to bottle.</h3>
                    <p className="text-[11px] opacity-85 mt-2">Zero synthetic parabens, recycled glass containers, and 100% clean, cruelty-free vegan formulas.</p>
                    <button 
                      onClick={() => setActiveTab('about')}
                      className="text-[9px] uppercase tracking-widest font-bold border-b border-[#FAF9F6] pb-0.5 mt-4 self-start"
                    >
                      Our Stewardship
                    </button>
                  </div>
                </div>

                {/* Bundles highlight (Col span 5) */}
                <div className="md:col-span-5 border border-[#E5E2DA] bg-[#FAF9F6] p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#5A5A40]">HOLISTIC SETS</span>
                    <h3 className="text-2xl font-serif mt-2">The Élane Ritual Bundles</h3>
                    <p className="text-[11px] text-[#4A4A4A] mt-2">
                      Beautifully packaged in natural linen, our customized bundles bring together key products designed to complement each other flawlessly.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs uppercase text-[#5A5A40]">Starting from $48</span>
                    <button 
                      onClick={() => { setActiveTab('shop'); setSelectedCategory('Bundles'); }}
                      className="text-[10px] uppercase tracking-widest border-b border-[#1A1A1A] pb-0.5 hover:opacity-60 font-semibold"
                    >
                      Shop Bundles
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 8. SUSTAINABILITY SECTION */}
          <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block mb-2">EARTH FIRST</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Beauty with a lighter footprint.</h2>
              <p className="text-sm text-[#4A4A4A] leading-relaxed mb-8">
                We believe premium quality skin and hair care should never compromise the health of our planet. That is why every decision we make—from ingredient sourcing to manufacturing—is centered around conscious stewardship.
              </p>
              <div className="space-y-4">
                {[
                  { t: 'Responsible Packaging', d: 'Recyclable high-grade glass vials and biodegradable soy ink boxes.' },
                  { t: 'Thoughtful Sourcing', d: 'Direct fair-trade contracts with organic family-owned botanical farms.' },
                  { t: 'Cruelty-Free Formulations', d: 'Certified vegan with zero testing on animals.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="font-serif italic text-lg text-[#5A5A40]">0{idx + 1}</span>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold">{item.t}</h4>
                      <p className="text-[11px] text-[#5A5A40] mt-0.5">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600" alt="Sustainability model" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden translate-y-8">
                <img src="https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600" alt="Botanicals harvesting" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          {/* 9. ROUTINE SECTION (Skincare and Hair Care Step-by-Step) */}
          <section id="simplified-routine-steps" className="py-20 px-6 bg-[#F5F2ED] border-t border-b border-[#E5E2DA]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-12">
                <h2 className="text-3xl font-serif">Your Ritual, Simplified</h2>
                <p className="text-xs text-[#5A5A40] tracking-widest uppercase mt-2">Carefully targeted steps to optimize health</p>

                <div className="inline-flex border border-[#E5E2DA] p-1 bg-white mt-8">
                  <button 
                    onClick={() => setRoutineTab('skincare')}
                    className={`text-[10px] uppercase tracking-widest px-6 py-2 transition-all ${routineTab === 'skincare' ? 'bg-[#1A1A1A] text-white' : 'hover:opacity-75'}`}
                  >
                    Skincare Routine
                  </button>
                  <button 
                    onClick={() => setRoutineTab('hair')}
                    className={`text-[10px] uppercase tracking-widest px-6 py-2 transition-all ${routineTab === 'hair' ? 'bg-[#1A1A1A] text-white' : 'hover:opacity-75'}`}
                  >
                    Hair Ritual
                  </button>
                </div>
              </div>

              {routineTab === 'skincare' ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { step: '01', title: 'Cleanse', d: 'Wash with Daily Cleanser to lift dirt and maintain vital pH moisture.', p: PRODUCTS[2] },
                    { step: '02', title: 'Treat', d: 'Apply 3-4 drops of Hydrating Face Serum to damp skin for cell plumping.', p: PRODUCTS[0] },
                    { step: '03', title: 'Moisturize', d: 'Seal in hydration with Glow Moisturizer for skin barrier nutrition.', p: PRODUCTS[3] },
                    { step: '04', title: 'Protect', d: 'Finish with lightweight mineral SPF sunscreen for long-term safety.', p: null }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-[#E5E2DA] p-6 flex flex-col justify-between h-72">
                      <div>
                        <span className="font-serif italic text-[#5A5A40] text-sm block mb-4">Step {item.step}</span>
                        <h4 className="text-xs uppercase tracking-widest font-bold mb-2">{item.title}</h4>
                        <p className="text-[11px] text-[#5A5A40] leading-relaxed">{item.d}</p>
                      </div>
                      {item.p ? (
                        <button 
                          onClick={() => setSelectedProduct(item.p)}
                          className="text-[9px] uppercase tracking-widest font-semibold border-b border-[#1A1A1A] pb-0.5 self-start hover:opacity-60 transition-all mt-4"
                        >
                          View formula
                        </button>
                      ) : (
                        <span className="text-[9px] text-[#9A958A] uppercase tracking-widest block mt-4">Coming Soon</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { step: '01', title: 'Cleanse', d: 'Wash thoroughly with a botanical pH-regulating shampoo.', p: null },
                    { step: '02', title: 'Condition', d: 'Restore elasticity and nourish cuticles with wheat proteins.', p: null },
                    { step: '03', title: 'Treat', d: 'Apply leave-in Repair Hair Serum to strengthen weakened fibers.', p: PRODUCTS[4] },
                    { step: '04', title: 'Seal & Shine', d: 'Finish with 2-3 drops of Nourishing Hair Oil on dry ends.', p: PRODUCTS[1] }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-[#E5E2DA] p-6 flex flex-col justify-between h-72">
                      <div>
                        <span className="font-serif italic text-[#5A5A40] text-sm block mb-4">Step {item.step}</span>
                        <h4 className="text-xs uppercase tracking-widest font-bold mb-2">{item.title}</h4>
                        <p className="text-[11px] text-[#5A5A40] leading-relaxed">{item.d}</p>
                      </div>
                      {item.p ? (
                        <button 
                          onClick={() => setSelectedProduct(item.p)}
                          className="text-[9px] uppercase tracking-widest font-semibold border-b border-[#1A1A1A] pb-0.5 self-start hover:opacity-60 transition-all mt-4"
                        >
                          View formula
                        </button>
                      ) : (
                        <span className="text-[9px] text-[#9A958A] uppercase tracking-widest block mt-4">Coming Soon</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* 10. EDITORIAL JOURNAL SNEAK PEEK */}
          <section className="py-20 px-6 max-w-7xl mx-auto border-b border-[#E5E2DA]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block mb-1">THE ÉLANE JOURNAL</span>
                <h2 className="text-3xl font-serif">Read what is new</h2>
              </div>
              <button 
                onClick={() => setActiveTab('journal')}
                className="text-[10px] uppercase tracking-widest border-b border-[#1A1A1A] pb-0.5 hover:opacity-75 mt-4 md:mt-0"
              >
                View all articles
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'How to build a simple skincare routine',
                  category: 'Rituals',
                  date: 'August 24, 2026',
                  readTime: '4 min read',
                  image: 'https://images.unsplash.com/photo-1590156546746-c58d20f666f7?auto=format&fit=crop&q=80&w=600',
                  text: 'To establish a great routine, start with three key actions: cleansing, hydrating, and protecting. Wash with a gentle cleanser to strip oils without dryness. Apply active serums like hyaluronic acid to restore plumpness. Seal with cream moisturizer and sunscreen...'
                },
                {
                  title: '5 ways to care for dry hair',
                  category: 'Hair Care',
                  date: 'August 18, 2026',
                  readTime: '5 min read',
                  image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600',
                  text: 'Dry strands require deep nourishment. Avoid over-washing with sulfates. Integrate botanical oils rich in argan or jojoba into dry end cuticles. Avoid excess heat styling, sleep with a silk pillowcase, and do weekly deeply hydrating conditioning masks...'
                },
                {
                  title: 'How to choose the right hair oil',
                  category: 'Guides',
                  date: 'August 10, 2026',
                  readTime: '3 min read',
                  image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
                  text: 'Different hair types require different molecules. Fine strands benefit from light botanical oils like jojoba and sweet almond. Thick or damaged hair absorbs rich, cold-pressed argan oil. Choose organic rosemary-infused extracts to promote healthy scalp nutrition...'
                }
              ].map((article, idx) => (
                <div key={idx} className="group cursor-pointer" onClick={() => setSelectedArticle(article)}>
                  <div className="aspect-[16/10] bg-[#F5F2ED] overflow-hidden mb-4 border border-[#E5E2DA]">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-[#5A5A40] mb-2 font-semibold">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl group-hover:underline leading-snug">{article.title}</h3>
                  <p className="text-[11px] text-[#5A5A40] mt-2 line-clamp-2">{article.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 11. REPUTABLE TESTIMONIALS */}
          <section className="py-20 px-6 bg-white text-center">
            <div className="max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block mb-2">COMMUNITY LOVE</span>
              <h2 className="text-3xl font-serif mb-12">Loved by our community.</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  { text: '“My skin feels so much more hydrated and comfortable. Absolute game-changer.”', author: 'Sarah M.', item: 'Hydrating Face Serum' },
                  { text: '“The hair oil has become a permanent part of my morning ritual. So smooth and clean.”', author: 'Maya L.', item: 'Nourishing Hair Oil' },
                  { text: '“Exquisite packaging, sustainable glass, and formulas that feel beautifully premium.”', author: 'Lina R.', item: 'Glow Moisturizer' }
                ].map((test, idx) => (
                  <div key={idx} className="border border-[#E5E2DA] p-6 bg-[#FAF9F6] flex flex-col justify-between">
                    <div>
                      <div className="flex text-amber-500 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                      <p className="text-xs leading-relaxed italic text-[#1A1A1A]">{test.text}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#E5E2DA]">
                      <h5 className="text-[10px] uppercase tracking-widest font-bold">{test.author}</h5>
                      <span className="text-[9px] text-[#5A5A40]">{test.item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 12. INSTAGRAM SECTION */}
          <section className="py-12 border-t border-[#E5E2DA] bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-widest text-[#5A5A40]">RITUAL LIFESTYLE</span>
                <h3 className="text-xl font-serif mt-1">Follow the ritual</h3>
                <span className="text-[10px] text-[#5A5A40] uppercase tracking-widest mt-1 block">@elane_beauty</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {[
                  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400',
                  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400',
                  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
                  'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400',
                  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400',
                  'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=400'
                ].map((img, idx) => (
                  <div key={idx} className="aspect-square bg-neutral-200 overflow-hidden relative group">
                    <img src={img} alt="Instagram grid asset" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-[#1A1A1A]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] uppercase tracking-widest">
                      View Post
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 13. PREMIUM NEWSLETTER */}
          <section className="bg-[#1A1A1A] text-[#FAF9F6] py-16 px-6 text-center border-b border-[#E5E2DA]">
            <div className="max-w-xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 block mb-2">JOIN OUR CIRCLE</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-3">Stay radiant.</h2>
              <p className="text-xs text-[#E5E2DA] leading-relaxed mb-8">
                Beauty tips, exclusive promotions, and organic product launch updates delivered thoughtfully to your inbox.
              </p>

              {newsletterSubscribed ? (
                <div className="bg-neutral-800 p-4 border border-[#5A5A40] text-sm text-[#FAF9F6]">
                  ✓ Welcome to the ritual. Enjoy 10% off with code <span className="font-bold text-white">RADIANTSKIN</span>.
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterSubscribed(true); }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email address" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow bg-neutral-900 border border-neutral-700 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <button 
                    type="submit"
                    className="bg-white text-black text-[11px] uppercase tracking-widest font-semibold px-8 py-3.5 hover:bg-neutral-200 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* 14. SOUPED UP CONTACT SECTION */}
          <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#E5E2DA]">
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] mb-2 block">CLIENT ASSISTANCE</span>
              <h2 className="text-3xl font-serif mb-6">Let&apos;s talk beauty.</h2>
              <p className="text-xs text-[#5A5A40] leading-relaxed mb-8">
                Whether you need advice on establishing a routine, choosing a hair oil, or tracking an shipment, our concierge team is on hand.
              </p>

              <form 
                onSubmit={(e) => { e.preventDefault(); showToast('Message dispatched! We will reply within 24 hours.'); }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="First Name" 
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] transition-colors" 
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] transition-colors" 
                  />
                </div>
                <input 
                  required
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] transition-colors" 
                />
                <textarea 
                  required
                  rows={4} 
                  placeholder="Your inquiry details..." 
                  className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                ></textarea>
                <button 
                  type="submit"
                  className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest px-8 py-3.5 hover:bg-neutral-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Visual side graphic */}
            <div className="relative min-h-[350px] lg:min-h-auto border-t lg:border-t-0 lg:border-l border-[#E5E2DA]">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200" 
                alt="Concierge customer service" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </section>

        </main>
      )}

      {/* --- REAL PRODUCT CATALOG LISTINGS VIEW --- */}
      {activeTab === 'shop' && (
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
          
          <div className="border-b border-[#E5E2DA] pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#5A5A40]">DISCOVER ÉLANE</span>
              <h1 className="text-4xl font-serif tracking-tight mt-1">Shop {selectedCategory === 'All' ? 'Our Catalog' : selectedCategory}</h1>
            </div>
            {/* Horizontal Subcategory Bar */}
            <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
              {['All', 'Skincare', 'Hair Care', 'Body Care', 'Bundles'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={`text-[10px] uppercase tracking-widest px-4 py-1.5 border ${
                    selectedCategory === cat ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E5E2DA] bg-white hover:border-[#1A1A1A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 space-y-6">
              <div className="border border-[#E5E2DA] bg-white p-6">
                <div className="flex items-center gap-2 mb-4 border-b border-[#E5E2DA] pb-2">
                  <Filter className="w-3.5 h-3.5" />
                  <h4 className="text-xs uppercase tracking-widest font-bold">Catalog Filters</h4>
                </div>

                {/* Sourcing values */}
                <div className="mb-6">
                  <h5 className="text-[11px] uppercase tracking-widest font-semibold mb-2">Formulation values</h5>
                  <div className="space-y-1.5 text-[11px] text-[#5A5A40]">
                    <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#5A5A40]" /> 100% Certified Vegan</div>
                    <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#5A5A40]" /> Paraben-free Sourcing</div>
                    <div className="flex items-center gap-2"><Check className="w-3 h-3 text-[#5A5A40]" /> Eco-friendly Glass Tubes</div>
                  </div>
                </div>

                {/* Sourcing guarantee box */}
                <div className="bg-[#FAF9F6] p-4 border border-[#E5E2DA] text-[10px] leading-relaxed text-[#5A5A40]">
                  <strong>Concierge note:</strong> Need a customized skincare or hair recommendations checklist? Chat to us directly.
                </div>
              </div>
            </div>

            {/* Product Catalog Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white border border-[#E5E2DA]">
                  <p className="text-sm text-[#5A5A40]">No items found matching the selected query.</p>
                  <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="text-[11px] uppercase tracking-widest border-b border-black font-semibold mt-3">Reset Catalog Filter</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group border border-[#E5E2DA] bg-white p-4 flex flex-col justify-between hover:shadow-sm transition-all">
                      <div className="relative aspect-[4/5] bg-[#FAF9F6] mb-4 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${wishlist.some(item => item.id === product.id) ? 'fill-[#1A1A1A]' : ''}`} />
                        </button>
                        <span className="absolute bottom-3 left-3 bg-[#1A1A1A] text-[#FAF9F6] text-[9px] uppercase tracking-widest px-2.5 py-1">
                          {product.volume}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#5A5A40] block mb-1">{product.category}</span>
                        <h3 className="font-serif text-lg leading-tight group-hover:underline cursor-pointer" onClick={() => setSelectedProduct(product)}>
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-[#5A5A40] mt-1 line-clamp-2 min-h-8">{product.tagline}</p>
                        
                        <div className="flex items-center gap-1 mt-3 mb-4">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span className="text-[10px] text-[#5A5A40]">{getAverageRating(product.id, product.rating)} ({getReviewsCount(product.id, product.reviewsCount)})</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#E5E2DA]">
                        <span className="font-serif text-[16px]">${product.price}.00</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="text-[10px] uppercase tracking-widest border-b border-[#1A1A1A] pb-0.5 hover:opacity-60 transition-all font-semibold"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>
      )}

      {/* --- ABOUT STORY VIEW --- */}
      {activeTab === 'about' && (
        <main className="flex-grow max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block mb-2">OUR PHILOSOPHY</span>
            <h1 className="text-4xl md:text-5xl font-serif">Simplicity & Authenticity</h1>
            <p className="text-xs text-[#5A5A40] tracking-widest uppercase mt-3">Established 2026 • Élane Beauty</p>
          </div>

          <div className="aspect-[21/9] bg-neutral-200 overflow-hidden mb-12 border border-[#E5E2DA]">
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200" alt="About brand banner" className="w-full h-full object-cover" />
          </div>

          <div className="prose max-w-2xl mx-auto space-y-6 text-[#1A1A1A] text-sm leading-relaxed">
            <p>
              At Élane Beauty, we believe the skin and hair thrive best when treated with gentle, cold-pressed botanical oils and natural scientific hydrators. Our journey began with a simple need: to strip away synthetic additives, unnecessary fillers, and intense fragrances that over-stimulate and damage cells.
            </p>
            <p>
              Each formula is designed as an everyday ritual, combining deeply hydrating properties with organic aromatherapy benefits. We construct our products meticulously in small, tested batches to ensure potency and safety.
            </p>
            <blockquote className="border-l-2 border-[#5A5A40] pl-4 italic text-base text-[#5A5A40] my-8">
              “Beauty should be simple, effective, and joyful. Clean formulas designed for your skin and hair, with deep respect for the planet.”
            </blockquote>
            <p>
              By utilizing durable glass packaging and responsibly sourced plant products, we maintain our promise of transparent sustainability. We are proud to be certified vegan and completely cruelty-free.
            </p>
          </div>
        </main>
      )}

      {/* --- JOURNAL ARCHIVE VIEW --- */}
      {activeTab === 'journal' && (
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] block mb-2">THE ÉLANE ARCHIVES</span>
            <h1 className="text-4xl font-serif">The Ritual Journal</h1>
            <p className="text-sm text-[#5A5A40] mt-2">Nourishment guides, chemical index briefings, and holistic beauty rituals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'How to build a simple skincare routine',
                category: 'Rituals',
                date: 'August 24, 2026',
                readTime: '4 min read',
                image: 'https://images.unsplash.com/photo-1590156546746-c58d20f666f7?auto=format&fit=crop&q=80&w=600',
                text: 'To establish a great routine, start with three key actions: cleansing, hydrating, and protecting. Wash with a gentle cleanser to strip oils without dryness. Apply active serums like hyaluronic acid to restore plumpness. Seal with cream moisturizer and sunscreen...'
              },
              {
                title: '5 ways to care for dry hair',
                category: 'Hair Care',
                date: 'August 18, 2026',
                readTime: '5 min read',
                image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600',
                text: 'Dry strands require deep nourishment. Avoid over-washing with sulfates. Integrate botanical oils rich in argan or jojoba into dry end cuticles. Avoid excess heat styling, sleep with a silk pillowcase, and do weekly deeply hydrating conditioning masks...'
              },
              {
                title: 'How to choose the right hair oil',
                category: 'Guides',
                date: 'August 10, 2026',
                readTime: '3 min read',
                image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
                text: 'Different hair types require different molecules. Fine strands benefit from light botanical oils like jojoba and sweet almond. Thick or damaged hair absorbs rich, cold-pressed argan oil. Choose organic rosemary-infused extracts to promote healthy scalp nutrition...'
              }
            ].map((article, idx) => (
              <div key={idx} className="group cursor-pointer border border-[#E5E2DA] p-4 bg-white hover:shadow-sm transition-all" onClick={() => setSelectedArticle(article)}>
                <div className="aspect-[16/10] bg-[#F5F2ED] overflow-hidden mb-4 border border-[#E5E2DA]">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-[#5A5A40] mb-2 font-semibold">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-serif text-xl group-hover:underline leading-snug">{article.title}</h3>
                <p className="text-[11px] text-[#5A5A40] mt-2 line-clamp-2">{article.text}</p>
                <span className="text-[10px] uppercase tracking-widest border-b border-[#1A1A1A] pb-0.5 inline-block mt-4 font-semibold">Read More</span>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* --- ADMIN DASHBOARD VIEW --- */}
      {activeTab === 'admin' && (
        <AdminDashboard 
          products={products}
          setProducts={setProducts}
          orders={myOrders}
          setOrders={setMyOrders}
          reviews={productReviews}
          setReviews={setProductReviews}
          promoCodes={promoCodes}
          setPromoCodes={setPromoCodes}
          onClose={() => setActiveTab('home')}
          showToast={showToast}
        />
      )}

      {/* 15. SOPHISTICATED FOOTER */}
      <footer className="bg-white border-t border-[#E5E2DA] py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-xl tracking-[0.25em] font-serif uppercase">ÉLANE BEAUTY</h2>
            <p className="text-xs text-[#5A5A40] max-w-sm leading-relaxed">
              Premium curated skincare and botanical hair oils crafted to celebrate raw skin health and simple luxury rituals.
            </p>
            <div className="text-[10px] text-[#9A958A] uppercase tracking-widest pt-4">
              © 2026 ÉLANE BEAUTY.
            </div>
          </div>

          {/* Links Cols */}
          {[
            {
              title: 'SHOP',
              links: [
                { name: 'Skincare', action: () => { setActiveTab('shop'); setSelectedCategory('Skincare'); } },
                { name: 'Hair Care', action: () => { setActiveTab('shop'); setSelectedCategory('Hair Care'); } },
                { name: 'Body Care', action: () => { setActiveTab('shop'); setSelectedCategory('Body Care'); } },
                { name: 'Bundles', action: () => { setActiveTab('shop'); setSelectedCategory('Bundles'); } }
              ]
            },
            {
              title: 'HELP',
              links: [
                { name: 'Concierge Inquiry', action: () => showToast('concierge contact active') },
                { name: 'Order Tracking Portal', action: () => setTrackingOpen(true) },
                { name: 'Shipping & Returns', action: () => showToast('Free shipping over $75. 30 days return policy.') },
                { name: 'FAQ Briefing', action: () => showToast('All formulas are certified clean and vegan.') }
              ]
            },
            {
              title: 'ABOUT',
              links: [
                { name: 'Our Philosophy', action: () => setActiveTab('about') },
                { name: 'Sustainability Sourcing', action: () => setActiveTab('about') },
                { name: 'Journal Rituals', action: () => setActiveTab('journal') }
              ]
            }
          ].map((col, idx) => (
            <div key={idx} className="md:col-span-2 space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">{col.title}</h4>
              <ul className="space-y-2 text-[11px] text-[#5A5A40]">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button onClick={link.action} className="hover:text-[#1A1A1A] transition-colors">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social icons */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">FOLLOW US</h4>
            <ul className="space-y-2 text-[11px] text-[#5A5A40]">
              <li><a href="#" className="hover:text-black">Instagram</a></li>
              <li><a href="#" className="hover:text-black">TikTok</a></li>
              <li><a href="#" className="hover:text-black">Pinterest</a></li>
            </ul>
          </div>

        </div>
      </footer>


      {/* ================================================== */}
      {/* --- OVERLAY MODALS AND SLIDE OUT DRAWERS --- */}
      {/* ================================================== */}

      {/* A. PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] text-[#1A1A1A] border border-[#E5E2DA] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Modal header/close */}
            <div className="flex justify-end p-4 border-b border-[#E5E2DA]">
              <button onClick={() => { setSelectedProduct(null); setDetailTab('ingredients'); }} className="p-1 hover:text-[#5A5A40] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split gallery + content info */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E5E2DA]">
              
              {/* Left Photo aspect */}
              <div className="p-6 md:p-8 flex items-center justify-center bg-white">
                <div className="aspect-[4/5] w-full max-w-sm overflow-hidden relative">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 left-3 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-widest px-2 py-1 font-semibold">
                    {selectedProduct.volume}
                  </span>
                </div>
              </div>

              {/* Right formulation stats */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#5A5A40] font-bold block mb-1">{selectedProduct.category}</span>
                  <h2 className="font-serif text-3xl leading-snug">{selectedProduct.name}</h2>
                  <p className="text-sm italic text-[#5A5A40] mt-1">{selectedProduct.tagline}</p>
                  
                  {/* Reviews count dynamic */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs text-[#5A5A40]">
                      {getAverageRating(selectedProduct.id, selectedProduct.rating)} ({getReviewsCount(selectedProduct.id, selectedProduct.reviewsCount)} customer reviews)
                    </span>
                  </div>
                </div>

                <div className="font-serif text-2xl">${selectedProduct.price}.00</div>
                <p className="text-xs text-[#4A4A4A] leading-relaxed">{selectedProduct.description}</p>

                {/* Benefits mini list */}
                <ul className="space-y-1 text-[11px] text-[#5A5A40]">
                  {selectedProduct.benefits.map((b, i) => (
                    <li key={i}>✓ {b}</li>
                  ))}
                </ul>

                {/* Adding action bar */}
                <div className="flex gap-3 pt-4 border-t border-[#E5E2DA]">
                  <button 
                    onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                    className="flex-grow bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-semibold py-4 hover:bg-neutral-800 transition-colors"
                  >
                    Add to Bag
                  </button>
                  <button 
                    onClick={() => { toggleWishlist(selectedProduct); }}
                    className="p-4 border border-[#E5E2DA] hover:border-[#1A1A1A] transition-colors bg-white"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.some(i => i.id === selectedProduct.id) ? 'fill-black text-black' : ''}`} />
                  </button>
                </div>

                {/* Dynamic Detail Tabs (Ingredients, How to, Reviews) */}
                <div className="pt-6 border-t border-[#E5E2DA]">
                  <div className="flex border-b border-[#E5E2DA] text-[10px] uppercase tracking-widest">
                    <button 
                      onClick={() => setDetailTab('ingredients')}
                      className={`pb-2 px-3 relative -bottom-px font-bold ${detailTab === 'ingredients' ? 'border-b-2 border-black text-[#1A1A1A]' : 'text-neutral-400'}`}
                    >
                      Ingredients
                    </button>
                    <button 
                      onClick={() => setDetailTab('how-to')}
                      className={`pb-2 px-3 relative -bottom-px font-bold ${detailTab === 'how-to' ? 'border-b-2 border-black text-[#1A1A1A]' : 'text-neutral-400'}`}
                    >
                      How To Use
                    </button>
                    <button 
                      onClick={() => setDetailTab('reviews')}
                      className={`pb-2 px-3 relative -bottom-px font-bold ${detailTab === 'reviews' ? 'border-b-2 border-black text-[#1A1A1A]' : 'text-neutral-400'}`}
                    >
                      Reviews ({getReviewsCount(selectedProduct.id, selectedProduct.reviewsCount)})
                    </button>
                  </div>

                  <div className="pt-4 text-[11px] leading-relaxed text-[#5A5A40]">
                    {detailTab === 'ingredients' && <p>{selectedProduct.ingredients}</p>}
                    {detailTab === 'how-to' && <p>{selectedProduct.howToUse}</p>}
                    {detailTab === 'reviews' && (
                      <div className="space-y-4">
                        {/* Real-time Review Form */}
                        <div className="bg-white border border-[#E5E2DA] p-3 space-y-2">
                          <h5 className="font-bold text-[10px] uppercase tracking-widest text-black">Write a review</h5>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-neutral-400">Rating:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => setNewReviewRating(star)} className="p-0.5">
                                  <Star className={`w-3.5 h-3.5 ${star <= newReviewRating ? 'fill-amber-500 text-amber-500' : 'text-neutral-300'}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <input 
                            type="text" 
                            placeholder="Your Name" 
                            value={newReviewName}
                            onChange={(e) => setNewReviewName(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-2 text-[10px] focus:outline-none"
                          />
                          <textarea 
                            rows={2}
                            placeholder="Your feedback text..."
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            className="w-full bg-[#FAF9F6] border border-[#E5E2DA] p-2 text-[10px] focus:outline-none resize-none"
                          ></textarea>
                          <button 
                            onClick={() => submitReview(selectedProduct.id)}
                            className="bg-[#1A1A1A] text-white text-[9px] uppercase tracking-widest px-4 py-2 font-bold"
                          >
                            Submit Review
                          </button>
                        </div>

                        {/* List of customer reviews */}
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                          {(productReviews[selectedProduct.id] || []).map((rev, idx) => (
                            <div key={idx} className="border-b border-[#E5E2DA]/60 pb-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-black">{rev.name}</span>
                                <span className="text-[9px] text-[#9A958A]">{rev.date}</span>
                              </div>
                              <div className="flex text-amber-500 mb-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-2.5 h-2.5 ${i < rev.rating ? 'fill-current' : ''}`} />
                                ))}
                              </div>
                              <p className="italic text-[#1A1A1A]/80">{rev.text}</p>
                            </div>
                          ))}
                          {(productReviews[selectedProduct.id] || []).length === 0 && (
                            <p className="text-center italic text-[#9A958A] text-[10px]">No reviews written yet. Be the first to share your thoughts.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* B. CART DRAWER (Slide out) */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FAF9F6] text-[#1A1A1A] w-full max-w-md h-full flex flex-col justify-between p-6 border-l border-[#E5E2DA] shadow-xl">
            
            {/* Header */}
            <div>
              <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-4 mb-4">
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold">Your Bag ({cart.reduce((s, c) => s + c.quantity, 0)})</h3>
                <button onClick={() => setCartOpen(false)} className="p-1 hover:opacity-60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping countdown bar */}
              <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-3 mb-4 text-[10px] text-center uppercase tracking-wider text-[#5A5A40]">
                {cartSubtotal >= 75 ? (
                  <span>🎉 Congratulations! You have unlocked free priority delivery.</span>
                ) : (
                  <div>
                    <span>You are <strong>${(75 - cartSubtotal).toFixed(2)}</strong> away from free shipping.</span>
                    <div className="w-full bg-[#E5E2DA] h-1.5 mt-2 rounded-full overflow-hidden">
                      <div className="bg-[#5A5A40] h-full" style={{ width: `${freeShippingProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cart products scroll */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b border-[#E5E2DA]/60 pb-3 items-center">
                  <div className="w-16 h-20 bg-white border border-[#E5E2DA] overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-serif text-sm leading-tight text-black">{item.product.name}</h5>
                    <span className="text-[9px] text-[#5A5A40] uppercase tracking-wider block mb-1">{item.product.volume}</span>
                    <span className="text-xs font-semibold block">${item.product.price}.00</span>
                    
                    {/* Qty incrementors */}
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateCartQty(item.product.id, -1)} className="p-1 border border-[#E5E2DA] hover:border-[#1A1A1A] bg-white text-xs">
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-xs px-2 font-bold">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.product.id, 1)} className="p-1 border border-[#E5E2DA] hover:border-[#1A1A1A] bg-white text-xs">
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => updateCartQty(item.product.id, -item.quantity)} className="text-xs text-neutral-400 hover:text-red-500">
                    Remove
                  </button>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xs text-[#5A5A40] italic">Your bag is currently empty.</p>
                  <button 
                    onClick={() => { setCartOpen(false); setActiveTab('shop'); }}
                    className="text-[10px] uppercase tracking-widest border-b border-black font-semibold mt-3 inline-block"
                  >
                    Browse Bestsellers
                  </button>
                </div>
              )}
            </div>

            {/* Calculations & Checkout action */}
            {cart.length > 0 && (
              <div className="border-t border-[#E5E2DA] pt-4 space-y-3">
                
                {/* Coupon promo apply */}
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="Promo Code (RADIANTSKIN)" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow bg-white border border-[#E5E2DA] px-3 py-2 text-xs focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      const matched = promoCodes.find(c => c.code === promoCode.trim().toUpperCase() && c.isActive);
                      if (matched) {
                        setAppliedCoupon(matched);
                        setDiscountApplied(true);
                        setPromoCodes(prev => prev.map(c => c.code === matched.code ? { ...c, useCount: c.useCount + 1 } : c));
                        showToast(`${matched.discountPercent}% promotional discount applied!`);
                      } else {
                        showToast('Invalid or expired promo code.');
                      }
                    }}
                    className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest px-4 font-bold"
                  >
                    Apply
                  </button>
                </div>

                <div className="flex justify-between text-xs text-[#5A5A40]">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-xs text-green-700">
                    <span>{appliedCoupon ? `${appliedCoupon.discountPercent}%` : '10%'} Promo Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-[#5A5A40]">
                  <span>Est. Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-[#E5E2DA] pt-2 text-[#1A1A1A]">
                  <span>Grand Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <button 
                  onClick={handleStartCheckout}
                  className="w-full bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-semibold py-4 hover:bg-neutral-800 transition-colors mt-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* C. WISHLIST DRAWER (Slide out) */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-[#FAF9F6] text-[#1A1A1A] w-full max-w-md h-full flex flex-col justify-between p-6 border-l border-[#E5E2DA] shadow-xl">
            <div>
              <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-4 mb-4">
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold">Your Wishlist ({wishlist.length})</h3>
                <button onClick={() => setWishlistOpen(false)} className="p-1 hover:opacity-60">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 max-h-[75vh] overflow-y-auto">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-[#E5E2DA]/60 pb-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-14 bg-white border border-[#E5E2DA] overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-serif text-xs font-bold text-black">{item.name}</h5>
                        <span className="text-[10px] text-[#5A5A40] block">${item.price}.00</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { addToCart(item); toggleWishlist(item); }}
                        className="text-[9px] uppercase tracking-widest bg-[#1A1A1A] text-white px-3 py-1.5 font-bold"
                      >
                        Add to bag
                      </button>
                      <button onClick={() => toggleWishlist(item)} className="text-xs text-neutral-400 hover:text-red-500 px-1">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                {wishlist.length === 0 && (
                  <p className="text-center py-20 italic text-xs text-[#5A5A40]">Your wishlist is currently empty.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* D. SEARCH MODAL OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF9F6]/98 flex flex-col p-6 animate-fade-in">
          <div className="max-w-3xl w-full mx-auto flex-grow flex flex-col pt-12">
            <div className="flex justify-between items-center mb-8 border-b border-[#E5E2DA] pb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-bold">CATALOG SEARCH</span>
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1 hover:opacity-60 text-[#1A1A1A]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative mb-8">
              <input 
                autoFocus
                type="text" 
                placeholder="Search by product name, category, or skin goal..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E5E2DA] px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <Search className="absolute right-4 top-4 text-[#5A5A40] w-5 h-5" />
            </div>

            {/* Quick Live results */}
            <div className="flex-grow overflow-y-auto">
              <h5 className="text-[10px] uppercase tracking-widest text-[#5A5A40] font-semibold mb-4">Suggested Results ({filteredProducts.length})</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.slice(0, 4).map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => { setSelectedProduct(product); setSearchOpen(false); setSearchQuery(''); }}
                    className="flex gap-4 border border-[#E5E2DA] p-3 bg-white hover:border-[#1A1A1A] cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-14 bg-neutral-100 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-black">{product.name}</h4>
                      <p className="text-[10px] text-[#5A5A40] line-clamp-1">{product.tagline}</p>
                      <span className="text-[10px] font-semibold mt-0.5 block">${product.price}.00</span>
                    </div>
                  </div>
                ))}
                {searchQuery && filteredProducts.length === 0 && (
                  <p className="italic text-xs text-[#5A5A40]">No formulas match your criteria.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E. CHECKOUT FLOW MODAL */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#E5E2DA] max-w-3xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-4 mb-6">
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold">Checkout</h3>
              <button onClick={() => setCheckoutOpen(false)} className="p-1 hover:opacity-60"><X className="w-5 h-5" /></button>
            </div>

            {/* Steps tracker indicator */}
            <div className="flex gap-4 justify-between items-center mb-8 max-w-md mx-auto text-[10px] uppercase tracking-widest text-center">
              <div className={`flex-1 py-1 border-b-2 ${checkoutStep === 'shipping' ? 'border-[#1A1A1A] text-black font-bold' : 'border-[#E5E2DA] text-neutral-400'}`}>1. Shipping Details</div>
              <div className={`flex-1 py-1 border-b-2 ${checkoutStep === 'payment' ? 'border-[#1A1A1A] text-black font-bold' : 'border-[#E5E2DA] text-neutral-400'}`}>2. Secure Payment</div>
              <div className={`flex-1 py-1 border-b-2 ${checkoutStep === 'complete' ? 'border-[#1A1A1A] text-black font-bold' : 'border-[#E5E2DA] text-neutral-400'}`}>3. Confirmation</div>
            </div>

            {/* Step content */}
            {checkoutStep === 'shipping' && (
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-black">Delivery Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Full Name" 
                    value={shippingForm.name}
                    onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address" 
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                  />
                </div>
                <input 
                  required
                  type="text" 
                  placeholder="Street Address" 
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="City" 
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="Postal / ZIP Code" 
                    value={shippingForm.zip}
                    onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                  />
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-semibold py-4 hover:bg-neutral-800"
                >
                  Next: Secure Payment
                </button>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-black">Payment Information</h4>
                <input 
                  required
                  type="text" 
                  placeholder="Card Number (16 digits)" 
                  value={paymentForm.card}
                  onChange={(e) => setPaymentForm({ ...paymentForm, card: e.target.value })}
                  className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Expiry (MM/YY)" 
                    value={paymentForm.expiry}
                    onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="CVC" 
                    value={paymentForm.cvc}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cvc: e.target.value })}
                    className="w-full bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                  />
                </div>
                <div className="bg-[#FAF9F6] border border-[#E5E2DA] p-3 text-[10px] text-neutral-500">
                  Secure encrypted transmission. Order Total: <strong>${cartTotal.toFixed(2)}</strong>
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#1A1A1A] text-white text-[11px] uppercase tracking-widest font-semibold py-4 hover:bg-neutral-800"
                >
                  Place Order Securely
                </button>
              </div>
            )}

            {checkoutStep === 'complete' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 mx-auto text-xl font-bold">✓</div>
                <h3 className="text-2xl font-serif">Thank you for your order!</h3>
                <p className="text-xs text-[#5A5A40] leading-relaxed max-w-md mx-auto">
                  Your order has been successfully logged. Your unique tracking reference is:
                </p>
                <div className="bg-white border border-[#E5E2DA] py-3.5 px-6 rounded-md inline-block font-mono text-sm tracking-widest font-bold">
                  {trackingCode}
                </div>
                <p className="text-[11px] text-neutral-400 mt-2">We have sent a dispatch confirmation email to {shippingForm.email}.</p>
                <button 
                  onClick={() => { setCheckoutOpen(false); setTrackingOpen(true); }}
                  className="text-[10px] uppercase tracking-widest bg-black text-white px-6 py-3 font-bold mt-4"
                >
                  Track Shipment Status
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* F. ACCOUNT PROFILE MODAL */}
      {accountOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#E5E2DA] max-w-2xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-4 mb-6">
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold">Client Account</h3>
              <button onClick={() => setAccountOpen(false)} className="p-1 hover:opacity-60"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-6">
              {/* User Bio and Points */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white border border-[#E5E2DA]">
                <div>
                  <h4 className="text-base font-serif font-bold text-black">Aura Carter</h4>
                  <p className="text-[11px] text-neutral-400">Verified Client Member since June 2026</p>
                </div>
                <div className="mt-3 md:mt-0 bg-[#FAF9F6] border border-[#E5E2DA] py-2 px-4 rounded text-center">
                  <span className="text-[9px] uppercase text-[#5A5A40] block tracking-wider">Radiant Rewards Balance</span>
                  <strong className="text-lg text-black font-serif">340 Points</strong>
                </div>
              </div>

              {/* Saved Address */}
              <div className="bg-white border border-[#E5E2DA] p-4 text-[11px] space-y-1">
                <h5 className="font-bold text-black uppercase tracking-wider mb-2">Default Shipment Destination</h5>
                <p>1084 Cedarwood Lane</p>
                <p>San Francisco, CA 94103</p>
                <p>United States</p>
              </div>

              {/* Order History */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-widest font-bold text-black">Past Orders History</h5>
                {myOrders.map((order, idx) => (
                  <div key={idx} className="bg-white border border-[#E5E2DA] p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-black">{order.id}</span>
                        <span className="text-[10px] text-neutral-400">{order.date}</span>
                      </div>
                      <p className="text-[10px] text-[#5A5A40] mt-1">
                        {order.items.map(item => `${item.product.name} (x${item.quantity})`).join(', ')}
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center gap-4">
                      <span className="text-xs font-bold">${order.total}.00</span>
                      <span className="text-[9px] uppercase tracking-widest bg-yellow-100 text-yellow-800 px-2.5 py-1 font-bold">
                        {order.status}
                      </span>
                      <button 
                        onClick={() => { setAccountOpen(false); setTrackingOpen(true); setTrackingCode(order.id); handleTrackOrderSearch(); }}
                        className="text-[9px] uppercase tracking-widest border-b border-black font-bold"
                      >
                        Track Shipment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* G. ORDER TRACKING PORTAL */}
      {trackingOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#E5E2DA] max-w-2xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-between items-center border-b border-[#E5E2DA] pb-4 mb-6">
              <h3 className="text-sm uppercase tracking-[0.2em] font-bold">Order Tracking Station</h3>
              <button onClick={() => { setTrackingOpen(false); setTrackedOrder(null); }} className="p-1 hover:opacity-60"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-6">
              {/* Lookup bar */}
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter order reference (e.g., ELN-9824)" 
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="flex-grow bg-white border border-[#E5E2DA] p-3 text-xs focus:outline-none" 
                />
                <button 
                  onClick={handleTrackOrderSearch}
                  className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest px-6 font-bold"
                >
                  Locate
                </button>
              </div>

              {/* Status Visual Timeline */}
              {trackedOrder ? (
                <div className="bg-white border border-[#E5E2DA] p-6 space-y-6">
                  <div className="flex justify-between border-b border-[#E5E2DA] pb-3 text-xs">
                    <span>Reference: <strong className="font-mono">{trackedOrder.id}</strong></span>
                    <span>Est. Delivery: <strong>Sept 04, 2026</strong></span>
                  </div>

                  {/* Visual Progress Line */}
                  <div className="relative flex justify-between items-center text-[10px] uppercase tracking-widest pt-4">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E5E2DA] -translate-y-1/2"></div>
                    <div 
                      className="absolute top-1/2 left-0 h-0.5 bg-[#5A5A40] -translate-y-1/2 transition-all duration-1000"
                      style={{ 
                        width: trackedOrder.status === 'Processing' ? '15%' 
                             : trackedOrder.status === 'Shipped' ? '50%' 
                             : trackedOrder.status === 'Out for Delivery' ? '85%' 
                             : '100%' 
                      }}
                    ></div>

                    {/* Checkpoints */}
                    {[
                      { step: 'Logged', isReached: true },
                      { step: 'Processing', isReached: true },
                      { step: 'Shipped', isReached: trackedOrder.status !== 'Processing' },
                      { step: 'Delivered', isReached: trackedOrder.status === 'Delivered' }
                    ].map((pt, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                          pt.isReached ? 'bg-[#5A5A40] text-white border-[#5A5A40]' : 'bg-[#FAF9F6] border-[#E5E2DA] text-neutral-400'
                        }`}>
                          {i + 1}
                        </div>
                        <span className="mt-2 text-[8px] bg-[#FAF9F6] px-1 font-bold">{pt.step}</span>
                      </div>
                    ))}
                  </div>

                  {/* Summary lists */}
                  <div className="border-t border-[#E5E2DA] pt-4 text-[11px] text-[#5A5A40] space-y-1">
                    <h5 className="font-bold text-black uppercase tracking-wider">Shipment Manifest</h5>
                    {trackedOrder.items.map((item, idx) => (
                      <p key={idx}>{item.product.name} (x{item.quantity})</p>
                    ))}
                    <div className="pt-2 text-xs text-black">
                      Total Paid: <strong>${trackedOrder.total}.00 via Card Auth</strong>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-[#E5E2DA]">
                  <p className="text-xs text-[#5A5A40] italic">Enter an active order code above to trace its logistics progress.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* H. JOURNAL ARTICLE READ POPUP */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] border border-[#E5E2DA] max-w-2xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-end mb-4">
              <button onClick={() => setSelectedArticle(null)} className="p-1 hover:opacity-60"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-6">
              <div className="aspect-[16/9] overflow-hidden border border-[#E5E2DA]">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-3 text-[9px] uppercase tracking-widest text-[#5A5A40] font-semibold">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <h2 className="font-serif text-3xl leading-snug">{selectedArticle.title}</h2>
              <div className="text-sm text-[#1A1A1A] leading-relaxed space-y-4">
                <p>{selectedArticle.text}</p>
                <p>
                  Maintaining natural scalp hydration requires direct integration of cold-pressed botanicals instead of heavy synthetic oils. We advise performing a simple hair massage twice weekly using our specialized Nourishing Hair Oil to protect cuticles and ensure bouncy, brilliant luster.
                </p>
                <p>
                  For personalized recommendations tailored specifically to your unique texture goals, please consult our support team.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
