import { Award, ShieldCheck, Cpu, Globe } from 'lucide-react';

export interface Certificate {
  title: string;
  issuer: string;
  id: string;
  date: string;
  color: string;
  image: string; // Path ke file lokal di folder public/certificates
  icon: typeof Award | typeof ShieldCheck | typeof Cpu | typeof Globe;
  details: string;
}

export const certs: Certificate[] = [
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    id: "98XWEN47WXM3",
    date: "2025.05.02",
    color: "from-blue-900/40 to-cyan-900/20",
    image: "/certificates/sertifikat1.jpg",
    icon: Award,
    details: "Completion of Dicoding's JavaScript fundamentals class covering variables, functions, arrays, DOM interaction, and practical scripting for web development."
  },
  {
    title: "Belajar Dasar Pemrograman Website",
    issuer: "Dicoding Indonesia",
    id: "RVZKW3OO4ZD5",
    date: "2025.05.02",
    color: "from-purple-500/20 to-pink-500/10",
    image: "/certificates/sertifikat2.jpg",
    icon: Award,
    details: "Practical website development skills using HTML, CSS, responsive layout, and browser-friendly design to build clean web pages from scratch."
  },
  {
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    id: "1OP823531PQK",
    date: "2025.05.02",
    color: "from-emerald-500/20 to-blue-500/10",
    image: "/certificates/sertifikat3.jpg",
    icon: Award,
    details: "Hands-on front-end web experience learning page structure, component layout, and user interface design for beginner web applications."
  },
  {
    title: "Financial literacy 101",
    issuer: "Dicoding indonesia",
    id: "CERT-2287-B1",
    date: "2025.05.02",
    color: "from-orange-500/20 to-yellow-500/10",
    image: "/certificates/sertifikat4.png",
    icon: Award,
    details: "Optimization of parallel processing algorithms and memory management for large-scale data crunching and low-latency execution environments."
  }
];
