import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const SALON = {
  name: "SyraSalon",
  tagline: "Thread. Wax. Glow. Style. All in One Place",
  locationLine1: "1633 Robson Ranch Road, Ste.100",
  locationLine2: "Northlake, TX 76226",
  hoursLine1: "Monday — Saturday",
  hoursLine2: "10:00 am — 6:30 pm",
  phone: "940-271-0130",
};

const services = [
  {
    title: "Threading",
    description: "Precise brow shaping and facial threading for a clean, balanced finish.",
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Waxing",
    description: "Smooth, comfortable waxing services delivered with care and attention.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hair Color",
    description: "Dimensional color, root touch-ups, glossing, and refreshed tones.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Facial",
    description: "Relaxing skincare treatments designed to brighten, hydrate, and renew.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hair Styling",
    description: "Everyday styling, polished blowouts, and occasion-ready finishes.",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hair Cut",
    description: "Clean cuts, trims, layers, and shape refreshes tailored to your look.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mehendi",
    description: "Elegant henna artistry for celebrations, gatherings, and special moments.",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80",
  },
];

const priceMenu = [
  {
    category: "Threading",
    note: "Quick precision shaping",
    items: [
      { name: "Eyebrows", price: 12 },
      { name: "Upper Lip", price: 8 },
      { name: "Chin", price: 8 },
      { name: "Forehead", price: 8 },
      { name: "Full Face", price: 38 },
      { name: "Eyebrows + Upper Lip", price: 18 },
    ],
  },
  {
    category: "Waxing",
    note: "Smooth finish with gentle care",
    items: [
      { name: "Underarms", price: 18 },
      { name: "Half Arms", price: 30 },
      { name: "Full Arms", price: 45 },
      { name: "Half Legs", price: 40 },
      { name: "Full Legs", price: 70 },
      { name: "Full Face Wax", price: 42 },
    ],
  },
  {
    category: "Facial",
    note: "Hydrating and glow-focused skincare",
    items: [
      { name: "Mini Facial", price: 45 },
      { name: "Classic Facial", price: 65 },
      { name: "Glow Facial", price: 85 },
      { name: "Deep Cleansing Facial", price: 95 },
    ],
  },
  {
    category: "Hair Cut",
    note: "Clean trims and shape refreshes",
    items: [
      { name: "Kids Cut", price: 25 },
      { name: "Men's Cut", price: 30 },
      { name: "Women's Trim", price: 40 },
      { name: "Layered Cut", price: 55 },
    ],
  },
  {
    category: "Hair Styling",
    note: "Everyday polish and special events",
    items: [
      { name: "Blowout", price: 45 },
      { name: "Iron Styling", price: 35 },
      { name: "Updo / Event Styling", price: 75 },
    ],
  },
  {
    category: "Hair Color",
    note: "Color consultation recommended",
    items: [
      { name: "Root Touch-Up", price: 65 },
      { name: "All Over Color", price: 95 },
      { name: "Partial Highlights", price: 120 },
      { name: "Full Highlights", price: 180 },
    ],
  },
  {
    category: "Mehendi",
    note: "Elegant henna artistry",
    items: [
      { name: "Simple Design", price: 15 },
      { name: "One Hand Design", price: 35 },
      { name: "Both Hands", price: 65 },
      { name: "Bridal Mehendi", price: 250 },
    ],
  },
];

