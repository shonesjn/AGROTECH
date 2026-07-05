export default function BackgroundEffects() {
  return (
    <>
      {/* Main Background */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-[#071320] via-[#0B1120] to-[#111827]" />

      {/* Green Glow Top Left */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full -z-40" />

      {/* Green Glow Bottom Right */}
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full -z-40" />
    </>
  );
}