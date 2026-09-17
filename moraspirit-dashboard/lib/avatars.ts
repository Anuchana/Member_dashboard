// Curated high quality avatar images for MoraSpirit team members
const AVATAR_MAP: Record<string, string> = {
  MSP000: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", // Sangeeth
  MSP001: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop", // Thisuka
  MSP002: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop", // Heshani / Nethmi
  MSP003: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", // Mohomad / Kavindu
  MSP004: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", // Pamudu / Dinuka
  MSP005: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop", // Geethma / Amaya
  MSP007: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop", // Parami / Chathura
  MSP008: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", // Mayuka / Nisal
  MSP009: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop", // Gagani / Tharushi
  MSP010: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop", // Nimasha / Ravindu
  MSP011: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", // Tharuki / Sanduni
  MSP012: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop", // Umesh / Hasitha
  MSP013: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop", // Kusal
  MSP014: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", // Yasath
};

export function getMemberAvatar(id: string, name: string): string {
  if (AVATAR_MAP[id]) {
    return AVATAR_MAP[id];
  }
  // Fallback UI Avatar generator with clean gradient styling
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=200`;
}
