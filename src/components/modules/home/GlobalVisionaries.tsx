import Image from "next/image";
import { ShieldCheck, Clock } from "lucide-react";

export default function GlobalVisionaries() {
  return (
    <section className="container mx-auto px-8 py-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-[500px] mx-auto lg:mx-0 pt-8">
          {/* Top Left: Male Mentor */}
          <div className="aspect-square relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvzfkQX_zJwIRJOTLzXl6T2lLPBiGFY_lEeUdQzTzvdcu7p5iJK2q9MKyq28ZipkrG8Cm759KgKat4Vb53CKk42-pF-gPPwqaQyd91DaR6zcQyiktj4LoH8rt_54lRrHXyzjwEidKKLoVOEbnNWioYZ27TNSb4DTeA7vi3POyX6so2LQXARk2hAar4s3estJakURPsw2DclGnuxcsHcfxhQMmpa8gzHSTLFe0hdjIlk8ZvyleH4nYEjgf0lMlQjM9hbqBRrWhNDes"
              alt="Dr. Aris Miller"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
          
          {/* Top Right: Stats Card */}
          <div className="aspect-square bg-primary rounded-3xl p-6 flex flex-col items-center justify-center text-white shadow-lg text-center">
            <p className="text-4xl md:text-5xl font-black mb-1">20+</p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-90">Partner Institutes</p>
            <div className="mt-4 w-8 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Bottom Left: Quote Card */}
          <div className="aspect-square bg-slate-900 rounded-3xl p-6 flex flex-col justify-between shadow-lg translate-y-4 md:translate-y-8">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-xl font-serif">"</span>
            </div>
            <p className="text-white text-sm md:text-base font-medium leading-tight">
              Bridging the gap between theory and global industry mastery.
            </p>
          </div>

          {/* Bottom Right: Female Mentor */}
          <div className="aspect-square relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group translate-y-4 md:translate-y-8 border-4 border-white">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4jRc30zMs37L1DRAuXulHSt56qNVnEkwlXkChk2s-Lc2xuSNRqB64HaGeTBEbLUUMLQ4DHtLNiZliAOgvO1hABII0PEaWr8i-UoXElbyOh4tlTuwAdtlwImCXicjgSxsW1el_H1mbPT3ZWlFf-r4ZtlLEichysFCOjc0A1EmRJKwE-bsZU7IVmT_ycq-aiiJb5J7wFrWMawHAP11iRldaXciXEN7oZX0Skq_1hwuCMFg9hQP_qZx02otjJ-aRmp7qirkxqKeOi_o"
              alt="Sarah Jenkins"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Master Classes with <br />
              <span className="text-primary">Global Visionaries</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Our mentors are not just teachers; they are industry veterans, 
              award-winning designers, and pioneering researchers from around the globe.
            </p>
          </div>

          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Rigorous Vetting</h3>
                <p className="text-muted-foreground">Only top 3% of applicants are selected to teach.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Global Availability</h3>
                <p className="text-muted-foreground">Access world-class knowledge across 24 different timezones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
