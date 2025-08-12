export default function GetCreditsPage() {
  console.log("GetCreditsPage rendered");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <h2 className="text-2xl font-semibold text-slate-800 tracking-tight mb-2">
          Get Credits
        </h2>
        <p className="text-sm text-slate-600 font-sans mt-1">
          Purchase credits to enhance your language learning experience
        </p>
        {/* Add your credit purchasing components here */}
      </div>
    </div>
  );
}
