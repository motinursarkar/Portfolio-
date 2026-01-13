
import React, { useState, useEffect, useRef } from 'react';

type Step = 'number' | 'otp' | 'pin' | 'success';

export const BkashPayment: React.FC = () => {
  const [step, setStep] = useState<Step>('number');
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSmsToast, setShowSmsToast] = useState(false);

  const otpRef = useRef<HTMLInputElement>(null);
  const pinRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'otp') otpRef.current?.focus();
    if (step === 'pin') pinRef.current?.focus();
  }, [step]);

  const handleNext = () => {
    setError(null);

    if (step === 'number') {
      if (number.length !== 11 || !number.startsWith('01')) {
        setError('Please enter a valid 11-digit bKash number (starts with 01)');
        return;
      }
      
      setIsProcessing(true);
      // Simulate API call to SMS Gateway
      setTimeout(() => {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(newOtp);
        setIsProcessing(false);
        setStep('otp');
        
        // Trigger simulated SMS Toast
        setShowSmsToast(true);
        setTimeout(() => setShowSmsToast(false), 8000);
      }, 1800);
    } 
    
    else if (step === 'otp') {
      if (otp !== generatedOtp) {
        setError('Incorrect verification code. Please check the simulated SMS notification.');
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('pin');
      }, 800);
    } 
    
    else if (step === 'pin') {
      if (pin.length < 5) {
        setError('Please enter your 5-digit bKash PIN');
        return;
      }
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
      }, 2000);
    }
  };

  const reset = () => {
    setStep('number');
    setNumber('');
    setOtp('');
    setPin('');
    setGeneratedOtp('');
    setError(null);
    setShowSmsToast(false);
  };

  return (
    <div className="relative">
      {/* Simulated SMS Notification Toast */}
      {showSmsToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black/90 text-white p-4 rounded-2xl shadow-2xl z-[100] animate-in slide-in-from-top-10 duration-500 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-comment-sms text-sm"></i>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">Messages • Just now</p>
              <p className="text-sm font-bold">bKash OTP</p>
            </div>
          </div>
          <p className="text-sm text-slate-200">
            Your bKash verification code is <span className="text-white font-mono font-bold text-base underline decoration-primary">{generatedOtp}</span>. Do not share this code with anyone.
          </p>
          <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[shrink_8s_linear_forwards]"></div>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-2xl relative border-4 border-slate-200 transition-all duration-300">
        {/* bKash Header */}
        <div className="bg-[#e2136e] p-6 flex flex-col items-center">
          <img 
            src="https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg" 
            alt="bKash" 
            className="h-16 invert"
          />
        </div>

        <div className="p-8 bg-slate-50 min-h-[420px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-600 font-medium text-sm">Merchant: <span className="text-slate-900 font-bold">Motinur Sarkar</span></span>
            <span className="text-[#e2136e] font-extrabold text-lg">BDT 500.00</span>
          </div>

          <div className="flex-1">
            {step === 'number' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-slate-700">Enter your bKash Account Number</label>
                <input 
                  type="text" 
                  autoFocus
                  maxLength={11}
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value.replace(/\D/g, ''));
                    setError(null);
                  }}
                  placeholder="01XXXXXXXXX"
                  className={`w-full border-2 rounded p-4 text-xl tracking-widest text-slate-800 outline-none transition-colors ${error ? 'border-red-500' : 'border-slate-300 focus:border-[#e2136e]'}`}
                />
                <p className="text-[10px] text-slate-500 text-center italic">Example: 01712345678</p>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 text-center">
                <label className="block text-sm font-bold text-slate-700">6-Digit Verification Code</label>
                <p className="text-xs text-slate-500 mb-2">Check the notification at the top of your screen</p>
                <input 
                  ref={otpRef}
                  type="text" 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ''));
                    setError(null);
                  }}
                  placeholder="XXXXXX"
                  className={`w-full border-2 rounded p-4 text-xl tracking-[0.5em] text-center text-slate-800 outline-none transition-colors ${error ? 'border-red-500' : 'border-slate-300 focus:border-[#e2136e]'}`}
                />
                <button 
                  onClick={() => setShowSmsToast(true)}
                  className="text-xs text-[#e2136e] font-bold hover:underline"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            )}

            {step === 'pin' && (
              <div className="space-y-4 animate-in slide-in-from-right-4 duration-300 text-center">
                <label className="block text-sm font-bold text-slate-700">Enter bKash PIN</label>
                <input 
                  ref={pinRef}
                  type="password" 
                  maxLength={5}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, ''));
                    setError(null);
                  }}
                  placeholder="XXXXX"
                  className={`w-full border-2 rounded p-4 text-xl tracking-[1em] text-center text-slate-800 outline-none transition-colors ${error ? 'border-red-500' : 'border-slate-300 focus:border-[#e2136e]'}`}
                />
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center py-4 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <i className="fa-solid fa-check text-4xl text-white"></i>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-800">Payment Successful!</h2>
                <p className="text-slate-500 mb-8">Transaction ID: 9K8L7M6N5P</p>
                <button 
                  onClick={reset}
                  className="bg-[#e2136e] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#c1105d] transition-all uppercase"
                >
                  New Payment
                </button>
              </div>
            )}

            {error && !isProcessing && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-4 animate-in fade-in slide-in-from-top-2">
                <p className="text-red-700 text-xs font-bold">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {error}
                </p>
              </div>
            )}
          </div>

          {step !== 'success' && (
            <div className="mt-auto pt-6 flex gap-4">
              <button 
                disabled={isProcessing}
                onClick={() => step === 'number' ? null : setStep('number')}
                className="flex-1 bg-slate-400 text-white font-bold py-3 uppercase tracking-wider hover:bg-slate-500 disabled:opacity-50 transition-colors"
              >
                {step === 'number' ? 'Close' : 'Back'}
              </button>
              <button 
                disabled={isProcessing}
                onClick={handleNext}
                className="flex-[1.5] bg-[#e2136e] text-white font-bold py-3 uppercase tracking-wider hover:bg-[#c1105d] disabled:opacity-50 flex items-center justify-center transition-all shadow-lg active:scale-95"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                    <span>Verifying...</span>
                  </div>
                ) : 'Confirm'}
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-[#e2136e] p-3 text-center text-white text-[10px] font-bold flex justify-center items-center gap-4">
          <span><i className="fa-solid fa-phone mr-1"></i> 16247</span>
          <span className="opacity-50">|</span>
          <span>Secure Demo Payment</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />
    </div>
  );
};
