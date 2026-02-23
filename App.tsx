import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data';
import Modal from './Modal';
import { Play, Gamepad2, Download, ChevronRight, Phone, MessageCircle, ExternalLink, BookOpen } from 'lucide-react';

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Animated wrapper component
const AnimatedSection: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ 
  children, 
  delay = 0,
  className = '' 
}) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Type definitions based on data.js structure
interface ProjectLink {
  video?: string;
  play?: string;
}

interface Project {
  name: string;
  desc: string;
  type?: string;
  videoUrl?: string;
  tag?: string;
  links?: ProjectLink;
}

interface ExperienceItem {
  name: string;
  role: string;
  sub: string;
  desc: string;
  highlights: string[];
  videoUrl?: string;
}

const App: React.FC = () => {
  const { profile, sections, footer } = portfolioData;
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    url: string | null;
    title: string | null;
    type: 'video' | 'game' | null;
  }>({
    isOpen: false,
    url: null,
    title: null,
    type: null,
  });

  const openModal = (url: string | undefined, title: string, type: 'video' | 'game') => {
    if (!url) return;
    setModalState({
      isOpen: true,
      url,
      title,
      type,
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Helper to split text by newline for proper rendering
  const renderText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'Phone': return <Phone size={18} />;
      case 'WeChat': return <MessageCircle size={18} />;
      case 'Xiaohongshu': return <BookOpen size={18} />;
      default: return <MessageCircle size={18} />;
    }
  };

  const getContactLabel = (type: string) => {
    switch (type) {
      case 'Phone': return '电话';
      case 'WeChat': return '微信';
      case 'Xiaohongshu': return '小红书';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen font-sans text-ink selection:bg-gray-200 selection:text-black pb-24">
      <Modal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        url={modalState.url}
        title={modalState.title}
        type={modalState.type}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-20 md:pt-32">
        {/* --- Header --- */}
        <header className="mb-24 md:mb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-black">
              {profile.name}
            </h1>
            
            <div className="space-y-4">
              {/* Title */}
              <p className="text-xl md:text-2xl text-subtle font-light flex flex-wrap items-center gap-x-3 gap-y-1">
                {profile.title.split('|').map((t, i, arr) => (
                  <React.Fragment key={i}>
                    <span className="whitespace-nowrap">{t.trim()}</span>
                    {i < arr.length - 1 && <span className="text-gray-300 text-sm">/</span>}
                  </React.Fragment>
                ))}
              </p>
              
              {/* Subtitle */}
              <div className="text-lg md:text-xl text-gray-500 leading-relaxed flex flex-col gap-1">
                {profile.subtitle.split('|').map((t, i) => (
                  <span key={i} className="block">{t.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* --- Section 1: LLM Experiments --- */}
        <section className="mb-32">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
               <span className="font-serif font-bold text-2xl text-gray-300">01</span>
               <h2 className="font-serif text-2xl font-bold">{sections[0].title.substring(4)}</h2>
            </div>
            
            {/* Theory / Description */}
            <div className="mb-12 max-w-2xl">
              <p className="text-gray-600 leading-relaxed text-lg">
                {renderText(sections[0].description)}
              </p>
              
              <div className="mt-8">
                <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">
                  {sections[0].quoteTitle}
                </p>
                <blockquote className="border-l-2 border-gray-200 pl-4 py-1">
                  <p className="font-serif italic text-xl text-gray-800">
                    "{sections[0].quote}"
                  </p>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* Project Cards */}
          <div className="flex flex-col gap-6">
            {sections[0].projects.map((project: Project, idx: number) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden hover:bg-white hover:shadow-md transition-all duration-300">
                  {project.videoUrl && (
                    <div className="w-full aspect-video">
                      <iframe
                        src={project.videoUrl}
                        className="w-full h-full"
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* --- Section 2: Interactive Narrative Experiments --- */}
        <section className="mb-32">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
               <span className="font-serif font-bold text-2xl text-gray-300">02</span>
               <h2 className="font-serif text-2xl font-bold">{sections[1].title.substring(4)}</h2>
            </div>

            <div className="mb-12 max-w-2xl">
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {renderText(sections[1].description)}
              </p>
              
              <div className="mt-8">
                <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">
                  {sections[1].quoteTitle}
                </p>
                <blockquote className="border-l-2 border-gray-200 pl-4 py-1">
                  <p className="font-serif italic text-xl text-gray-800">
                    "{sections[1].quote}"
                  </p>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 21 Week Collection Card */}
            <AnimatedSection className="md:col-span-1">
              <div className="bg-gray-100 border border-gray-200 p-6 rounded-xl flex flex-col justify-between hover:bg-gray-50 hover:shadow-md transition-all duration-300 h-full">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      {sections[1].projects[2].tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {sections[1].projects[2].name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {sections[1].projects[2].desc}
                  </p>
                </div>
                <div className="flex gap-3">
                  {sections[1].projects[2].links?.video && (
                    <button
                      onClick={() => openModal(sections[1].projects[2].links!.video, sections[1].projects[2].name, 'video')}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-black transition-colors"
                    >
                      <Play size={14} /> Video
                    </button>
                  )}
                  {sections[1].projects[2].links?.play && (
                    <a
                      href={sections[1].projects[2].links?.play}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      <Gamepad2 size={14} /> Play
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>

            {/* Individual Game Cards */}
            {sections[1].projects.slice(0, 2).map((project: Project, idx: number) => (
              <AnimatedSection key={idx} delay={(idx + 1) * 100} className="md:col-span-1">
                <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl flex flex-col justify-between hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                  <div>
                     <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        {project.tag}
                      </span>
                     </div>
                     <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                     <p className="text-sm text-gray-600 leading-relaxed mb-6">
                       {project.desc}
                     </p>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    {project.links?.video && (
                      <button 
                        onClick={() => openModal(project.links!.video, project.name, 'video')}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-black transition-colors"
                      >
                        <Play size={14} /> Video
                      </button>
                    )}
                    {project.links?.play && (
                      <a 
                        href={project.links.play}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                      >
                        <Gamepad2 size={14} /> Play
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* --- Section 3: Project Experience --- */}
        <section className="mb-32">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-12">
               <span className="font-serif font-bold text-2xl text-gray-300">03</span>
               <h2 className="font-serif text-2xl font-bold">{sections[2].title}</h2>
            </div>
          </AnimatedSection>

          <div className="space-y-16">
            {sections[2].items.map((item: ExperienceItem, idx: number) => (
              <AnimatedSection key={idx} delay={idx * 150}>
                <div className="relative pl-8 md:pl-0">
                  {/* Mobile timeline line */}
                  <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-100 md:hidden"></div>
                  
                  <div className="grid md:grid-cols-4 gap-4 md:gap-12">
                    <div className="md:col-span-1 flex flex-col items-start">
                      <h3 className="text-2xl font-serif font-bold">{item.name}</h3>
                      <span className="mt-2 bg-gray-100 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide text-gray-600">
                        {item.role}
                      </span>
                      {item.videoUrl && (
                        <button 
                          onClick={() => openModal(item.videoUrl, item.name, 'video')}
                          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:border-black hover:shadow-sm transition-all"
                        >
                          <Play size={14} /> Video
                        </button>
                      )}
                    </div>
                    
                    <div className="md:col-span-3">
                      <p className="text-sm text-gray-400 font-mono mb-4">{item.sub}</p>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {renderText(item.desc)}
                      </p>
                      <ul className="space-y-2">
                        {item.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-3 text-sm text-gray-600">
                            <ChevronRight size={16} className="mt-0.5 text-gray-300 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="border-t border-gray-100 pt-20 pb-12">
          <AnimatedSection>
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              
              <p className="text-xl md:text-2xl font-serif text-gray-800 mb-10 leading-relaxed">
                {footer.statement}
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                {footer.contact.map((item: {type: string, value: string}, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                    {getContactIcon(item.type)}
                    <span className="text-sm font-medium">{getContactLabel(item.type)}</span>
                    <span className="font-mono text-sm text-gray-500">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-20 text-xs text-gray-300 font-mono">
                &copy; {new Date().getFullYear()} {profile.name} • {profile.studio}
              </div>
            </div>
          </AnimatedSection>
        </footer>
      </div>
    </div>
  );
};

export default App;