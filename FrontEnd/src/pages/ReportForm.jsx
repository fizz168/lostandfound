// // import { useRef, useState } from 'react'
// // import { useNavigate } from 'react-router-dom'

// // function ReportForm({ type, addItem }) {
// //   const navigate = useNavigate()
// //   const formRef = useRef(null)
// //   const [step, setStep] = useState(1);
// //   const [form, setForm] = useState({ name:"", category:"", description:"", date:"", location:"", contactEmail:"", contactPhone:"" });
// //   const [submitted, setSubmitted] = useState(false);
// //   const set = (k,v) => setForm(f => ({...f, [k]:v}));

// //   const defaultImage = type === "found"
// //     ? "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80"
// //     : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"

// //   const goToNextStep = () => {
// //     if (formRef.current?.reportValidity()) {
// //       setStep(2)
// //     }
// //   }

// //   const handleSubmit = async (event) => {
// //     event.preventDefault()

// //     if (!formRef.current?.reportValidity()) {
// //       return
// //     }

// //     const payload = {
// //       type,
// //       status: type === "found" ? "found" : "lost",
// //       name: form.name || `${type === "found" ? "Found" : "Lost"} Item`,
// //       category: form.category || "Other",
// //       description: form.description || "No description provided.",
// //       location: form.location || "Unknown location",
// //       date: form.date || new Date().toISOString().slice(0, 10),
// //       reporter: form.contactEmail || "Anonymous",
// //       // email: form.contactEmail || "anonymous@university.edu",
// //       // phone: form.contactPhone || "",
// //       img: defaultImage,
// //     }

// //     try {
// //       const apiBase = import.meta.env.VITE_API_BASE || ''
// //       const res = await fetch(`${apiBase}/api/items`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload),
// //       })

// //       if (!res.ok) {
// //         const err = await res.json().catch(() => ({}))
// //         throw new Error(err.error || 'Failed to submit report')
// //       }

// //       await res.json()
// //       if (addItem) addItem()
// //       setSubmitted(true)
// //     } catch (err) {
// //       // basic error handling; show browser alert for now
// //       alert(err.message || 'Submission failed')
// //     }
// //   }
 
// //   if (submitted) return (
// //     <div className="max-w-lg mx-auto px-4 py-16 text-center">
// //       <div className="text-5xl mb-4">{type === "found" ? "" : ""}</div>
// //       <h2 className=" bg-blue text-2xl font-bold text-gray-800 mb-2">Item Reported!</h2>
// //       <p className="text-gray-500 mb-6">Your {type} item has been submitted. Please take the item to career center.</p>
      
// //       <button onClick={() => navigate("/browse")} className="bg-indigo-600 text-gray-600 px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-semibold">Browse Items</button>
// //     </div>
// //   );
 
// //   const accent = type === "found" ? "bg-indigo-600" : "bg-red-500";
// //   const accentHover = type === "found" ? "hover:bg-indigo-700" : "hover:bg-red-600";
 
// //   return (
// //     <div className="max-w-lg mx-auto px-4 py-8">
// //       <button onClick={() => navigate("/")} className="text-sm text-indigo-600 hover:underline mb-4">← Back</button>
// //       <h1 className="text-2xl font-bold text-gray-800 mb-1">Report {type === "found" ? "Found" : "Lost"} Item</h1>
// //       <p className="text-sm text-gray-500 mb-6">
// //         {type === "found" ? "Thank you for being a good samaritan! Help us reunite this item with its owner." : "Help us help you find your lost item by providing detailed information."}
// //       </p>
 
// //       {/* Progress */}
// //       <div className="flex items-center gap-2 mb-6">
// //         {[1,2].map(s => (
// //           <div key={s} className="flex items-center gap-2 flex-1">
// //             <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${step >= s ? accent : "bg-gray-200 text-gray-400"}`}>{s}</div>
// //             <div className={`flex-1 h-1 rounded-full ${step > s ? accent : "bg-gray-200"}`} />
// //           </div>
// //         ))}
// //         <span className="text-xs text-gray-400">Step {step} of 2</span>
// //       </div>
 
