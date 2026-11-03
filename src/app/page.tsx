"use client";

import React from "react";
import { SwapCard } from "@/components/remit/SwapCard";
import { useAppStore } from "@/lib/store";
import { Compass, Gift, History } from "lucide-react";

export default function Dashboard() {
  const { poolHealthZarPercent, quests, claimQuest, transactions } = useAppStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Pool Health Meter */}
      <section className="bg-brand-surface border border-brand-border rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-cyan" />
              <span>Corridor Reserve Balancing (ZAR vs KES)</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Live ratio determines quest bounties. Counter-balancing reaps protocol rewards.
            </p>
          </div>
          <div className="text-xs font-mono text-gray-300">
            {poolHealthZarPercent}% ZAR / {100 - poolHealthZarPercent}% KES
          </div>
        </div>

        <div className="w-full h-3 bg-brand-dark rounded-full overflow-hidden flex border border-brand-border/60">
          <div
            style={{ width: `${poolHealthZarPercent}%` }}
            className="h-full bg-brand-cyan transition-all duration-500"
          />
          <div
            style={{ width: `${100 - poolHealthZarPercent}%` }}
            className="h-full bg-brand-emerald transition-all duration-500"
          />
        </div>
      </section>

      {/* Main Grid: Remit Widget & Gamified Bounties */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-6 flex justify-center">
          <SwapCard />
        </div>

        <div className="md:col-span-6 space-y-6">
          {/* Active Quests */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
            <h3 className="text-base font-bold flex items-center gap-2 mb-3">
              <Gift className="w-4 h-4 text-brand-amber" />
              <span>Active Trade Quests</span>
            </h3>
            <div className="space-y-3">
              {quests.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl bg-brand-dark border border-brand-border flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{q.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">{q.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-semibold text-brand-amber bg-brand-amber/10 px-2 py-0.5 rounded">
                      +{q.rewardVeld} $VELD &nbsp;|&nbsp; +{q.rewardEnergy}% Fuel
                    </span>
                  </div>
                  <div>
                    {q.completed ? (
                      <span className="text-xs text-gray-400 font-semibold px-2 py-1 rounded bg-brand-border/30">
                        Claimed
                      </span>
                    ) : q.progressPercent >= 100 ? (
                      <button
                        onClick={() => claimQuest(q.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-brand-amber text-brand-dark font-extrabold hover:brightness-110"
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-400 font-mono">
                        {q.progressPercent}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Ledger */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
            <h3 className="text-base font-bold flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-brand-emerald" />
              <span>Recent Activity</span>
            </h3>
            {transactions.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">
                No simulated transfers executed yet. Use the transfer widget to test the corridor flow!
              </p>
            ) : (
              <div className="space-y-2">
                {transactions.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center p-2.5 rounded-lg bg-brand-dark border border-brand-border text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white">
                        {t.fromAmount} {t.fromCurrency} ➔ {t.toAmount.toFixed(1)} {t.toCurrency}
                      </span>
                      <p className="text-[10px] text-gray-400">{t.rail} • {t.recipientAccount}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald font-semibold uppercase">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
