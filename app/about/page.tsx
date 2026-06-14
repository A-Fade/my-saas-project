import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white text-slate-900">
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center border border-slate-200 px-4 py-2 rounded-full mb-6">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
                About BuilderPro
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              Built For Modern
              <br />
              Contractors
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              BuilderPro is a construction management platform designed to help
              contractors, builders, and construction companies manage projects,
              workers, payments, and business operations from one simple dashboard.
            </p>
          </div>
        </section>

      <section className="py-20 px-6 border-t border-slate-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-black mb-6">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Our mission is to simplify construction business management by
              providing powerful tools that save time, improve organization,
              and help contractors focus on delivering successful projects.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black mb-6">What We Do</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              BuilderPro helps construction professionals track projects,
              manage workers, monitor expenses, create quotes, handle payments,
              and gain insights through a centralized dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16">
            Why Choose BuilderPro?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Project Management
              </h3>
              <p className="text-slate-600">
                Organize and monitor all construction projects from a single
                platform.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Worker Tracking
              </h3>
              <p className="text-slate-600">
                Manage labor, attendance, and workforce productivity with ease.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">
                Payment Monitoring
              </h3>
              <p className="text-slate-600">
                Track expenses, payments, and financial activity in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Build Faster. Manage Better.
          </h2>

          <p className="text-lg text-slate-600 mb-10">
            Join contractors and builders who use BuilderPro to streamline
            operations and grow their construction business.
          </p>

          <a
            href="/login"
            className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
    </>
  );
}