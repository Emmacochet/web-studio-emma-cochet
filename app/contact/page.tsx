import SiteShell from "@/components/site-shell";

export default function ContactPage() {
  return (
    <SiteShell title="Contact the studio">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">Get in touch</p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-950">Available for residential, cultural, and boutique hospitality commissions.</h2>
          </div>
          <div className="space-y-3 text-base leading-7 text-stone-600">
            <p>hello@emmacochet.com</p>
            <p>+33 6 12 34 56 78</p>
            <p>Paris, France</p>
          </div>
        </div>

        <form
          action="mailto:hello@emmacochet.com"
          method="post"
          encType="text/plain"
          className="space-y-4 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="name">
              Name
            </label>
            <input id="name" name="name" className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none ring-0" placeholder="Your name" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none ring-0" placeholder="you@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="message">
              Project brief
            </label>
            <textarea id="message" name="message" rows={5} className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none ring-0" placeholder="Tell me about your project." />
          </div>
          <button type="submit" className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
            Send inquiry
          </button>
        </form>
      </div>
    </SiteShell>
  );
}
