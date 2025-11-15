"use client";

// app/(landing)/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { adsoLogo, adsoLogo2 } from "@/src/assets";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900 scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="flex items-end gap-2 text-2xl font-bold text-[#337ab7]">
            <Image
              src={adsoLogo}
              alt="logo adso"
              style={{ width: "30px", height: "auto" }}
            />
            ADSO Perú
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#servicios" className="hover:text-blue-600 font-medium">
              Servicios
            </a>
            <a href="#equipo" className="hover:text-blue-600 font-medium">
              Equipo
            </a>
            <a href="#contacto" className="hover:text-blue-600 font-medium">
              Contacto
            </a>
            <a href="#ubicacion" className="hover:text-blue-600 font-medium">
              Ubicación
            </a>
          </nav>
          <div className="flex items-center gap-2 ">
            {/* <Button variant="outline" size="sm" className="cursor-pointer">
              Separar cita
            </Button> */}
            <Link
              href="/login"
              className="cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="cursor-pointer  bg-[#337ab7] hover:bg-[#285e8e]"
              >
                Intranet
              </Button>
            </Link>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <a
              href="#servicios"
              className="block hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Servicios
            </a>
            <a
              href="#equipo"
              className="block hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Equipo
            </a>
            <a
              href="#contacto"
              className="block hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </a>
            <a
              href="#ubicacion"
              className="block hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Ubicación
            </a>
            <Link
              href="/login"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Intranet
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Tu sonrisa es nuestra prioridad
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          En ADSO brindamos atención odontológica integral, moderna y cálida
          para toda la familia.
        </p>
        <a href="#contacto">
          <Button className="text-lg px-6 py-3 cursor-pointer">
            Agendar tu cita
          </Button>
        </a>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Nuestros servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Limpieza Dental",
                desc: "Elimina placa y previene enfermedades.",
              },
              {
                title: "Ortodoncia",
                desc: "Alinea tus dientes con brackets modernos.",
              },
              {
                title: "Estética Dental",
                desc: "Blanqueamiento, carillas y más.",
              },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-xl font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profesionales */}
      <section id="equipo" className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Nuestro equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["Dr. Ronald", "Dr. Niky", "Dra. Giovanna", "Dra. Jenifer"].map(
              (name, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow text-center"
                >
                  <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4"></div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-500">Especialista</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contacto con Formulario */}
      <section id="contacto" className="bg-blue-50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Contáctanos</h2>
          <p className="mb-4">📍 Callao 176 esq. Nauta, Iquitos - Loreto</p>
          <p className="mb-2">📞 +51 917 435 154 | +51 980 992 776</p>
          <p className="mb-6">✉️ admin@adso-peru.com</p>

          {/* <form className="space-y-4 text-left">
            <Input placeholder="Nombre completo" required />
            <Input placeholder="Correo electrónico" type="email" required />
            <Textarea placeholder="Escribe tu mensaje..." rows={4} required />
            <Button type="submit">Enviar mensaje</Button>
          </form> */}

          <div className="mt-8">
            <a
              href="https://wa.me/+519804441122?text=Hola%20ADSO%20Perú,%20me%20gustaría%20más%20información."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-600 hover:underline mt-4"
            >
              <ChevronRight className="w-4 h-4 mr-1" /> Contáctanos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section id="ubicacion"className="py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Ubícanos</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251.6524538570107!2d-73.24747198721452!3d-3.749824987776656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ea0fb3495b05e7%3A0x8d84a0fd6fd31563!2sCallao%20176%2C%20Iquitos%2020001!5e0!3m2!1ses!2spe!4v1718782912667!5m2!1ses!2spe"
            width="100%"
            height="350"
            allowFullScreen={false}
            loading="lazy"
            className="rounded-xl border"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center text-sm">
        &copy; {new Date().getFullYear()} ADSO Perú. Todos los derechos
        reservados.
      </footer>
    </main>
  );
}
