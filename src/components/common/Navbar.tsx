"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { Zap, Coins, ShieldCheck } from "lucide-react";

export const Navbar = () => {
  const { veldBalance, energyBalance } = useAppStore();

  return (
    <header className="w-full border-b border-brand-border bg-brand-surface/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-emerald to-brand-cyan flex items-center justify-center font-bold text-brand-dark">
            KV
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">KaribuVeld</span>
            <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald font-semibold uppercase tracking-wider">
              ZAR/KES RemitFi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-brand-dark px-3 py-1.5 rounded-full border border-brand-border">
            <Coins className="w-4 h-4 text-brand-amber" />
            <span className="text-xs font-semibold">{veldBalance} $VELD</span>
          </div>
          <div className="flex items-center gap-1.5 bg-brand-dark px-3 py-1.5 rounded-full border border-brand-border">
            <Zap className="w-4 h-4 text-brand-cyan" />
            <span className="text-xs font-semibold">{energyBalance}% Fuel</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 bg-brand-border/40 px-2.5 py-1.5 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
            <span>PayShap & M-Pesa Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};
