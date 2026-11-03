import { create } from "zustand";
import { TransactionRecord, Quest } from "@/types";

interface AppState {
  zarBalance: number;
  kesBalance: number;
  veldBalance: number;
  energyBalance: number;
  poolHealthZarPercent: number;
  quests: Quest[];
  transactions: TransactionRecord[];
  
  executeTransfer: (tx: Omit<TransactionRecord, "id" | "timestamp" | "status">) => Promise<boolean>;
  claimQuest: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  zarBalance: 12500,
  kesBalance: 84000,
  veldBalance: 240,
  energyBalance: 75,
  poolHealthZarPercent: 62,

  quests: [
    {
      id: "q-1",
      title: "Nairobi Liquidity Caravan",
      description: "Send or inject over KES 5,000 to balance the Nairobi vault.",
      targetCurrency: "KES",
      rewardVeld: 35,
      rewardEnergy: 50,
      progressPercent: 60,
      completed: false,
    },
    {
      id: "q-2",
      title: "Cape Town Shuttle",
      description: "Provide ZAR settlement liquidity using instant PayShap.",
      targetCurrency: "ZAR",
      rewardVeld: 20,
      rewardEnergy: 30,
      progressPercent: 100,
      completed: false,
    },
  ],

  transactions: [],

  executeTransfer: async (txData) => {
    const { zarBalance, kesBalance, veldBalance, transactions } = get();

    if (txData.fromCurrency === "ZAR" && zarBalance < txData.fromAmount) return false;
    if (txData.fromCurrency === "KES" && kesBalance < txData.fromAmount) return false;

    await new Promise((resolve) => setTimeout(resolve, 1800));

    const newTx: TransactionRecord = {
      ...txData,
      id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "settled",
    };

    set({
      zarBalance: txData.fromCurrency === "ZAR" ? zarBalance - txData.fromAmount : zarBalance + txData.toAmount,
      kesBalance: txData.fromCurrency === "KES" ? kesBalance - txData.fromAmount : kesBalance + txData.toAmount,
      veldBalance: veldBalance + 5,
      transactions: [newTx, ...transactions],
      poolHealthZarPercent: txData.fromCurrency === "ZAR" ? 64 : 58,
    });

    return true;
  },

  claimQuest: (id: string) => {
    const { quests, veldBalance, energyBalance } = get();
    const quest = quests.find((q) => q.id === id);
    if (!quest || quest.completed) return;

    set({
      veldBalance: veldBalance + quest.rewardVeld,
      energyBalance: Math.min(100, energyBalance + quest.rewardEnergy),
      quests: quests.map((q) => (q.id === id ? { ...q, completed: true } : q)),
    });
  },
}));