// //       <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
// //         {step === 1 ? (
// //           <>
// //             <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
// //               <span className="text-gray-600">Status: </span>
// //               <span className="font-semibold text-blue-600">{type === "found" ? "Found" : "Lost"}</span>
// //             </div>
// //             <h2 className="font-semibold text-gray-700">Item Information</h2>
// //             {[
// //               { label: "Item Name *", key: "name", placeholder: type === "found" ? "e.g., Wallet, Keys, Laptop" : "e.g., MacBook Pro, Blue Backpack" },
// //               { label: "Description *", key: "description", placeholder: "Describe the item (color, brand, condition, etc.)", textarea: true },
// //               { label: "Date " + (type === "found" ? "Found" : "Lost") + " *", key: "date", type: "date" },
// //               { label: "Location " + (type === "found" ? "Found" : "Lost") + " *", key: "location", placeholder: "e.g., Student Center Cafeteria" },
// //             ].map(f => (
// //               <div key={f.key}>
// //                 <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
// //                 {f.textarea
// //                   ? <textarea value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} rows={3} required
// //                       className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 resize-none" />
// //                   : <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type || "text"} required
// //                       className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
// //                 }
// //               </div>
// //             ))}
// //             <div>
// //               <label className="block text-xs font-semibold text-gray-500 mb-1">Category *</label>
// //               <select value={form.category} onChange={e => set("category", e.target.value)} required
// //                 className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
// //                 <option value="">Select a category</option>
// //                 {["Electronics","Personal Items","Bags","Books","Keys","School Supplies","Other"].map(c => <option key={c}>{c}</option>)}
// //               </select>
// //             </div>
// //             <button type="button" onClick={goToNextStep} className={`w-full ${accent} ${accentHover} text-gray-600 font-semibold py-2.5 rounded-xl transition-colors text-sm`}>
// //               Next: Contact & Upload →
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             <h2 className="font-semibold text-gray-700">Contact Details</h2>
// //             {[
// //               { label: "Email *", key: "contactEmail", placeholder: "your@university.edu", type: "email" },
// //               { label: "Phone (optional)", key: "contactPhone", placeholder: "(555) 000-0000", type: "tel" },
// //             ].map(f => (
// //               <div key={f.key}>
// //                 <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
// //                 <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type} required={f.key === "contactEmail"}
// //                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
// //               </div>
// //             ))}
// //             <div>
// //               <label className="block text-xs font-semibold text-gray-500 mb-1">Upload Photo (optional)</label>
// //               <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm cursor-pointer hover:border-indigo-300 transition-colors">
// //                 📷 Click to upload an image
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">← Back</button>
// //               <button type="submit" className={`flex-1 ${accent} ${accentHover} text-gray-600 font-semibold py-2.5 rounded-xl transition-colors text-sm`}>Submit Report</button>
// //             </div>
// //           </>
// //         )}
// //       </form>
// //     </div>
// //   );
// // }
// // export default ReportForm;

// import { useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function ReportForm({ type, addItem }) {
//   const navigate = useNavigate()
//   const formRef = useRef(null)
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({ name:"", category:"", description:"", date:"", location:"", contactEmail:"", contactPhone:"" });
//   const [submitted, setSubmitted] = useState(false);

//   // ── IMAGE UPLOAD STATE (new) ──
//   const [preview, setPreview] = useState(null)
//   const [imageUrl, setImageUrl] = useState('')
//   const [uploading, setUploading] = useState(false)

//   const set = (k,v) => setForm(f => ({...f, [k]:v}));

//   const defaultImage = type === "found"
//     ? "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80"
//     : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"

//   // ── IMAGE UPLOAD HANDLER (new) ──
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     setPreview(URL.createObjectURL(file)) // show preview instantly

//     const formData = new FormData()
//     formData.append('image', file)
//     setUploading(true)

