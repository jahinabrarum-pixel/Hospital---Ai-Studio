import React, { useState, useRef, useEffect } from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Calendar, 
  Clock, 
  UserCheck, 
  Ambulance, 
  FileText, 
  Minimize2, 
  Maximize2,
  Sparkles,
  CheckCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'reception' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'appointment' | 'emergency' | 'diagnostics' | 'doctors' | 'call';
    label: string;
  };
}

export const LiveChatWidget: React.FC = () => {
  const { language, openAppointmentModal, navigateTo, showToast } = useHospital();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isBn = language === 'bn';

  // Play subtle pleasant chime on message exchange
  const playChime = (frequency = 600) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy
    }
  };

  const getInitialMessages = (): ChatMessage[] => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return [
      {
        id: 'msg-welcome',
        sender: 'reception',
        text: isBn 
          ? 'আসসালামু আলাইকুম ও সুস্বাগতম! আমি ফাতেমা আক্তার, দেবীদ্বার মেডিলাব হাসপাতালের রিসেপশন ডেস্ক থেকে। আজ আপনাকে কীভাবে সাহায্য করতে পারি?'
          : 'Hello and welcome to Debidwar Medilab Hospital! I am Fatema Akter from the front desk reception team. How may we assist your health needs today?',
        timestamp: timeNow
      }
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);

  // Update initial message language if user toggles language before custom interaction
  useEffect(() => {
    if (!hasInteracted) {
      setMessages(getInitialMessages());
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, isMinimized, messages]);

  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setUnreadCount(0);
    } else {
      setIsOpen(false);
    }
  };

  const addReceptionReply = (text: string, action?: ChatMessage['action']) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'reception',
          text,
          timestamp: timeNow,
          action
        }
      ]);
      playChime(680);
      if (!isOpen || isMinimized) {
        setUnreadCount(prev => prev + 1);
      }
    }, 700);
  };

  const handleQuickOption = (type: string) => {
    setHasInteracted(true);
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let userText = '';
    let replyText = '';
    let replyAction: ChatMessage['action'] = undefined;

    switch (type) {
      case 'appointment':
        userText = isBn ? 'ডাক্তারের সিরিয়াল নিতে চাই' : 'I want to book a doctor appointment';
        replyText = isBn 
          ? 'নিশ্চয়ই! আমাদের বিভিন্ন বিভাগের অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের সিরিয়াল এখনই নিতে পারেন। নিচের বোতামে চাপ দিলে সরাসরি বুকিং ফর্মটি ওপেন হবে।'
          : 'Certainly! Our senior specialist doctors in Cardiology, Medicine, Gynecology, Pediatrics and Surgery are available. Click below to open the instant booking form:';
        replyAction = {
          type: 'appointment',
          label: isBn ? '📅 ডাক্তারের সিরিয়াল ফর্ম খুলুন' : '📅 Open Appointment Booking Form'
        };
        break;

      case 'emergency':
        userText = isBn ? 'জরুরি অ্যাম্বুলেন্স ও এমার্জেন্সি সেবা' : 'Emergency ambulance & critical care';
        replyText = isBn
          ? 'আমাদের ২৪/৭ এমার্জেন্সি ট্রমা কেয়ার ও আইসিইউ অ্যাম্বুলেন্স সদা প্রস্তুত। দ্রুত যোগাযোগের জন্য সরাসরি ০১৮১৯-৯৮৭৬৫৪ নম্বরে ডায়াল করুন অথবা এমার্জেন্সি পেজ দেখুন।'
          : 'Our 24/7 emergency trauma care and ICU ambulance service are ready on standby. For immediate dispatch, call 01819-987654 or view emergency protocols:';
        replyAction = {
          type: 'emergency',
          label: isBn ? '🚑 সরাসরি এমার্জেন্সি ডেস্ক কল করুন' : '🚑 Call Emergency Hotline (01819-987654)'
        };
        break;

      case 'diagnostics':
        userText = isBn ? 'ডায়াগনস্টিক টেস্ট ও রিপোর্ট ডেলিভারি' : 'Diagnostic test prices and report timing';
        replyText = isBn
          ? 'আমাদের ল্যাব ২৪ ঘণ্টা খোলা থাকে। আল্ট্রাসনোগ্রাম, ডিজিটাল এক্স-রে ও রক্তের রুটিন পরীক্ষার রিপোর্ট একই দিনে সন্ধ্যা ৬:০০ টার মধ্যে সংগ্রহ করা যায়। টেস্টের বিস্তারিত তথ্য দেখতে নিচে ক্লিক করুন।'
          : 'Our automated pathology lab is open 24/7. Routine blood, digital X-Ray, and ultrasonogram reports are delivered the same evening by 6:00 PM. View full diagnostic details:';
        replyAction = {
          type: 'diagnostics',
          label: isBn ? '🔬 ডায়াগনস্টিক সার্ভিস বিস্তারিত' : '🔬 View Diagnostics Information'
        };
        break;

      case 'hours':
        userText = isBn ? 'ডাক্তারদের চেম্বারের সময়সূচি' : 'Specialist chamber visiting hours';
        replyText = isBn
          ? 'বহিঃবিভাগে বিশেষজ্ঞ ডাক্তারগণ প্রতিদিন বিকাল ৪:০০ টা থেকে রাত ৯:০০ টা পর্যন্ত রোগী দেখেন। তবে জরুরি বিভাগ ও ইনডোর ২৪ ঘণ্টাই খোলা রয়েছে।'
          : 'Consultant specialists visit in the evening shifts from 4:00 PM to 9:00 PM daily. However, our Emergency Care & Inpatient admissions are open 24 hours every day.';
        replyAction = {
          type: 'doctors',
          label: isBn ? '👨‍⚕️ ডাক্তারদের তালিকা ও শিডিউল' : '👨‍⚕️ View Doctor Directory & Schedule'
        };
        break;

      case 'call':
        userText = isBn ? 'রিসেপশনে সরাসরি কথা বলতে চাই' : 'I want to speak with reception by phone';
        replyText = isBn
          ? 'আমাদের রিসেপশন ডেস্ক ও হেল্পলাইনের সরাসরি নম্বর: ০১৭১১-২৩৪৫৬৭। এখনই সরাসরি কল করতে পারেন।'
          : 'You can directly connect with our front desk reception operator by dialing: 01711-234567. Tap below to call:';
        replyAction = {
          type: 'call',
          label: isBn ? '📞 ০১৭১১-২৩৪৫৬৭ এ কল দিন' : '📞 Call 01711-234567'
        };
        break;

      default:
        break;
    }

    setMessages(prev => [
      ...prev,
      {
        id: `msg-user-${Date.now()}`,
        sender: 'user',
        text: userText,
        timestamp: timeNow
      }
    ]);
    playChime(520);
    addReceptionReply(replyText, replyAction);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setHasInteracted(true);
    const userText = inputVal.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setInputVal('');

    setMessages(prev => [
      ...prev,
      {
        id: `msg-user-${Date.now()}`,
        sender: 'user',
        text: userText,
        timestamp: timeNow
      }
    ]);
    playChime(520);

    const lower = userText.toLowerCase();

    // Contextual responses based on patient queries
    if (lower.includes('appointment') || lower.includes('serial') || lower.includes('সিরিয়াল') || lower.includes('বুক') || lower.includes('ডাক্তার')) {
      addReceptionReply(
        isBn 
          ? 'ডাক্তারের সিরিয়াল বুকিংয়ের জন্য আমাদের অনলাইন পোর্টাল ২৪ ঘণ্টা সক্রিয়। আপনি এখনই ডাক্তারের নাম ও সময় নির্ধারণ করতে পারেন।'
          : 'Our doctor appointment booking system is active 24/7. You can book an appointment with our specialist physicians right away.',
        { type: 'appointment', label: isBn ? '📅 ডাক্তারের অ্যাপয়েন্টমেন্ট বুক করুন' : '📅 Book Doctor Appointment' }
      );
    } else if (lower.includes('emergency') || lower.includes('ambulance') || lower.includes('জরুরি') || lower.includes('অ্যাম্বুলেন্স') || lower.includes('দুর্ঘটনা')) {
      addReceptionReply(
        isBn
          ? 'জরুরি চিকিৎসা বা অ্যাম্বুলেন্স প্রয়োজনে অবিলম্বে আমাদের জরুরি হটলাইন ০১৮১৯-৯৮৭৬৫৪ এ ডায়াল করুন।'
          : 'For immediate trauma or ambulance dispatch, call our 24/7 emergency hotline at 01819-987654.',
        { type: 'emergency', label: isBn ? '🚑 জরুরি হটলাইনে কল দিন' : '🚑 Dial Emergency Hotline' }
      );
    } else if (lower.includes('test') || lower.includes('report') || lower.includes('রিপোর্ট') || lower.includes('টেস্ট') || lower.includes('ল্যাব')) {
      addReceptionReply(
        isBn
          ? 'আমাদের ডায়াগনস্টিক ল্যাবের রিপোর্ট পেতে আপনার ইনভয়েস নম্বর সাথে রাখুন। অধিকাংশ রক্ত পরীক্ষা ও এক্স-রে রিপোর্ট ৪-৬ ঘণ্টার মধ্যে পাওয়া যায়।'
          : 'Digital diagnostic reports are delivered on the same day. Please keep your invoice slip ready for collection at the ground floor diagnostic counter.',
        { type: 'diagnostics', label: isBn ? '🔬 ডায়াগনস্টিক তথ্য দেখুন' : '🔬 Diagnostics Center Details' }
      );
    } else if (lower.includes('fee') || lower.includes('cost') || lower.includes('খরচ') || lower.includes('ফি') || lower.includes('টাকা')) {
      addReceptionReply(
        isBn
          ? 'আমাদের বিশেষজ্ঞ ডাক্তারদের ভিজিট সাধারণত ৫০০ থেকে ৮০০ টাকা। এছাড়াও স্বাস্থ্য প্যাকেজে বিশেষ ছাড় রয়েছে।'
          : 'Specialist doctor consultation fees range between 500 to 800 BDT. Discounted comprehensive health packages are also available.',
        { type: 'appointment', label: isBn ? '📋 স্বাস্থ্য প্যাকেজ ও ফি' : '📋 Check Packages & Booking' }
      );
    } else if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('কোথায়') || lower.includes('ঠিকানা') || lower.includes('লোকেশন')) {
      addReceptionReply(
        isBn
          ? 'আমাদের ঠিকানা: দেবীদ্বার মেডিলাব হাসপাতাল, হসপিটাল রোড, দেবীদ্বার, কুমিল্লা (উপজেলা পরিষদের বিপরীত পাশে)।'
          : 'Our Hospital Address: Debidwar Medilab Hospital, Hospital Road, Debidwar, Cumilla (Opposite Upazila Parishad). Convenient parking & wheelchair access available.'
      );
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('সালাম') || lower.includes('salam')) {
      addReceptionReply(
        isBn
          ? 'ওয়ালাইকুম আসসালাম! আপনি কোন বিভাগের ডাক্তারের বিষয়ে জানতে চান বা কোনো টেস্ট করাতে চান কি না জানাবেন।'
          : 'Hello! Please let us know if you need assistance with doctor appointments, emergency care, or diagnostic lab tests.'
      );
    } else {
      addReceptionReply(
        isBn
          ? 'ধন্যবাদ আপনার বার্তার জন্য। আপনার অনুরোধটি আমাদের কর্তব্যরত রিসেপশনিস্ট লগ করেছেন। সরাসরি তথ্যের জন্য হেল্পলাইন ০১৭১১-২৩৪৫৬৭ এ যোগাযোগ করতে পারেন।'
          : 'Thank you for reaching out. Your inquiry has been noted by our front desk. For direct inquiries, feel free to call our desk at 01711-234567.',
        { type: 'call', label: isBn ? '📞 ০১৭১১-২৩৪৫৬৭ এ কল করুন' : '📞 Call Reception: 01711-234567' }
      );
    }
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (!action) return;
    if (action.type === 'appointment') {
      openAppointmentModal();
      showToast(isBn ? 'অ্যাপয়েন্টমেন্ট বুকিং ফর্ম ওপেন করা হয়েছে' : 'Appointment booking modal opened', 'info');
    } else if (action.type === 'emergency') {
      window.location.href = 'tel:+8801819987654';
    } else if (action.type === 'diagnostics') {
      navigateTo('diagnostics');
      setIsOpen(false);
    } else if (action.type === 'doctors') {
      navigateTo('doctors');
      setIsOpen(false);
    } else if (action.type === 'call') {
      window.location.href = 'tel:+8801711234567';
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Floating Callout Bubble for first time visitors */}
        {!isOpen && unreadCount > 0 && (
          <div 
            onClick={handleToggleOpen}
            className="mb-2 bg-white text-slate-800 px-3.5 py-2 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-2 text-xs font-semibold cursor-pointer hover:border-[#1769D2] hover:text-[#1769D2] transition-all transform hover:-translate-y-0.5 animate-bounce"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>
              {isBn ? 'রিসেপশনে কথা বলুন (অনলাইন)' : 'Chat with Reception (Online)'}
            </span>
            <X 
              className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 ml-1" 
              onClick={(e) => {
                e.stopPropagation();
                setUnreadCount(0);
              }} 
            />
          </div>
        )}

        <button
          onClick={handleToggleOpen}
          aria-label={isBn ? 'রিসেপশন লাইভ চ্যাট' : 'Reception Live Chat'}
          className={`group relative p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer ${
            isOpen 
              ? 'bg-[#142B45] text-white hover:bg-slate-800' 
              : 'bg-gradient-to-r from-[#1769D2] to-[#0E9F92] text-white hover:scale-105 shadow-blue-500/30'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
              {/* Online Green Pulsing Badge */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </>
          )}

          {/* Unread Message Pill badge */}
          {!isOpen && unreadCount > 0 && (
            <span className="absolute -bottom-1 -left-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Box Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[390px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized ? 'h-[64px]' : 'h-[530px] max-h-[80vh]'
          }`}
          role="dialog"
          aria-label="Reception Live Chat"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#142B45] via-[#1769D2] to-[#0E9F92] text-white px-4 py-3 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-white border border-white/30 text-sm">
                  👩‍⚕️
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#142B45] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight">
                    {isBn ? 'ফাতেমা আক্তার' : 'Fatema Akter'}
                  </h3>
                  <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-sm font-medium text-blue-50">
                    {isBn ? 'ডিউটি রিসেপশন' : 'Front Desk'}
                  </span>
                </div>
                <div className="text-[11px] text-blue-100/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  <span>{isBn ? 'অনলাইন | তাৎক্ষণিক সাড়া' : 'Online | Typically replies instantly'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <a
                href="tel:+8801711234567"
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title={isBn ? 'সরাসরি ফোন করুন' : 'Call Reception'}
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg hover:text-white transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content (Visible when not minimized) */}
          {!isMinimized && (
            <>
              {/* Quick Info Ribbon */}
              <div className="bg-blue-50/70 border-b border-blue-100/80 px-3.5 py-1.5 text-[11px] text-slate-600 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[#1769D2] font-medium">
                  <Sparkles className="w-3 h-3" />
                  {isBn ? 'দেবীদ্বার মেডিলাব পেশেন্ট কেয়ার' : 'Debidwar Medilab Patient Care'}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {isBn ? '২৪/৭ সার্ভিস চালু' : '24/7 Desk Active'}
                </span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFD]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#1769D2] text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {/* Embedded Interactive Action Button */}
                      {msg.action && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => handleActionClick(msg.action)}
                            className="w-full text-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-1.5 px-3 rounded-lg text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                          >
                            <span>{msg.action.label}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'user' && (
                        <CheckCheck className="w-3 h-3 text-[#1769D2]" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Receptionist Typing Animation */}
                {isTyping && (
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-2xl rounded-bl-xs border border-slate-200 w-fit text-[11px] text-slate-500 shadow-xs">
                    <span className="font-medium text-[#1769D2]">
                      {isBn ? 'ফাতেমা টাইপ করছেন' : 'Fatema is typing'}
                    </span>
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Pre-set Quick Action Suggestions Chips */}
              <div className="bg-white border-t border-slate-100 px-3 py-2 shrink-0">
                <div className="text-[10px] text-slate-400 font-semibold mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-teal-600" />
                  {isBn ? 'দ্রুত জানতে বেছে নিন:' : 'Frequently Asked:'}
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  <button
                    onClick={() => handleQuickOption('appointment')}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-medium border border-blue-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-3 h-3" />
                    {isBn ? 'ডাক্তারের সিরিয়াল' : 'Doctor Serial'}
                  </button>
                  <button
                    onClick={() => handleQuickOption('emergency')}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-medium border border-rose-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Ambulance className="w-3 h-3" />
                    {isBn ? 'অ্যাম্বুলেন্স হটলাইন' : 'Ambulance'}
                  </button>
                  <button
                    onClick={() => handleQuickOption('diagnostics')}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-700 text-[11px] font-medium border border-teal-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3 h-3" />
                    {isBn ? 'টেস্টের রিপোর্ট' : 'Lab Reports'}
                  </button>
                  <button
                    onClick={() => handleQuickOption('hours')}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-medium border border-amber-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Clock className="w-3 h-3" />
                    {isBn ? 'চেম্বার সময়' : 'Visiting Hours'}
                  </button>
                  <button
                    onClick={() => handleQuickOption('call')}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium border border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    {isBn ? 'সরাসরি ফোন' : 'Call Desk'}
                  </button>
                </div>
              </div>

              {/* Input Form */}
              <form 
                onSubmit={handleSendMessage}
                className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={isBn ? 'রিসেপশনে বার্তা লিখুন...' : 'Write your message to reception...'}
                  className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:border-[#1769D2] outline-none transition-all placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim()}
                  className="p-2.5 rounded-xl bg-[#1769D2] text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};
