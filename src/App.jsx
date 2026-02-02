import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Education from './pages/Education';
import AnonymousChat from './components/AnonymousChat';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200">
      <Header />
      <main className="flex-grow">
        <section id="home">
          <Home />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="education">
          <Education />
        </section>
        {/* <AnonymousChat /> */}
        {/* Anonymous Chat temporarily disabled - backend needs to be deployed */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
