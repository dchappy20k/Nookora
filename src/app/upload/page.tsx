'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  MapPin,
  Eye,
  Save,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useToast } from '@/components/common/Toast';
import { storageService } from '@/services/storageService';
import { AESTHETIC_CATEGORIES, SPACE_TYPES } from '@/data/categories';
import { BudgetItem } from '@/types';

export default function CreatorStudioUploadPage() {
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [spaceType, setSpaceType] = useState('Bedroom');
  const [aesthetic, setAesthetic] = useState('Japandi');
  const [dimensions, setDimensions] = useState('10x11 ft');
  const [areaSqFt, setAreaSqFt] = useState('110');
  const [location, setLocation] = useState('Indiranagar, Bangalore');
  const [beforeImage, setBeforeImage] = useState(
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
  );
  const [afterImage, setAfterImage] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0HgQ43F_o8O5tqwUkkzmfg8fvE9hjnDdSglWWYGZyTUmFWH7WNFm0DFmQNQ5n5L7h7SlHKibLVq6FMNAZWne79Wi03H3yRjDHvyYImZl6JMgZ1-yCgWWw8i2ElT-SWX5Wy17rjtJ7QvEIq_zcj0I0dghKA9Qfm_AogzZP7g9Db_BoVNK0ms9VvTv110cLBB5V3I7Mp4SVm8nx8lKfRuB32DWumUboCd3l7Q44PQ4'
  );
  const [techniques, setTechniques] = useState([
    'Command 16kg picture strips used for all wall frames without drilling.',
    'Tension rods mounted inside window frame for sheer linen curtains.',
  ]);
  const [lightingProtocol, setLightingProtocol] = useState(
    '2700K warm diffused floor lantern and amber desk lamp replacing tube light.'
  );

  // Dynamic Budget Items
  const [items, setItems] = useState<BudgetItem[]>([
    {
      id: '1',
      name: 'Akari-Style Pleated Paper Lantern',
      category: 'Lighting',
      price: 1499,
      retailer: 'IKEA India',
      url: 'https://ikea.com/in/en',
      drillFree: true,
    },
    {
      id: '2',
      name: 'Pre-Washed Ochre Cotton Bedding Set',
      category: 'Bedding',
      price: 1899,
      retailer: 'Westside Home',
      url: 'https://westside.com',
      drillFree: true,
    },
    {
      id: '3',
      name: 'Modular Bamboo Wall Pegboard',
      category: 'Storage',
      price: 1250,
      retailer: 'Amazon India',
      url: 'https://amazon.in',
      drillFree: true,
    },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<BudgetItem['category']>('Lighting');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemRetailer, setNewItemRetailer] = useState('');
  const [newItemDrillFree, setNewItemDrillFree] = useState(true);

  // New Technique input
  const [newTechnique, setNewTechnique] = useState('');

  const totalCalculatedBudget = items.reduce((sum, item) => sum + item.price, 0);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice) {
      showToast('Please enter item name and price', 'error');
      return;
    }
    const item: BudgetItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: newItemName,
      category: newItemCategory,
      price: Number(newItemPrice),
      retailer: newItemRetailer || 'Online Retailer',
      url: 'https://amazon.in',
      drillFree: newItemDrillFree,
    };
    setItems((prev) => [...prev, item]);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemRetailer('');
    showToast(`Added ${item.name} to budget ledger`, 'success');
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleAddTechnique = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechnique.trim()) return;
    setTechniques((prev) => [...prev, newTechnique.trim()]);
    setNewTechnique('');
  };

  const handleRemoveTechnique = (idx: number) => {
    setTechniques((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveDraft = () => {
    storageService.saveDraft({
      title,
      subtitle,
      spaceType,
      aesthetic,
      dimensions,
      areaSqFt,
      location,
      items,
      techniques,
      lightingProtocol,
    });
    showToast('Transformation draft saved locally!', 'success');
  };

  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    if (!title.trim()) {
      showToast('Please provide a title for your room transformation', 'error');
      setCurrentStep(2);
      return;
    }
    if (items.length === 0) {
      showToast('Please add at least 1 itemized product to your budget', 'error');
      setCurrentStep(3);
      return;
    }

    setIsPublished(true);
    showToast('Room makeover published successfully to NOOKORA!', 'success');
  };

  const steps = [
    { num: 1, label: 'Visual Assets' },
    { num: 2, label: 'Space Specs' },
    { num: 3, label: 'Itemized Budget' },
    { num: 4, label: 'Story & Protocols' },
    { num: 5, label: 'Verification' },
  ];

  if (isPublished) {
    return (
      <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7] py-20 px-5 flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#18211C] border border-[rgba(216,193,154,0.3)] text-center space-y-6 ambient-shadow">
          <div className="w-16 h-16 rounded-full bg-[#202A24] border border-[#D8C19A] flex items-center justify-center mx-auto text-[#D8C19A]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl text-[#F2EFE7]">
            Makeover Published!
          </h2>
          <p className="text-xs text-[#C0BBAF] leading-relaxed">
            Your room transformation <strong className="text-[#D8C19A]">"{title}"</strong> has been successfully cataloged with an itemized budget of ₹{totalCalculatedBudget.toLocaleString('en-IN')}.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/explore"
              className="w-full py-3 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors"
            >
              View in Discovery Feed
            </Link>
            <button
              onClick={() => {
                setIsPublished(false);
                setCurrentStep(1);
              }}
              className="text-xs text-[#898C83] hover:text-[#F2EFE7] uppercase tracking-wider font-semibold"
            >
              Upload Another Transformation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#111714] text-[#F2EFE7] flex flex-col">
      {/* Studio Header */}
      <section className="bg-[#141c18] border-b border-[rgba(216,193,154,0.14)] py-8">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-[#D8C19A] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NOOKORA Creator Studio</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#F2EFE7]">
              Upload Room Transformation
            </h1>
          </div>
          <button
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#202A24] text-[#C0BBAF] hover:text-[#F2EFE7] border border-[rgba(216,193,154,0.2)] rounded text-xs font-semibold uppercase tracking-wider transition-colors self-start md:self-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
        </div>
      </section>

      {/* Main Studio Grid */}
      <main className="max-w-[1360px] mx-auto px-5 md:px-12 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Workflow Stepper Navigation */}
          <aside className="lg:col-span-3 sticky top-28 bg-[#18211C] rounded-xl p-6 border border-[rgba(216,193,154,0.14)] ambient-shadow space-y-4">
            <h2 className="font-serif text-lg text-[#F2EFE7]">Workflow</h2>
            <nav className="space-y-1">
              {steps.map((st) => (
                <button
                  key={st.num}
                  onClick={() => setCurrentStep(st.num)}
                  className={`w-full flex items-center justify-between p-3 rounded text-left transition-all ${
                    currentStep === st.num
                      ? 'bg-[#202A24] border border-[#D8C19A] text-[#D8C19A] font-semibold'
                      : 'hover:bg-[#141c18] text-[#898C83]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs w-5">0{st.num}</span>
                    <span className="text-xs uppercase tracking-wider">{st.label}</span>
                  </div>
                  {currentStep > st.num && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#929F87]" />
                  )}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-[rgba(216,193,154,0.1)] text-[11px] text-[#898C83] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#D8C19A] mb-1" />
              All transformations are reviewed for 100% renter-friendly drill-free compliance.
            </div>
          </aside>

          {/* Center Column: Form Inputs */}
          <section className="lg:col-span-6 space-y-6">
            {/* STEP 1: ASSETS & PHOTOGRAPHY */}
            {currentStep === 1 && (
              <div className="bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl p-6 md:p-8 space-y-6 ambient-shadow">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block mb-1">
                    Step 01 / 05
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EFE7]">
                    Visual Assets & Photography
                  </h3>
                  <p className="text-xs text-[#C0BBAF] mt-1">
                    Upload high-resolution Before & After photographs with warm natural lighting.
                  </p>
                </div>

                {/* Before Image URL Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8C19A] uppercase tracking-wider block">
                    Before Makeover Photo URL
                  </label>
                  <input
                    type="url"
                    value={beforeImage}
                    onChange={(e) => setBeforeImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                  />
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-stone-800 bg-[#111714]">
                    <Image src={beforeImage} alt="Before preview" fill className="object-cover grayscale" />
                    <span className="absolute top-2 left-2 text-[10px] bg-black/80 px-2 py-0.5 rounded text-stone-400 font-mono">
                      BEFORE PREVIEW
                    </span>
                  </div>
                </div>

                {/* After Image URL Input */}
                <div className="space-y-2 pt-4 border-t border-[rgba(216,193,154,0.1)]">
                  <label className="text-xs font-semibold text-[#D8C19A] uppercase tracking-wider block">
                    After Makeover Photo URL (Hero Image)
                  </label>
                  <input
                    type="url"
                    value={afterImage}
                    onChange={(e) => setAfterImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                  />
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-stone-800 bg-[#111714]">
                    <Image src={afterImage} alt="After preview" fill className="object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] bg-[#D8C19A] px-2 py-0.5 rounded text-[#111714] font-bold font-mono">
                      AFTER PREVIEW
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors flex items-center gap-1.5"
                  >
                    <span>Next: Space Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SPACE SPECS */}
            {currentStep === 2 && (
              <div className="bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl p-6 md:p-8 space-y-6 ambient-shadow">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block mb-1">
                    Step 02 / 05
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EFE7]">
                    Space Specifications & Narrative
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                      Transformation Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The Indiranagar Japandi Nook"
                      className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-sm text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                      Subtitle / Brief Summary
                    </label>
                    <textarea
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      rows={2}
                      placeholder="A rental bedroom converted into an architectural sanctuary with zero drilling..."
                      className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                        Aesthetic Style
                      </label>
                      <select
                        value={aesthetic}
                        onChange={(e) => setAesthetic(e.target.value)}
                        className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                      >
                        {AESTHETIC_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                        Space Type
                      </label>
                      <select
                        value={spaceType}
                        onChange={(e) => setSpaceType(e.target.value)}
                        className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                      >
                        {SPACE_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        placeholder="10x11 ft"
                        className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                        Area (Sq Ft)
                      </label>
                      <input
                        type="number"
                        value={areaSqFt}
                        onChange={(e) => setAreaSqFt(e.target.value)}
                        placeholder="110"
                        className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                        Location / City
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Indiranagar, Bangalore"
                        className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 text-xs text-[#898C83] hover:text-[#F2EFE7] uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors flex items-center gap-1.5"
                  >
                    <span>Next: Itemized Budget</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ITEMIZED BUDGET BUILDER */}
            {currentStep === 3 && (
              <div className="bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl p-6 md:p-8 space-y-6 ambient-shadow">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block mb-1">
                    Step 03 / 05
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EFE7]">
                    Itemized Budget Breakdown
                  </h3>
                  <p className="text-xs text-[#C0BBAF] mt-1">
                    Every piece must be accounted for with real pricing in INR.
                  </p>
                </div>

                {/* Existing Items Table */}
                <div className="space-y-2">
                  <div className="divide-y divide-[rgba(255,255,255,0.06)] bg-[#111714] rounded-lg border border-[rgba(216,193,154,0.1)] p-2">
                    {items.map((item, idx) => (
                      <div key={item.id} className="p-3 flex items-center justify-between text-xs gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#898C83]">{idx + 1}.</span>
                          <span className="font-medium text-[#F2EFE7]">{item.name}</span>
                          <span className="text-[10px] text-[#898C83]">({item.category})</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-serif text-[#D8C19A] font-semibold">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-[#898C83] hover:text-red-400 p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-[#202A24] rounded flex justify-between items-center text-xs">
                    <span className="text-[#898C83] uppercase tracking-wider">Total Running Budget</span>
                    <span className="font-serif text-lg text-[#D8C19A] font-bold">
                      ₹{totalCalculatedBudget.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Add New Item Form */}
                <form onSubmit={handleAddItem} className="p-4 bg-[#141c18] rounded-lg border border-[rgba(216,193,154,0.15)] space-y-3">
                  <span className="text-xs font-semibold text-[#D8C19A] uppercase tracking-wider block">
                    Add New Product Item
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Product name (e.g. Amber Mushroom Lamp)"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="p-2.5 bg-[#111714] border border-stone-800 rounded text-xs text-[#F2EFE7] focus:outline-none focus:border-[#D8C19A]"
                    />
                    <input
                      type="number"
                      placeholder="Price in ₹ INR"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="p-2.5 bg-[#111714] border border-stone-800 rounded text-xs text-[#F2EFE7] focus:outline-none focus:border-[#D8C19A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value as BudgetItem['category'])}
                      className="p-2.5 bg-[#111714] border border-stone-800 rounded text-xs text-[#F2EFE7]"
                    >
                      <option value="Lighting">Lighting</option>
                      <option value="Bedding">Bedding</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Wall Decor">Wall Decor</option>
                      <option value="Storage">Storage</option>
                      <option value="Rugs">Rugs</option>
                      <option value="Plants">Plants</option>
                      <option value="Desk Accessories">Desk Accessories</option>
                      <option value="Hardware">Hardware</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Retailer (e.g. Amazon India / IKEA)"
                      value={newItemRetailer}
                      onChange={(e) => setNewItemRetailer(e.target.value)}
                      className="p-2.5 bg-[#111714] border border-stone-800 rounded text-xs text-[#F2EFE7]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#202A24] border border-[#D8C19A]/40 text-[#D8C19A] hover:bg-[#D8C19A] hover:text-[#111714] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item to Ledger</span>
                  </button>
                </form>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 text-xs text-[#898C83] hover:text-[#F2EFE7] uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors flex items-center gap-1.5"
                  >
                    <span>Next: Story & Protocols</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: STORY & PROTOCOLS */}
            {currentStep === 4 && (
              <div className="bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl p-6 md:p-8 space-y-6 ambient-shadow">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block mb-1">
                    Step 04 / 05
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EFE7]">
                    Zero-Damage Rental Protocols
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                      Lighting Atmosphere Protocol
                    </label>
                    <textarea
                      value={lightingProtocol}
                      onChange={(e) => setLightingProtocol(e.target.value)}
                      rows={2}
                      placeholder="Specify color temperature (e.g. 2700K), diffuser types, sconces..."
                      className="w-full p-3 bg-[#111714] border border-[rgba(216,193,154,0.18)] rounded text-xs text-[#F2EFE7] focus:border-[#D8C19A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#D8C19A] font-semibold uppercase tracking-wider block mb-1">
                      Techniques (Drill-free & security deposit friendly)
                    </label>
                    <ul className="space-y-2 mb-3">
                      {techniques.map((tech, i) => (
                        <li key={i} className="p-2.5 bg-[#111714] rounded flex items-center justify-between text-[#C0BBAF]">
                          <span>{tech}</span>
                          <button onClick={() => handleRemoveTechnique(i)} className="text-[#898C83] hover:text-red-400 p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleAddTechnique} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a technique (e.g. Tension rods inside window recess)"
                        value={newTechnique}
                        onChange={(e) => setNewTechnique(e.target.value)}
                        className="flex-1 p-2 bg-[#111714] border border-stone-800 rounded text-xs text-[#F2EFE7] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 bg-[#202A24] border border-[#D8C19A]/30 text-[#D8C19A] rounded text-xs font-semibold"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 text-xs text-[#898C83] hover:text-[#F2EFE7] uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-2.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-colors flex items-center gap-1.5"
                  >
                    <span>Next: Review & Publish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: VERIFICATION & PUBLISH */}
            {currentStep === 5 && (
              <div className="bg-[#18211C] border border-[rgba(216,193,154,0.14)] rounded-xl p-6 md:p-8 space-y-6 ambient-shadow">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D8C19A] font-semibold block mb-1">
                    Step 05 / 05
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EFE7]">
                    Verification & Compliance
                  </h3>
                  <p className="text-xs text-[#C0BBAF] mt-1">
                    Review your makeover manifest before publishing live to the NOOKORA discovery network.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#202A24] border border-[rgba(216,193,154,0.15)] space-y-3 text-xs">
                  <div className="flex justify-between text-[#898C83]">
                    <span>Title:</span>
                    <strong className="text-[#F2EFE7]">{title || 'Untitled Transformation'}</strong>
                  </div>
                  <div className="flex justify-between text-[#898C83]">
                    <span>Aesthetic:</span>
                    <strong className="text-[#D8C19A]">{aesthetic}</strong>
                  </div>
                  <div className="flex justify-between text-[#898C83]">
                    <span>Dimensions:</span>
                    <strong className="text-[#F2EFE7]">{dimensions} ({areaSqFt} sq ft)</strong>
                  </div>
                  <div className="flex justify-between text-[#898C83]">
                    <span>Total Budget:</span>
                    <strong className="font-serif text-base text-[#D8C19A]">₹{totalCalculatedBudget.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between text-[#898C83]">
                    <span>Cataloged Products:</span>
                    <strong className="text-[#F2EFE7]">{items.length} items</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-[#C0BBAF] cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#D8C19A] rounded" />
                    <span>I confirm these prices represent real verified receipts.</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-[#C0BBAF] cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#D8C19A] rounded" />
                    <span>This makeover is 100% drill-free and safe for rental deposits.</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-4 py-2 text-xs text-[#898C83] hover:text-[#F2EFE7] uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePublish}
                    className="px-8 py-3.5 bg-[#D8C19A] text-[#111714] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#B89565] transition-all shadow-xl shadow-black/40 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Transformation</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Right Column: Live Feed Card Container */}
          <aside className="lg:col-span-3 sticky top-28 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#898C83] px-1">
              <span className="flex items-center gap-1.5 uppercase font-mono tracking-widest text-[#D8C19A]">
                <Eye className="w-3.5 h-3.5" />
                Live Preview
              </span>
              <span className="text-[10px]">Real-time render</span>
            </div>

            {/* Live Rendered Card */}
            <div className="bg-[#18211C] rounded-xl overflow-hidden border border-[rgba(216,193,154,0.18)] ambient-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#202A24]">
                <Image
                  src={afterImage}
                  alt="Live makeover preview"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-[#111714]/85 text-[#D8C19A] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                    {aesthetic}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-[#111714]/90 px-2 py-1 rounded text-[10px]">
                  <span className="font-serif text-[#D8C19A] font-semibold">
                    ₹{totalCalculatedBudget.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[#C0BBAF]">{dimensions}</span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] text-[#898C83] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D8C19A]" />
                  {location}
                </span>
                <h4 className="font-serif text-base text-[#F2EFE7] leading-snug">
                  {title || 'Your Room Title'}
                </h4>
                <p className="text-xs text-[#C0BBAF] line-clamp-2">
                  {subtitle || 'Your makeover story will appear here.'}
                </p>
                <div className="pt-2 border-t border-[rgba(216,193,154,0.08)] flex justify-between items-center text-[10px] text-[#898C83]">
                  <span>{items.length} Products</span>
                  <span className="text-[#929F87]">Drill-Free</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
