
import React, { useState } from 'react';

type Step = 'number' | 'otp' | 'pin' | 'success';

export const BkashPayment: React.FC = () => {
  const [step, setStep] = useState<Step>('number');
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (step === 'number') setStep('otp');
      else if (step === 'otp') setStep('pin');
      else if (step === 'pin') setStep('success');
    }, 1200);
  };

  const reset = () => {
    setStep('number');
    setNumber('');
    setOtp('');
    setPin('');
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
          <i className="fa-solid fa-check text-4xl text-white"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-slate-400 mb-8">Thank you for supporting Motinur's work.</p>
        <button 
          onClick={reset}
          className="bg-primary px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
        >
          New Donation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-2xl relative border-4 border-slate-200">
      {/* bKash Header */}
      <div className="bg-[#e2136e] p-6 flex flex-col items-center">
        <img 
          src="https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg" 
          alt="bKash" 
          className="h-16 invert"
        />
      </div>

      <div className="p-8 bg-slate-50">
        <div className="flex justify-between items-center mb-6">
          <span className="text-slate-600 font-medium">Merchant: <span className="text-slate-900">Motinur Sarkar</span></span>
          <span className="text-[#e2136e] font-bold">BDT 500.00</span>
        </div>

        {step === 'number' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <label className="block text-sm font-bold text-slate-700">Enter Your bKash Account Number</label>
            <input 
              type="text" 
              maxLength={11}
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 017XXXXXXXX"
              className="w-full border-2 border-slate-300 rounded p-4 text-xl tracking-widest text-slate-800 outline-none focus:border-[#e2136e] transition-colors"
            />
            <p className="text-[10px] text-slate-500 leading-tight">By clicking on confirm, you are agreeing to the terms & conditions.</p>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <label className="block text-sm font-bold text-slate-700">Enter Verification Code (OTP)</label>
            <input 
              type="text" 
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="XXXXXX"
              className="w-full border-2 border-slate-300 rounded p-4 text-xl tracking-widest text-center text-slate-800 outline-none focus:border-[#e2136e]"
            />
            <p className="text-xs text-[#e2136e] text-center font-medium cursor-pointer">Resend Code?</p>
          </div>
        )}

        {step === 'pin' && (
          <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <label className="block text-sm font-bold text-slate-700">Enter bKash PIN</label>
            <input 
              type="password" 
              maxLength={5}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="XXXXX"
              className="w-full border-2 border-slate-300 rounded p-4 text-xl tracking-[1em] text-center text-slate-800 outline-none focus:border-[#e2136e]"
            />
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button 
            disabled={isProcessing}
            onClick={() => step === 'number' ? null : setStep(step === 'otp' ? 'number' : 'otp')}
            className="flex-1 bg-slate-400 text-white font-bold py-3 uppercase tracking-wider hover:bg-slate-500 disabled:opacity-50"
          >
            Close
          </button>
          <button 
            disabled={isProcessing || (step === 'number' && number.length < 11)}
            onClick={handleNext}
            className="flex-[1.5] bg-[#e2136e] text-white font-bold py-3 uppercase tracking-wider hover:bg-[#c1105d] disabled:opacity-50 flex items-center justify-center"
          >
            {isProcessing ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : 'Confirm'}
          </button>
        </div>
      </div>
      
      <div className="bg-[#e2136e] p-3 text-center text-white text-[10px] font-bold">
        <i className="fa-solid fa-phone mr-2"></i> 16247
      </div>
    </div>
  );
};
