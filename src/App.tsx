import { CustomCursor } from './components/ui/CustomCursor';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { HUD } from './components/ui/HUD';
import { Profile } from './components/sections/Profile';
import { Certificates } from './components/sections/Certificates';

import { Navbar } from './components/ui/Navbar';

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <CustomCursor />
      <HUD />
      <CommandPalette />
      
      <main className="bg-dark-bg">
        <Hero />
        <Profile />
        <Projects />
        <Skills />
        <Certificates />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
