      {/* --- REALISTIC DASHBOARD PREVIEW --- */}
      <section id="preview" className="px-6 py-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden ring-1 ring-slate-100">
            
            {/* Realistic Browser Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-white border border-slate-200 px-4 py-1 rounded-lg text-[10px] font-bold text-slate-400 tracking-tight">
                ://builderpro.com
              </div>
              <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="p-8 md:p-12 bg-[#F8FAFC]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {/* Metric Cards */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 border-t-4 border-indigo-600">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Project Budget</p>
                  <h3 className="text-2xl font-black text-slate-800">₹8,50,000</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 border-t-4 border-emerald-500">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Profit</p>
                  <h3 className="text-2xl font-black text-emerald-600">₹2,45,200</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 border-t-4 border-rose-500">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Labor Cost</p>
                  <h3 className="text-2xl font-black text-rose-600">₹42,000</h3>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl shadow-lg">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Site</p>
                  <h3 className="text-2xl font-black text-white">Project-X</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Visual Chart Mockup */}
                <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <div className="flex justify-between items-center mb-8">
                      <h4 className="font-bold text-slate-800">Weekly Spend Analysis</h4>
                      <div className="flex gap-2"><div className="w-3 h-3 bg-indigo-600 rounded-full"></div><div className="w-3 h-3 bg-slate-200 rounded-full"></div></div>
                   </div>
                   <div className="flex items-end justify-between h-40 gap-2">
                      <div className="w-full bg-slate-100 rounded-t-lg h-24 hover:bg-indigo-200 transition-colors"></div>
                      <div className="w-full bg-indigo-600 rounded-t-lg h-32"></div>
                      <div className="w-full bg-slate-100 rounded-t-lg h-16"></div>
                      <div className="w-full bg-indigo-600 rounded-t-lg h-40"></div>
                      <div className="w-full bg-slate-100 rounded-t-lg h-28"></div>
                      <div className="w-full bg-indigo-500 rounded-t-lg h-36"></div>
                   </div>
                </div>

                {/* Side List Mockup */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <h4 className="font-bold text-slate-800 mb-6">Recent Material</h4>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                         <div><p className="text-sm font-bold">Cement Bags</p><p className="text-[10px] text-slate-400">12 May, 2024</p></div>
                         <p className="font-black text-rose-600 text-sm">₹14,500</p>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                         <div><p className="text-sm font-bold">Steel Bars</p><p className="text-[10px] text-slate-400">10 May, 2024</p></div>
                         <p className="font-black text-rose-600 text-sm">₹45,000</p>
                      </div>
                      <div className="flex justify-between items-center">
                         <div><p className="text-sm font-bold">Bricks (Grade-A)</p><p className="text-[10px] text-slate-400">08 May, 2024</p></div>
                         <p className="font-black text-rose-600 text-sm">₹8,200</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Overlapping Realistic Info Badge */}
            <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-4 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-2xl border border-white ring-1 ring-slate-200 animate-bounce">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">Live Sync Active</p>
                <p className="text-[10px] text-slate-500 font-medium">Updating data across all sites...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
