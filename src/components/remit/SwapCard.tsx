"use client";

import React, { useState } from "react";
import { ArrowDownUp, Shield, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { CurrencyCode, PaymentRail } from "@/types";
import { TransferModal } from "./TransferModal";

const ZAR_TO_KES_RATE = 7.84;

export const SwapCard = () => {
  const { zarBalance, kesBalance, executeTransfer } = useAppStore();
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("ZAR");
  const [amount, setAmount] = useState<string>("500");
  const [account, setAccount] = useState<string>("+254 712 345 678");
  const [modalState, setModalState] = useState<{ open: boolean; step: "authorizing" | "success" }>({
    open: false,
    step: "authorizing",
  });

  const toCurrency: CurrencyCode = fromCurrency === "ZAR" ? "KES" : "ZAR";
  const numAmount = parseFloat(amount) || 0;
  const rate = fromCurrency === "ZAR" ? ZAR_TO_KES_RATE : 1 / ZAR_TO_KES_RATE;
  const convertedAmount = numAmount * rate;
  const activeRail: PaymentRail = toCurrency === "KES" ? "M-Pesa" : "PayShap";

  const handleFlip = () => {
    setFromCurrency(toCurrency);
    setAccount(toCurrency === "KES" ? "082 123 4567" : "+254 712 345 678");
  };

  const handleTransfer = async () => {
    if (numAmount <= 0) return;
    setModalState({ open: true, step: "authorizing" });
    const success = await executeTransfer({
      fromAmount: numAmount,
      fromCurrency,
      toAmount: convertedAmount,
      toCurrency,
      recipientAccount: account,
      rail: activeRail,
    });
    if (success) {
      setModalState({ open: true, step: "success" });
    } else {
      setModalState({ open: false, step: "authorizing" });
      alert("Insufficient mock wallet balance!");
    }
  };

  return (
    <div className="w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold flex items-center gap-2">
          <span>Corridor Transfer</span>
          <span className="text-[11px] font-normal text-brand-emerald bg-brand-emerald/10 px-2 py-0.5 rounded-full border border-brand-emerald/20">
            0% Spread Active
          </span>
        </h2>
        <span className="text-xs text-gray-400">
          Balance: {fromCurrency === "ZAR" ? `R ${zarBalance}` : `KES ${kesBalance}`}
        </span>
      </div>

      <div className="space-y-3">
        <div className="bg-brand-dark p-3 rounded-xl border border-brand-border">
          <label className="text-[11px] text-gray-400 font-semibold block mb-1">YOU SEND</label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl font-bold focus:outline-none w-2/3 text-white"
              placeholder="0.00"
            />
            <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-sm font-bold">
              {fromCurrency}
            </span>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleFlip}
            className="p-2 rounded-full bg-brand-surface border border-brand-border hover:border-brand-emerald text-gray-300 transition-colors"
          >
            <ArrowDownUp className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-brand-dark p-3 rounded-xl border border-brand-border">
          <label className="text-[11px] text-gray-400 font-semibold block mb-1">RECIPIENT RECEIVES (ESTIMATED)</label>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-brand-emerald">{convertedAmount.toFixed(2)}</span>
            <span className="px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-sm font-bold">
              {toCurrency}
            </span>
          </div>
        </div>

        <div className="bg-brand-dark/50 p-3 rounded-xl border border-brand-border/70 space-y-2">
          <label className="text-[11px] text-gray-400 font-semibold block">
            RECEIVING DESTINATION ({activeRail})
          </label>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full bg-brand-dark px-3 py-2 rounded-lg border border-brand-border text-sm font-mono text-white focus:outline-none focus:border-brand-emerald"
            placeholder={toCurrency === "KES" ? "+254 7XX XXX XXX" : "Recipient ShapID / Account"}
          />
        </div>

        <div className="p-2.5 rounded-lg bg-brand-emerald/5 border border-brand-emerald/15 flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
            <span>Rate: 1 {fromCurrency} ≈ {rate.toFixed(4)} {toCurrency}</span>
          </div>
          <span className="text-brand-emerald font-semibold">+5 $VELD Reward</span>
        </div>

        <button
          onClick={handleTransfer}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-400 hover:brightness-110 text-brand-dark font-extrabold text-sm transition-all shadow-lg shadow-brand-emerald/10"
        >
          Dispatch Transfer via {activeRail}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
          <Shield className="w-3.5 h-3.5 text-gray-400" />
          <span>Non-Custodial Settlement Vault Backing</span>
        </div>
      </div>

      <TransferModal
        isOpen={modalState.open}
        step={modalState.step}
        fromCurrency={fromCurrency}
        fromAmount={numAmount}
        toCurrency={toCurrency}
        toAmount={convertedAmount}
        account={account}
        rail={activeRail}
        onClose={() => setModalState({ open: false, step: "authorizing" })}
      />
    </div>
  );
};
