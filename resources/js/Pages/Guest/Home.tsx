import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#041C32] text-[#ECB365]">
                {/* Navbar */}
                <nav className="sticky top-0 z-50 bg-[#04293A]/90 shadow-md backdrop-blur-md">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-extrabold tracking-wide text-[#ECB365]"
                        >
                            CRM
                        </motion.h1>

                        <ul className="flex gap-6 font-medium text-[#ECB365]/80">
                            <li className="cursor-pointer transition hover:text-white">Home</li>
                            <li className="cursor-pointer transition hover:text-white">Features</li>
                            <li className="cursor-pointer transition hover:text-white">Pricing</li>
                            <li className="cursor-pointer transition hover:text-white">Contact</li>
                        </ul>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="rounded-lg bg-[#064663] px-5 py-2 font-semibold text-[#ECB365] transition hover:bg-[#04293A]"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-lg border-2 border-[#ECB365] px-5 py-2 font-semibold text-[#ECB365] transition hover:bg-[#ECB365] hover:text-[#04293A]"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl leading-tight font-extrabold text-[#ECB365] md:text-6xl"
                    >
                        Empower Your <span className="text-white">Business</span> <br /> with CRM
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-6 max-w-2xl text-lg text-[#ECB365]/80"
                    >
                        Manage leads, track performance, and grow your business effortlessly with our intuitive CRM platform.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="mt-10 flex gap-6"
                    >
                        <button className="rounded-xl bg-[#ECB365] px-6 py-3 font-semibold text-[#041C32] transition-transform hover:scale-105">
                            Get Started
                        </button>
                        <button className="rounded-xl border border-[#ECB365] px-6 py-3 text-[#ECB365] transition hover:bg-[#ECB365]/10">
                            Learn More
                        </button>
                    </motion.div>
                </section>

                {/* Feature Section */}
                <section className="bg-[#04293A] p-6">
                    <div className="mx-auto grid max-w-6xl gap-10 text-center md:grid-cols-3">
                        {[
                            { title: 'Lead Management', desc: 'Track leads, automate follow-ups, and close deals faster.' },
                            { title: 'Analytics Dashboard', desc: "Get real-time insights into your team's performance." },
                            { title: 'Collaboration Tools', desc: 'Empower teams to work together seamlessly and efficiently.' },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="rounded-2xl bg-[#064663] p-8 shadow-lg transition-transform hover:scale-[1.03]"
                            >
                                <h3 className="mb-3 text-2xl font-bold text-[#ECB365]">{feature.title}</h3>
                                <p className="text-[#ECB365]/80">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#064663] bg-[#04293A] py-6 text-center text-sm text-[#ECB365]/70">
                    © {new Date().getFullYear()} CRM — Built for efficiency ⚡
                </footer>
            </div>
        </>
    );
}
