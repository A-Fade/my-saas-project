export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">

      {/* HEADER */}
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* LOGO */}
          <div className="flex items-center gap-2">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
              🏗️
            </div>

            <h1 className="text-2xl font-black">
              Builder<span className="text-blue-600">Pro</span>
            </h1>

          </div>

          {/* NAV */}
          <nav className="hidden md:flex gap-8 font-medium">

            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>

            <a href="#how" className="hover:text-blue-600 transition">
              How It Works
            </a>

            <a href="#pricing" className="hover:text-blue-600 transition">
              Pricing
            </a>

            <a href="#faq" className="hover:text-blue-600 transition">
              FAQ
            </a>

          </nav>

          {/* BUTTONS */}
          <div className="flex gap-3">

            <a
              href="/login"
              className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
            >
              Login
            </a>

            <a
              href="/login"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </a>

          </div>

        </div>

      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            All-in-one construction management solution
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Manage Projects.
            <br />
            Track Workers.
            <br />
            <span className="text-blue-600">
              Build Success.
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            BuilderPro helps builders and contractors manage projects,
            workers, payments, expenses and clients from one dashboard.
          </p>

          {/* HERO BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">

            <a
              href="/login"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              Start Free Trial
            </a>

            <button className="border border-slate-300 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-100 transition">
              Watch Demo
            </button>

          </div>

          {/* REVIEWS */}
          <div className="flex items-center gap-4">

            <div className="flex -space-x-3">

              <div className="w-12 h-12 rounded-full bg-gray-300 border-4 border-white"></div>

              <div className="w-12 h-12 rounded-full bg-gray-400 border-4 border-white"></div>

              <div className="w-12 h-12 rounded-full bg-gray-500 border-4 border-white"></div>

            </div>

            <div>

              <div className="text-yellow-500 text-lg">
                ★★★★★
              </div>

              <p className="text-slate-600">
                Trusted by 500+ builders
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT DASHBOARD */}
        <div className="bg-white rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden">

          {/* TOP */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">

            <h2 className="font-bold text-lg">
              Dashboard
            </h2>

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-full bg-blue-100"></div>

              <span className="font-medium">
                Demo Builder
              </span>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">

              <p className="text-gray-500 text-sm">
                Projects
              </p>

              <h3 className="text-3xl font-bold mt-2">
                24
              </h3>

            </div>

            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">

              <p className="text-gray-500 text-sm">
                Workers
              </p>

              <h3 className="text-3xl font-bold mt-2">
                45
              </h3>

            </div>

            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl">

              <p className="text-gray-500 text-sm">
                Payments
              </p>

              <h3 className="text-2xl font-bold mt-2">
                ₹12L
              </h3>

            </div>

            <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl">

              <p className="text-gray-500 text-sm">
                Active
              </p>

              <h3 className="text-3xl font-bold mt-2">
                18
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-6 text-white text-center">

        <div className="max-w-4xl mx-auto">

          <h2 className="text-5xl font-black mb-6">
            Start Managing Your Projects Today
          </h2>

          <p className="text-xl opacity-90 mb-10">
            Join hundreds of builders using BuilderPro daily.
          </p>

          <a
            href="/login"
            className="inline-block bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition"
          >
            Get Started Free
          </a>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-10 px-6">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">

          <div>

            <h2 className="text-3xl font-black mb-3">
              Builder<span className="text-blue-500">Pro</span>
            </h2>

            <p className="text-gray-400 max-w-md">
              Construction management software for modern builders.
            </p>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-gray-500">
          © 2026 BuilderPro. All rights reserved.
        </div>

      </footer>

    </div>
  );
}