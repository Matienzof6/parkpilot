export default function PageContainer({ children }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #ea580c 180%)",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col text-white">
        {children}
      </div>
    </div>
  );
}