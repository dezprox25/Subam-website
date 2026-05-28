// import React, { useEffect, useRef, useState } from 'react';

// function Reveal({ children, delay = 0, as: Tag = 'div' as any, style = {}, className = '', ...rest }: any) {
//   const ref = useRef<any>(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     if (reduced) { setVisible(true); return; }
//     const el = ref.current;
//     if (!el) return;
//     const io = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
//       { threshold: 0.12 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);
//   return (
//     <Tag
//       ref={ref}
//       className={className}
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible ? 'translateY(0)' : 'translateY(28px)',
//         transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
//         transitionDelay: `${delay}ms`,
//         ...style,
//       }}
//       {...rest}
//     >
//       {children}
//     </Tag>
//   );
// }

// const jobs = [
//   {
//     title: "Junior Architect",
//     type: "Full-time",
//     location: "Chennai",
//     desc: "We are looking for a passionate architect with a focus on sustainable design and natural materials."
//   },
//   {
//     title: "Civil Engineer",
//     type: "Full-time",
//     location: "Chennai / Site",
//     desc: "Join our execution team to manage site operations for alternative building projects."
//   },
//   {
//     title: "Site Supervisor",
//     type: "Full-time / Project-based",
//     location: "Various Locations",
//     desc: "Experience in traditional construction methods like rammed earth and mud blocks is preferred."
//   }
// ];

// const countryCodes = [
//   { code: '+91', name: 'India' },
//   { code: '+1', name: 'USA/Canada' },
//   { code: '+44', name: 'UK' },
//   { code: '+61', name: 'Australia' },
//   { code: '+971', name: 'UAE' },
// ];

// export default function Careers() {
//   const [mounted, setMounted] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     countryCode: '+91',
//     phone: '',
//     currentTitle: '',
//     experience: '',
//     resume: null as File | null,
//     coverLetter: '',
//     portfolioUrl: '',
//     availability: '',
//     salaryExpectation: '',
//     emergencyName: '',
//     emergencyRelation: '',
//     emergencyPhone: '',
//     consent: false
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => { setMounted(true); }, []);

//   const validate = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d{10,12}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = 'Invalid phone number';
//     }
//     if (formData.experience && (parseInt(formData.experience) < 0 || parseInt(formData.experience) > 50)) {
//       newErrors.experience = 'Experience must be between 0 and 50 years';
//     }
//     if (!formData.resume) {
//       newErrors.resume = 'Resume/CV is required';
//     } else {
//       const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//       if (!allowedTypes.includes(formData.resume.type)) {
//         newErrors.resume = 'Only PDF, DOC, or DOCX formats are allowed';
//       } else if (formData.resume.size > 5 * 1024 * 1024) {
//         newErrors.resume = 'File size must be less than 5MB';
//       }
//     }
//     if (formData.portfolioUrl && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.portfolioUrl)) {
//       newErrors.portfolioUrl = 'Invalid URL format';
//     }
//     if (!formData.availability) newErrors.availability = 'Availability date is required';
//     if (!formData.emergencyName.trim()) newErrors.emergencyName = 'Emergency contact name is required';
//     if (!formData.emergencyRelation.trim()) newErrors.emergencyRelation = 'Relationship is required';
//     if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
//     if (!formData.consent) newErrors.consent = 'You must consent to data processing';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors(prev => {
//         const updated = { ...prev };
//         delete updated[name];
//         return updated;
//       });
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
//       if (errors.resume) {
//         setErrors(prev => {
//           const updated = { ...prev };
//           delete updated.resume;
//           return updated;
//         });
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     // Simulate API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setSubmitted(true);
//     } catch (error) {
//       setErrors({ submit: 'Something went wrong. Please try again later.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-brand-bg text-brand-dark font-sans min-h-screen">
//       <header className="relative w-full h-[60vh] overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1521737706042-5a810f968d1b?w=1920"
//           alt="Architectural team working together"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F]/60 via-[#1F1F1F]/35 to-[#1F1F1F]/15" />
//         <div className="absolute left-[6%] bottom-[15%] z-10 max-w-[700px]">
//           <span className="top-title text-white/80 mb-4">Join Our Journey</span>
//           <h1 className="font-serif text-[44px] md:text-[62px] font-normal text-white leading-tight m-0">
//             Build a Sustainable Future <br /><span className="italic">With Us.</span>
//           </h1>
//         </div>
//       </header>