function Button({ children, className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-stone-950 text-white hover:bg-stone-800",
    outline: "border border-stone-300 bg-transparent text-stone-950 hover:bg-white",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`border bg-white ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Header({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: "Home", value: "home" },
    { label: "Services", value: "services" },
  ];

  const goTo = (value) => {
    setPage(value);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fbf6ef]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <button onClick={() => goTo("home")} className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-950 text-sm font-semibold text-white shadow-sm">
            S
          </span>
          <span className="font-serif text-2xl tracking-tight text-stone-950">{SALON.name}</span>
        </button>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => goTo(item.value)}
              className={`text-sm tracking-wide transition ${
                page === item.value ? "text-stone-950" : "text-stone-500 hover:text-stone-950"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button className="flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-950">
            <ShoppingBag className="h-4 w-4" /> Cart (0)
          </button>
          <Button onClick={() => goTo("book")} className="px-6">
            Book now
          </Button>
        </nav>

        <button
          className="rounded-full border border-stone-300 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-stone-200 bg-[#fbf6ef] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.value} onClick={() => goTo(item.value)} className="text-left text-lg text-stone-900">
                {item.label}
              </button>
            ))}
            <button className="flex items-center gap-2 text-left text-lg text-stone-900">
              <ShoppingBag className="h-4 w-4" /> Cart (0)
            </button>
            <Button onClick={() => goTo("book")} className="mt-2">
              Book now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function ContactBlock({ compact = false }) {
  return (
    <div className={`grid gap-6 ${compact ? "sm:grid-cols-3" : "md:grid-cols-3"}`}>
      <div className="rounded-2xl border border-stone-200 bg-white/65 p-6 shadow-sm">
        <MapPin className="mb-4 h-5 w-5 text-stone-600" />
        <h3 className="font-serif text-xl text-stone-950">Location</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          {SALON.locationLine1}
          <br />
          {SALON.locationLine2}
        </p>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white/65 p-6 shadow-sm">
        <Clock className="mb-4 h-5 w-5 text-stone-600" />
        <h3 className="font-serif text-xl text-stone-950">Hours</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          {SALON.hoursLine1}
          <br />
          {SALON.hoursLine2}
        </p>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white/65 p-6 shadow-sm">
        <Phone className="mb-4 h-5 w-5 text-stone-600" />
        <h3 className="font-serif text-xl text-stone-950">Contact</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{SALON.phone}</p>
      </div>
    </div>
  );
}

function Home({ setPage }) {
  return (
    <main>
      <section className="relative overflow-hidden bg-[#fbf6ef]">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm text-stone-600 shadow-sm">
              <Sparkles className="h-4 w-4" /> Beauty, care, and everyday confidence
            </div>
            <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              {SALON.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Welcome to {SALON.name}, a refined neighborhood salon for threading, waxing, glowing skin, elegant hair,
              and special-occasion artistry.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setPage("book")} className="px-8 py-6">
                Book now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={() => setPage("services")} variant="outline" className="px-8 py-6">
                View services
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone-200 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85"
                alt="Warm salon interior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 max-w-xs rounded-3xl border border-stone-200 bg-white/90 p-5 shadow-xl backdrop-blur">
              <p className="font-serif text-2xl text-stone-950">Soft, polished, personal.</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                A calm salon experience made for everyday rituals and important moments.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Featured services</p>
              <h2 className="mt-3 font-serif text-4xl text-stone-950 md:text-5xl">Beauty essentials, all in one place.</h2>
            </div>
            <Button onClick={() => setPage("services")} variant="outline" className="w-fit px-6">
              Explore all
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <Card key={service.title} className="overflow-hidden rounded-3xl border-stone-200 shadow-sm">
                <div className="h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl text-stone-950">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5ede2] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ContactBlock />
        </div>
      </section>
    </main>
  );
}

function Services({ setPage }) {
  return (
    <main className="bg-[#fbf6ef]">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Our services</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-stone-950 md:text-7xl">
            Natural elegance, thoughtful care.
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Our beauty professionals bring precision, calm, and artistry to each appointment, from quick refreshes to
            full-service transformations.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
              className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm"
            >
              <div className="h-56 overflow-hidden bg-stone-200">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl text-stone-950">{service.title}</h2>
                <p className="mt-3 min-h-16 text-sm leading-6 text-stone-600">{service.description}</p>
                <Button onClick={() => setPage("book")} variant="outline" className="mt-5 px-5 py-2">
                  Book {service.title}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl py-14">
          <ContactBlock compact />
        </div>
      </section>
    </main>
  );
}