//     try {
//       const apiBase = import.meta.env.VITE_API_BASE || ''
//       const res = await fetch(`${apiBase}/api/upload`, {
//         method: 'POST',
//         body: formData,
//       })
//       if (!res.ok) {
//         const errData = await res.json()
//         throw new Error(errData.error || 'Upload failed')
//       }
//       const data = await res.json()
//       setImageUrl(data.url)
//     } catch (err) {
//       console.error('Upload error:', err)
//       alert(`Image upload failed: ${err.message}`)
//     } finally {
//       setUploading(false)
//     }
//   }

//   const goToNextStep = () => {
//     if (formRef.current?.reportValidity()) {
//       setStep(2)
//     }
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     if (!formRef.current?.reportValidity()) return

//     const payload = {
//       type,
//       status: type === "found" ? "found" : "lost",
//       name: form.name || `${type === "found" ? "Found" : "Lost"} Item`,
//       category: form.category || "Other",
//       description: form.description || "No description provided.",
//       location: form.location || "Unknown location",
//       date: form.date || new Date().toISOString().slice(0, 10),
//       reporter: form.contactEmail || "Anonymous",
//       img: imageUrl || defaultImage, // ── use uploaded image, fallback to default
//     }

//     try {
//       const apiBase = import.meta.env.VITE_API_BASE || ''
//       const res = await fetch(`${apiBase}/api/items`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       })
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}))
//         throw new Error(err.error || 'Failed to submit report')
//       }
//       await res.json()
//       if (addItem) addItem()
//       setSubmitted(true)
//     } catch (err) {
//       alert(err.message || 'Submission failed')
//     }
//   }

//   if (submitted) return (
//     <div className="max-w-lg mx-auto px-4 py-16 text-center">
//       <div className="text-5xl mb-4">{type === "found" ? "🎉" : "📢"}</div>
//       <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Reported!</h2>
//       <p className="text-gray-500 mb-6">Your {type} item has been submitted. Please take the item to career center.</p>
//       <button onClick={() => navigate("/browse")} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-semibold">Browse Items</button>
//     </div>
//   );

//   const accent = type === "found" ? "bg-indigo-600" : "bg-red-500";
//   const accentHover = type === "found" ? "hover:bg-indigo-700" : "hover:bg-red-600";

//   return (
//     <div className="max-w-lg mx-auto px-4 py-8">
//       <button onClick={() => navigate("/")} className="text-sm text-indigo-600 hover:underline mb-4">← Back</button>
//       <h1 className="text-2xl font-bold text-gray-800 mb-1">Report {type === "found" ? "Found" : "Lost"} Item</h1>
//       <p className="text-sm text-gray-500 mb-6">
//         {type === "found" ? "Thank you for being a good samaritan! Help us reunite this item with its owner." : "Help us help you find your lost item by providing detailed information."}
//       </p>

//       {/* Progress */}
//       <div className="flex items-center gap-2 mb-6">
//         {[1,2].map(s => (
//           <div key={s} className="flex items-center gap-2 flex-1">
//             <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${step >= s ? accent : "bg-gray-200 text-gray-400"}`}>{s}</div>
//             <div className={`flex-1 h-1 rounded-full ${step > s ? accent : "bg-gray-200"}`} />
//           </div>
//         ))}
//         <span className="text-xs text-gray-400">Step {step} of 2</span>
//       </div>