//       <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 lg:py-32">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20">
//           <div>
//             <Reveal>
//               <span className="top-title mb-3">Work at Shubham</span>
//               <h2 className="font-serif text-[36px] text-brand-earth mt-3 mb-6 leading-tight">Reviving Wisdom, One Project at a Time.</h2>
//               <p className="mb-12 opacity-80">
//                 At Shubham Consulting and Construction, we don&apos;t just build structures; we build ecosystems. We are looking for individuals who share our passion for natural materials, traditional wisdom, and climate-responsive engineering.
//               </p>
              
//               <div className="space-y-6">
//                 <h3 className="font-serif text-[28px] text-brand-earth mb-8">Open Positions</h3>
//                 {jobs.map((job, i) => (
//                   <div key={i} className="group p-8 border border-brand-earth/15 hover:border-brand-earth/40 transition-all duration-300 rounded-[2px] bg-brand-bg shadow-sm hover:shadow-md">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h4 className="font-serif text-[24px] text-brand-earth m-0">{job.title}</h4>
//                         <span className="top-title text-[10px] mt-2">{job.type} · {job.location}</span>
//                       </div>
//                     </div>
//                     <p className="m-0 text-sm opacity-80 leading-relaxed">{job.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </Reveal>
//           </div>

//           <div>
//             <Reveal delay={200} className="bg-brand-parchment p-8 md:p-14 rounded-[4px] shadow-sm border border-brand-earth/10">
//               {submitted ? (
//                 <div className="text-center py-20">
//                   <div className="w-20 h-20 bg-brand-earth/10 text-brand-earth rounded-full flex items-center justify-center mx-auto mb-8">
//                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
//                   </div>
//                   <h2 className="font-serif text-[36px] text-brand-earth mb-4">Application Received</h2>
//                   <p className="text-brand-dark/70 mb-10">Thank you for your interest in Shubham Consulting & Construction. Our team will review your application and get back to you shortly.</p>
//                   <button 
//                     onClick={() => setSubmitted(false)}
//                     className="bg-brand-earth text-white px-10 py-4 text-[12px] uppercase tracking-[0.2em] rounded-[2px] hover:bg-brand-earth-light transition-all"
//                   >
//                     Submit Another Application
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <h3 className="font-serif text-[32px] text-brand-earth mb-2">Apply Directly</h3>
//                   <p className="mb-12 opacity-60 text-sm">Complete the form below to submit your application to our recruitment team.</p>

