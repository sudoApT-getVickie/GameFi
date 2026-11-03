"use client";

import React from "react";
import { Loader2, CheckCircle2, Phone, Building } from "lucide-react";

interface TransferModalProps {
  isOpen: boolean;
  step: "authorizing" | "success";
  fromCurrency: string;
  fromAmount: number;
  toCurrency: string;
  toAmount: number;
  account: string;
  rail: string;
  onClose: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  step,
  fromCurrency,
  fromAmount,
  toCurrency,
  toAmount,
  account,
  rail,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-brand-surface border border-brand-border p-6 shadow-2xl text-center">
        {step === "authorizing" ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Loader2 className="w-12 h-12 text-brand-emerald animate-spin" />
              {rail === "M-Pesa" ? (
                <Phone className="w-5 h-5 absolute inset-0 m-auto text-brand-emerald" />
              ) : (
                <Building className="w-5 h-5 absolute inset-0 m-auto text-brand-cyan" />
              )}
            </div>
            <h3 className="text-lg font-bold">Simulating Payment Rail</h3>
            <p className="text-sm text-gray-400 mt-2">
              {rail === "M-Pesa"
                ? `Prompting M-Pesa STK PIN entry on ${account}...`
                : `Authorizing PayShap instant bank settlement for ${account}...`}
            </p>
            <div className="mt-4 px-3 py-2 rounded-lg bg-brand-dark border border-brand-border text-xs text-left w-full text-gray-300">
              <div className="flex justify-between">
                <span>Sending:</span>
                <span className="font-semibold text-white">{fromAmount} {fromCurrency}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Expected Payout:</span>
                <span className="font-semibold text-brand-emerald">{toAmount.toFixed(2)} {toCurrency}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-brand-emerald mb-4" />
            <h3 className="text-lg font-bold">Settlement Confirmed!</h3>
            <p className="text-sm text-gray-400 mt-1">
              Funds converted and disbursed via {rail}.
            </p>
            <div className="w-full bg-brand-dark p-3 rounded-lg border border-brand-border my-4 text-xs">
              <span className="text-gray-400">Recipient Account:</span>
              <p className="font-mono text-white mt-0.5">{account}</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-brand-emerald text-brand-dark font-bold hover:brightness-110 transition-all text-sm"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