//       <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
//         {step === 1 ? (
//           <>
//             <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
//               <span className="text-gray-600">Status: </span>
//               <span className="font-semibold text-blue-600">{type === "found" ? "Found" : "Lost"}</span>
//             </div>
//             <h2 className="font-semibold text-gray-700">Item Information</h2>
//             {[
//               { label: "Item Name *", key: "name", placeholder: type === "found" ? "e.g., Wallet, Keys, Laptop" : "e.g., MacBook Pro, Blue Backpack" },
//               { label: "Description *", key: "description", placeholder: "Describe the item (color, brand, condition, etc.)", textarea: true },
//               { label: "Date " + (type === "found" ? "Found" : "Lost") + " *", key: "date", type: "date" },
//               { label: "Location " + (type === "found" ? "Found" : "Lost") + " *", key: "location", placeholder: "e.g., Student Center Cafeteria" },
//             ].map(f => (
//               <div key={f.key}>
//                 <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
//                 {f.textarea
//                   ? <textarea value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} rows={3} required
//                       className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 resize-none" />
//                   : <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type || "text"} required
//                       className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
//                 }
//               </div>
//             ))}
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 mb-1">Category *</label>
//               <select value={form.category} onChange={e => set("category", e.target.value)} required
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
//                 <option value="">Select a category</option>
//                 {["Electronics","Personal Items","Bags","Books","Keys","School Supplies","Other"].map(c => <option key={c}>{c}</option>)}
//               </select>
//             </div>
//             <button type="button" onClick={goToNextStep} className={`w-full ${accent} ${accentHover} text-white font-semibold py-2.5 rounded-xl transition-colors text-sm`}>
//               Next: Contact & Upload →
//             </button>
//           </>
//         ) : (
//           <>
//             <h2 className="font-semibold text-gray-700">Contact Details</h2>
//             {[
//               { label: "Email *", key: "contactEmail", placeholder: "your@university.edu", type: "email" },
//               { label: "Phone (optional)", key: "contactPhone", placeholder: "(555) 000-0000", type: "tel" },
//             ].map(f => (
//               <div key={f.key}>
//                 <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
//                 <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type} required={f.key === "contactEmail"}
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
//               </div>
//             ))}

//             {/* ── IMAGE UPLOAD (updated) ── */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 mb-1">Upload Photo (optional)</label>
//               <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm cursor-pointer hover:border-indigo-300 transition-colors block">
//                 {uploading ? (
//                   <span className="text-indigo-400 font-medium">Uploading...</span>
//                 ) : preview ? (
//                   <img src={preview} alt="preview" className="mx-auto max-h-40 rounded-lg object-cover" />
//                 ) : (
//                   <span>📷 Click to upload an image</span>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>
//               {imageUrl && (
//                 <p className="mt-1 text-xs text-green-600 font-medium">✓ Image uploaded successfully</p>
//               )}
//             </div>