//                   <form onSubmit={handleSubmit} className="space-y-10">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                       <div>
//                         <label className="top-title mb-3">Full Name*</label>
//                         <input
//                           type="text"
//                           name="fullName"
//                           value={formData.fullName}
//                           onChange={handleChange}
//                           className={`w-full bg-transparent border-b ${errors.fullName ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                           placeholder="Your Name"
//                         />
//                         {errors.fullName && <span className="text-[10px] text-red-500 mt-1 block">{errors.fullName}</span>}
//                       </div>
//                       <div>
//                         <label className="top-title mb-3">Email Address*</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           className={`w-full bg-transparent border-b ${errors.email ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                           placeholder="your.email@example.com"
//                         />
//                         {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                       <div>
//                         <label className="top-title mb-3">Phone Number*</label>
//                         <div className="flex gap-4">
//                           <select 
//                             name="countryCode"
//                             value={formData.countryCode}
//                             onChange={handleChange}
//                             className="bg-transparent border-b border-brand-earth/30 py-2 outline-none focus:border-brand-earth transition-colors"
//                           >
//                             {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code} ({c.name})</option>)}
//                           </select>
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className={`flex-1 bg-transparent border-b ${errors.phone ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                             placeholder="Phone Number"
//                           />
//                         </div>
//                         {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
//                       </div>
//                       <div>
//                         <label className="top-title mb-3">Current Position</label>
//                         <input
//                           type="text"
//                           name="currentTitle"
//                           value={formData.currentTitle}
//                           onChange={handleChange}
//                           className="w-full bg-transparent border-b border-brand-earth/30 py-2 focus:border-brand-earth outline-none transition-colors"
//                           placeholder="e.g. Junior Architect"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                       <div>
//                         <label className="top-title mb-3">Years of Experience</label>
//                         <input
//                           type="number"
//                           name="experience"
//                           value={formData.experience}
//                           onChange={handleChange}
//                           className={`w-full bg-transparent border-b ${errors.experience ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                           placeholder="0-50"
//                         />
//                         {errors.experience && <span className="text-[10px] text-red-500 mt-1 block">{errors.experience}</span>}
//                       </div>
//                       <div>
//                         <label className="top-title mb-3">Portfolio/LinkedIn URL</label>
//                         <input
//                           type="url"
//                           name="portfolioUrl"
//                           value={formData.portfolioUrl}
//                           onChange={handleChange}
//                           className={`w-full bg-transparent border-b ${errors.portfolioUrl ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                           placeholder="https://..."
//                         />
//                         {errors.portfolioUrl && <span className="text-[10px] text-red-500 mt-1 block">{errors.portfolioUrl}</span>}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                       <div>
//                         <label className="top-title mb-3">Availability to Start*</label>
//                         <input
//                           type="date"
//                           name="availability"
//                           value={formData.availability}
//                           onChange={handleChange}
//                           className={`w-full bg-transparent border-b ${errors.availability ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                         />
//                         {errors.availability && <span className="text-[10px] text-red-500 mt-1 block">{errors.availability}</span>}
//                       </div>
//                       <div>
//                         <label className="top-title mb-3">Desired Salary (Optional)</label>
//                         <input
//                           type="number"
//                           name="salaryExpectation"
//                           value={formData.salaryExpectation}
//                           onChange={handleChange}
//                           className="w-full bg-transparent border-b border-brand-earth/30 py-2 focus:border-brand-earth outline-none transition-colors"
//                           placeholder="Expected Monthly/Annual"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="top-title mb-4 block">Resume/CV (PDF, DOC, DOCX - Max 5MB)*</label>
//                       <div className={`relative border-2 border-dashed ${errors.resume ? 'border-red-400 bg-red-50/10' : 'border-brand-earth/20 bg-brand-bg/40'} rounded-[4px] p-8 text-center transition-all hover:bg-brand-bg/60`}>
//                         <input
//                           type="file"
//                           accept=".pdf,.doc,.docx"
//                           onChange={handleFileChange}
//                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                         />
//                         <div className="flex flex-col items-center">
//                           <svg className="w-8 h-8 text-brand-earth/40 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
//                           <span className="text-sm text-brand-dark/60">
//                             {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
//                           </span>
//                         </div>
//                       </div>
//                       {errors.resume && <span className="text-[10px] text-red-500 mt-2 block">{errors.resume}</span>}
//                     </div>

//                     <div>
//                       <label className="top-title mb-3">Cover Letter</label>
//                       <textarea
//                         name="coverLetter"
//                         value={formData.coverLetter}
//                         onChange={handleChange}
//                         rows={6}
//                         className="w-full bg-transparent border border-brand-earth/20 rounded-[4px] p-5 focus:border-brand-earth outline-none transition-colors resize-none"
//                         placeholder="Tell us why you want to join Shubham..."
//                       />
//                     </div>

//                     <div className="pt-8 border-t border-brand-earth/10">
//                       <h4 className="top-title mb-8">Emergency Contact Information*</h4>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div>
//                           <label className="text-[10px] uppercase tracking-wider text-brand-muted mb-2 block">Name</label>
//                           <input
//                             type="text"
//                             name="emergencyName"
//                             value={formData.emergencyName}
//                             onChange={handleChange}
//                             className={`w-full bg-transparent border-b ${errors.emergencyName ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                           />
//                         </div>
//                         <div>
//                           <label className="text-[10px] uppercase tracking-wider text-brand-muted mb-2 block">Relationship</label>
//                           <input
//                             type="text"
//                             name="emergencyRelation"
//                             value={formData.emergencyRelation}
//                             onChange={handleChange}
//                             className={`w-full bg-transparent border-b ${errors.emergencyRelation ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                           />
//                         </div>
//                         <div>
//                           <label className="text-[10px] uppercase tracking-wider text-brand-muted mb-2 block">Phone</label>
//                           <input
//                             type="tel"
//                             name="emergencyPhone"
//                             value={formData.emergencyPhone}
//                             onChange={handleChange}
//                             className={`w-full bg-transparent border-b ${errors.emergencyPhone ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
//                           />
//                         </div>
//                       </div>
//                       {(errors.emergencyName || errors.emergencyRelation || errors.emergencyPhone) && 
//                         <span className="text-[10px] text-red-500 mt-2 block">All emergency contact fields are required</span>
//                       }
//                     </div>

//                     <div className="flex items-start gap-4 py-4">
//                       <input
//                         type="checkbox"
//                         name="consent"
//                         id="consent"
//                         checked={formData.consent}
//                         onChange={handleChange}
//                         className="mt-1 accent-brand-earth"
//                       />
//                       <label htmlFor="consent" className="text-sm opacity-70 leading-relaxed cursor-pointer select-none">
//                         I confirm that the information provided is accurate and I consent to Shubham Consulting & Construction processing my personal data for recruitment purposes.*
//                       </label>
//                     </div>
//                     {errors.consent && <span className="text-[10px] text-red-500 block -mt-2">{errors.consent}</span>}

//                     {errors.submit && <div className="p-4 bg-red-50 text-red-500 text-sm rounded-[2px]">{errors.submit}</div>}

//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className={`w-full bg-brand-earth text-white font-sans text-[12px] uppercase tracking-[0.2em] py-6 rounded-[2px] hover:bg-brand-earth-light transition-all duration-300 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                     >
//                       {loading ? (
//                         <>
//                           <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
//                           Submitting Application...
//                         </>
//                       ) : 'Submit Application'}
//                     </button>
//                   </form>
//                 </>
//               )}
//             </Reveal>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from 'react';

function Reveal({ children, delay = 0, as: Tag = 'div' as any, style = {}, className = '', ...rest }: any) {
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
        transitionDelay: `${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const jobs = [
  {
    title: "Junior Architect",
    type: "Full-time",
    location: "Chennai",
    desc: "We are looking for a passionate architect with a focus on sustainable design and natural materials."
  },
  {
    title: "Civil Engineer",
    type: "Full-time",
    location: "Chennai / Site",
    desc: "Join our execution team to manage site operations for alternative building projects."
  },
  {
    title: "Site Supervisor",
    type: "Full-time / Project-based",
    location: "Various Locations",
    desc: "Experience in traditional construction methods like rammed earth and mud blocks is preferred."
  }
];

const countryCodes = [
  { code: '+91', name: 'India' },
  { code: '+1', name: 'USA/Canada' },
  { code: '+44', name: 'UK' },
  { code: '+61', name: 'Australia' },
  { code: '+971', name: 'UAE' },
];

export default function Careers() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    currentTitle: '',
    experience: '',
    portfolioUrl: '',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,12}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (formData.experience && (parseInt(formData.experience) < 0 || parseInt(formData.experience) > 50)) {
      newErrors.experience = 'Experience must be between 0 and 50 years';
    }
    if (formData.portfolioUrl && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.portfolioUrl)) {
      newErrors.portfolioUrl = 'Invalid URL format';
    }
    if (!formData.consent) newErrors.consent = 'You must consent to data processing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg text-brand-dark font-sans min-h-screen">
      <header className="relative w-full h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400"
          alt="Architectural team working together"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F1F]/60 via-[#1F1F1F]/35 to-[#1F1F1F]/15" />
        <div className="absolute left-[6%] bottom-[15%] z-10 max-w-[700px]">
          <span className="top-title text-white/80 mb-4">Join Our Journey</span>
          <h1 className="font-serif text-[44px] md:text-[62px] font-normal text-white leading-tight m-0">
            Build a Sustainable Future <br /><span className="italic">With Us.</span>
          </h1>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20">
          <div>
            <Reveal>
              <span className="top-title mb-3">Work at Shubham</span>
              <h2 className="font-serif text-[36px] text-brand-earth mt-3 mb-6 leading-tight">Reviving Wisdom, One Project at a Time.</h2>
              <p className="mb-12 opacity-80">
                At Shubham Consulting and Construction, we don&apos;t just build structures; we build ecosystems. We are looking for individuals who share our passion for natural materials, traditional wisdom, and climate-responsive engineering.
              </p>

              <div className="space-y-6">
                <h3 className="font-serif text-[28px] text-brand-earth mb-8">Open Positions</h3>
                {jobs.map((job, i) => (
                  <div key={i} className="group p-8 border border-brand-earth/15 hover:border-brand-earth/40 transition-all duration-300 rounded-[2px] bg-brand-bg shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-serif text-[24px] text-brand-earth m-0">{job.title}</h4>
                        <span className="top-title text-[10px] mt-2">{job.type} · {job.location}</span>
                      </div>
                    </div>
                    <p className="m-0 text-sm opacity-80 leading-relaxed">{job.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={200} className="bg-brand-parchment p-8 md:p-14 rounded-[4px] shadow-sm border border-brand-earth/10">
              {submitted ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-brand-earth/10 text-brand-earth rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="font-serif text-[36px] text-brand-earth mb-4">Application Received</h2>
                  <p className="text-brand-dark/70 mb-10">Thank you for your interest in Shubham Consulting & Construction. Our team will review your application and get back to you shortly.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-brand-earth text-white px-10 py-4 text-[12px] uppercase tracking-[0.2em] rounded-[2px] hover:bg-brand-earth-light transition-all"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-[32px] text-brand-earth mb-2">Apply Directly</h3>
                  <p className="mb-12 opacity-60 text-sm">Complete the form below to submit your application to our recruitment team.</p>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <label className="top-title mb-3">Full Name*</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${errors.fullName ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
                          placeholder="Your Name"
                        />
                        {errors.fullName && <span className="text-[10px] text-red-500 mt-1 block">{errors.fullName}</span>}
                      </div>
                      <div>
                        <label className="top-title mb-3">Email Address*</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${errors.email ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <label className="top-title mb-3">Phone Number*</label>
                        <div className="flex gap-4">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="bg-transparent border-b border-brand-earth/30 py-2 outline-none focus:border-brand-earth transition-colors"
                          >
                            {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code} ({c.name})</option>)}
                          </select>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`flex-1 bg-transparent border-b ${errors.phone ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
                            placeholder="Phone Number"
                          />
                        </div>
                        {errors.phone && <span className="text-[10px] text-red-500 mt-1 block">{errors.phone}</span>}
                      </div>
                      <div>
                        <label className="top-title mb-3">Current Position</label>
                        <input
                          type="text"
                          name="currentTitle"
                          value={formData.currentTitle}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-brand-earth/30 py-2 focus:border-brand-earth outline-none transition-colors"
                          placeholder="e.g. Junior Architect"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <label className="top-title mb-3">Years of Experience</label>
                        <input
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${errors.experience ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
                          placeholder="0-50"
                        />
                        {errors.experience && <span className="text-[10px] text-red-500 mt-1 block">{errors.experience}</span>}
                      </div>
                      <div>
                        <label className="top-title mb-3">Portfolio/LinkedIn URL</label>
                        <input
                          type="url"
                          name="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={handleChange}
                          className={`w-full bg-transparent border-b ${errors.portfolioUrl ? 'border-red-400' : 'border-brand-earth/30'} py-2 focus:border-brand-earth outline-none transition-colors`}
                          placeholder="https://..."
                        />
                        {errors.portfolioUrl && <span className="text-[10px] text-red-500 mt-1 block">{errors.portfolioUrl}</span>}
                      </div>
                    </div>

                    <div className="flex items-start gap-4 py-4">
                      <input
                        type="checkbox"
                        name="consent"
                        id="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 accent-brand-earth"
                      />
                      <label htmlFor="consent" className="text-sm opacity-70 leading-relaxed cursor-pointer select-none">
                        I confirm that the information provided is accurate and I consent to Shubham Consulting & Construction processing my personal data for recruitment purposes.*
                      </label>
                    </div>
                    {errors.consent && <span className="text-[10px] text-red-500 block -mt-2">{errors.consent}</span>}

                    {errors.submit && <div className="p-4 bg-red-50 text-red-500 text-sm rounded-[2px]">{errors.submit}</div>}

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-brand-earth text-white font-sans text-[12px] uppercase tracking-[0.2em] py-6 rounded-[2px] hover:bg-brand-earth-light transition-all duration-300 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Submitting Application...
                        </>
                      ) : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}