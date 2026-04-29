import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ─── KONFIGURASI EMAILJS ─────────────────────────────────────────────────────
// 1. Daftar di https://www.emailjs.com (gratis, 200 email/bulan)
// 2. Buat Email Service → dapat SERVICE_ID
// 3. Buat Email Template → dapat TEMPLATE_ID
//    Di template, gunakan variabel: {{from_name}}, {{from_email}}, {{message}}
// 4. Salin Public Key dari Account → API Keys
const EMAILJS_SERVICE_ID = 'service_e907917';     // ganti ini
const EMAILJS_TEMPLATE_ID = 'template_l4rmyzp';   // ganti ini
const EMAILJS_PUBLIC_KEY = 'FwTtCeKVXa0mVs8Ar';      // ganti ini
// ─────────────────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [fields, setFields] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Validasi dasar
    if (!fields.from_name.trim() || !fields.from_email.trim() || !fields.message.trim()) {
      setFormState('error');
      setErrorMessage('Semua field harus diisi.');
      setTimeout(() => setFormState('idle'), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.from_email)) {
      setFormState('error');
      setErrorMessage('Format email tidak valid.');
      setTimeout(() => setFormState('idle'), 3000);
      return;
    }

    setFormState('loading');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: fields.from_name,
          from_email: fields.from_email,
          message: fields.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setFormState('success');
      setFields({ from_name: '', from_email: '', message: '' });

      // Reset ke idle setelah 5 detik
      setTimeout(() => setFormState('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setFormState('error');
      setErrorMessage('Gagal mengirim pesan. Coba lagi.');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  const isLoading = formState === 'loading';

  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden grain">
      {/* Smooth Background Transition Gradient */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Left column */}
          <div className="flex-1">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-neon-purple mb-4">Connect</h2>
            <h3 className="text-6xl font-bold tracking-tighter mb-8 italic">
              Let's create <br />something <span className="text-zinc-600">extraordinary.</span>
            </h3>
            <p className="text-zinc-400 text-lg mb-12">
              Ready to take your digital presence to the next level? Drop a message and let's start the conversation.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <Mail className="w-5 h-5 text-neon-purple" />
                </div>
                <span>alexaalkahfihanan@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <MessageSquare className="w-5 h-5 text-neon-blue" />
                </div>
                <span>+62 8121-518-7858</span>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="flex-1">
            <motion.form
              ref={formRef}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-[2.5rem] relative"
              onSubmit={e => e.preventDefault()}
            >
              <div className="space-y-8">
                {/* Name */}
                <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
                    <User className="w-3 h-3" /> Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={fields.from_name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={fields.from_email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message */}
                <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all text-sm resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Status feedback */}
                {formState === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-2xl px-4 py-3 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Pesan terkirim! Kami akan menghubungi kamu segera.</span>
                  </motion.div>
                )}

                {formState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 rounded-2xl px-4 py-3 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || formState === 'success'}
                  className="w-full group py-5 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform overflow-hidden relative disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        Sending...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : formState === 'success' ? (
                      <>
                        Sent! <CheckCircle className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Send Message{' '}
                        <Send className="w-4 h-4 translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-neon-purple scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-50" />
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}