//             <div className="flex gap-3">
//               <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">← Back</button>
//               <button type="submit" disabled={uploading} className={`flex-1 ${accent} ${accentHover} text-white font-semibold py-2.5 rounded-xl transition-colors text-sm disabled:opacity-60`}>
//                 {uploading ? 'Uploading...' : 'Submit Report'}
//               </button>
//             </div>
//           </>
//         )}
//       </form>
//     </div>
//   );
// }
// export default ReportForm;

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ReportForm({ type, addItem }) {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", category:"", description:"", date:"", location:"", contactEmail:"", contactPhone:"" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── IMAGE UPLOAD STATE (new) ──
  const [preview, setPreview] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const set = (k,v) => setForm(f => ({...f, [k]:v}));

  const defaultImage = type === "found"
    ? "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80"
    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"

  // ── IMAGE UPLOAD HANDLER (new) ──
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file)) // show preview instantly

    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const apiBase = import.meta.env.VITE_API_BASE || ''
      const res = await fetch(`${apiBase}/api/upload`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Upload failed')
      }
      const data = await res.json()
      setImageUrl(data.url)
    } catch (err) {
      console.error('Upload error:', err)
      alert(`Image upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  const goToNextStep = () => {
    if (formRef.current?.reportValidity()) {
      setStep(2)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return
    if (!formRef.current?.reportValidity()) return
    setSubmitting(true)

    const payload = {
      type,
      status: type === "found" ? "found" : "lost",
      name: form.name || `${type === "found" ? "Found" : "Lost"} Item`,
      category: form.category || "Other",
      description: form.description || "No description provided.",
      location: form.location || "Unknown location",
      date: form.date || new Date().toISOString().slice(0, 10),
      reporter: form.contactEmail || "Anonymous",
      img: imageUrl || defaultImage, // ── use uploaded image, fallback to default
    }

    try {
      const apiBase = import.meta.env.VITE_API_BASE || ''
      const res = await fetch(`${apiBase}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Failed to submit report')
      }
      await res.json()
      if (addItem) addItem()
      setSubmitted(true)
    } catch (err) {
      alert(err.message || 'Submission failed')
      setSubmitting(false)       // ← unlock on error so user can retry
    }
  }

  if (submitted) return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">{type === "found" ? "" : ""}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Reported!</h2>
      <p className="text-gray-500 mb-6">Your {type} item has been submitted. Please take the item to career center.</p>
      <button onClick={() => navigate("/browse")} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-semibold">Browse Items</button>
    </div>
  );

  const accent = type === "found" ? "bg-indigo-600" : "bg-red-500";
  const accentHover = type === "found" ? "hover:bg-indigo-700" : "hover:bg-red-600";

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button onClick={() => navigate("/")} className="text-sm text-indigo-600 hover:underline mb-4">← Back</button>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Report {type === "found" ? "Found" : "Lost"} Item</h1>
      <p className="text-sm text-gray-500 mb-6">
        {type === "found" ? "Thank you for being a good samaritan! Help us reunite this item with its owner." : "Help us help you find your lost item by providing detailed information."}
      </p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1,2].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${step >= s ? accent : "bg-gray-200 text-gray-400"}`}>{s}</div>
            <div className={`flex-1 h-1 rounded-full ${step > s ? accent : "bg-gray-200"}`} />
          </div>
        ))}
        <span className="text-xs text-gray-400">Step {step} of 2</span>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        {step === 1 ? (
          <>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              <span className="text-gray-600">Status: </span>
              <span className="font-semibold text-blue-600">{type === "found" ? "Found" : "Lost"}</span>
            </div>
            <h2 className="font-semibold text-gray-700">Item Information</h2>
            {[
              { label: "Item Name *", key: "name", placeholder: type === "found" ? "e.g., Wallet, Keys, Laptop" : "e.g., MacBook Pro, Blue Backpack" },
              { label: "Description *", key: "description", placeholder: "Describe the item (color, brand, condition, etc.)", textarea: true },
              { label: "Date " + (type === "found" ? "Found" : "Lost") + " *", key: "date", type: "date" },
              { label: "Location " + (type === "found" ? "Found" : "Lost") + " *", key: "location", placeholder: "e.g., Student Center Cafeteria" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
                {f.textarea
                  ? <textarea value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} rows={3} required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 resize-none" />
                  : <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type || "text"} required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
                }
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Category *</label>
              <select value={form.category} onChange={e => set("category", e.target.value)} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                <option value="">Select a category</option>
                {["Electronics","Personal Items","Bags","Books","Keys","School Supplies","Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <button type="button" onClick={goToNextStep} className={`w-full ${accent} ${accentHover} text-white font-semibold py-2.5 rounded-xl transition-colors text-sm`}>
              Next: Contact & Upload →
            </button>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-gray-700">Contact Details</h2>
            {[
              { label: "Email *", key: "contactEmail", placeholder: "your@university.edu", type: "email" },
              { label: "Phone (optional)", key: "contactPhone", placeholder: "(555) 000-0000", type: "tel" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-500 mb-1">{f.label}</label>
                <input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type} required={f.key === "contactEmail"}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300" />
              </div>
            ))}

            {/* ── IMAGE UPLOAD (updated) ── */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Upload Photo (optional)</label>
              <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm cursor-pointer hover:border-indigo-300 transition-colors block">
                {uploading ? (
                  <span className="text-indigo-400 font-medium">Uploading...</span>
                ) : preview ? (
                  <img src={preview} alt="preview" className="mx-auto max-h-40 rounded-lg object-cover" />
                ) : (
                  <span>📷 Click to upload an image</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {imageUrl && (
                <p className="mt-1 text-xs text-green-600 font-medium">✓ Image uploaded successfully</p>
              )}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">← Back</button>
              <button type="submit" disabled={uploading || submitting} className={`flex-1 ${accent} ${accentHover} text-white font-semibold py-2.5 rounded-xl transition-colors text-sm disabled:opacity-60`}>
                {submitting ? 'Submitting...' : uploading ? 'Uploading...' : 'Submit Report'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
export default ReportForm;