function BookingPage({ setPage }) {
  const bookingOptions = useMemo(
    () => priceMenu.flatMap((group) => group.items.map((item) => ({ ...item, category: group.category }))),
    []
  );
  const [selected, setSelected] = useState(`${bookingOptions[0].category} — ${bookingOptions[0].name}`);
  const selectedService =
    bookingOptions.find((item) => `${item.category} — ${item.name}` === selected) || bookingOptions[0];

  return (
    <main className="min-h-[70vh] bg-[#fbf6ef] px-5 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Book now</p>
            <h1 className="mt-4 font-serif text-5xl text-stone-950 md:text-6xl">Reserve your SyraSalon visit.</h1>
            <p className="mt-6 text-lg leading-8 text-stone-600">
              Choose a service, review the price, and share your preferred time. Prices are modeled after SahaSalon-style
              service categories and can be adjusted before launch.
            </p>

            <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-stone-500">Selected service</p>
              <div className="mt-4 flex flex-col justify-between gap-4 rounded-3xl bg-[#fbf6ef] p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-stone-500">{selectedService.category}</p>
                  <h2 className="font-serif text-3xl text-stone-950">{selectedService.name}</h2>
                </div>
                <div className="rounded-full bg-stone-950 px-6 py-3 text-center text-2xl font-semibold text-white">
                  ${selectedService.price}
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-stone-500">
                Final pricing may vary for hair color, bridal mehendi, length, product usage, or custom requests.
              </p>
            </div>
          </div>

          <form
            className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-xl md:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Full name
                <input
                  className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-950"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Phone or email
                <input
                  className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-950"
                  placeholder="How should we contact you?"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Service and price
                <select
                  value={selected}
                  onChange={(event) => setSelected(event.target.value)}
                  className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-950"
                >
                  {priceMenu.map((group) => (
                    <optgroup key={group.category} label={group.category}>
                      {group.items.map((item) => (
                        <option key={`${group.category}-${item.name}`} value={`${group.category} — ${item.name}`}>
                          {item.name} — ${`$${item.price}`}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-stone-700">
                  Preferred date
                  <input
                    type="date"
                    className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-950"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-stone-700">
                  Preferred time
                  <input
                    type="time"
                    className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-950"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium text-stone-700">
                Notes
                <textarea
                  className="min-h-32 rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-950"
                  placeholder="Tell us anything helpful before your appointment."
                />
              </label>
              <Button className="py-6">
                <CalendarDays className="mr-2 h-4 w-4" /> Request appointment — ${selectedService.price}
              </Button>
              <button
                type="button"
                onClick={() => setPage("home")}
                className="text-sm text-stone-500 underline-offset-4 hover:text-stone-950 hover:underline"
              >
                Back to home
              </button>
            </div>
          </form>
        </div>

        <section className="mt-14">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Service menu</p>
              <h2 className="mt-3 font-serif text-4xl text-stone-950 md:text-5xl">SyraSalon pricing</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-600">
              This menu keeps the Book Now page close to the SahaSalon service lineup while making SyraSalon's booking
              flow clearer for customers.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {priceMenu.map((group) => (
              <article key={group.category} className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-stone-950">{group.category}</h3>
                    <p className="mt-1 text-sm text-stone-500">{group.note}</p>
                  </div>
                  <span className="rounded-full bg-[#fbf6ef] px-3 py-1 text-xs font-medium text-stone-600">
                    {group.items.length} options
                  </span>
                </div>
                <div className="divide-y divide-stone-100">
                  {group.items.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setSelected(`${group.category} — ${item.name}`)}
                      className="flex w-full items-center justify-between gap-4 py-3 text-left transition hover:translate-x-1"
                    >
                      <div>
                        <p className="font-medium text-stone-900">{item.name}</p>
                      </div>
                      <p className="font-semibold text-stone-950">${item.price}</p>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <ContactBlock compact />
        </section>
      </div>
    </main>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 px-5 py-12 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-3xl">{SALON.name}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-stone-300">
            Threading, waxing, skincare, hair, and mehendi services in a warm salon setting.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setPage("home")}
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white hover:text-stone-950"
          >
            Home
          </Button>
          <Button
            onClick={() => setPage("services")}
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white hover:text-stone-950"
          >
            Services
          </Button>
          <Button onClick={() => setPage("book")} className="bg-white text-stone-950 hover:bg-stone-200">
            Book now
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default function SyraSalonWebsite() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-[#fbf6ef] text-stone-950">
      <Header page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "services" && <Services setPage={setPage} />}
      {page === "book" && <BookingPage setPage={setPage} />}
      <Footer setPage={setPage} />
    </div>
  );
}
