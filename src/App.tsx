/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  Users,
  Menu,
  X,
  MessageCircle,
  Clock,
  Award,
  Instagram,
  Facebook,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Constants ---

const BRAND_PHONE = "11940141936";
const BRAND_EMAIL = "contato@contabilidadeajr.com.br";
const BRAND_ADDRESS = "R. Mangaratiba, 134 - Sala 3 - Cidade Dutra, São Paulo - SP, 04811-010";
const BRAND_HOURS = "Segunda à Sexta – das 08:00 às 18:00";
const CLIENT_PORTAL_URL = "https://contabildataapp.azurewebsites.net/Account/Login";

const PLANS = [
  {
    id: "bronze",
    name: "Bronze",
    features: [
      "Profissional Liberal/MEI/Empresa de Serviço",
      "Tributação Simples Nacional",
      "Escrituração Fiscal",
      "Folha de Pró-labore 1 Sócio",
      "Faturamento mensal até 15k"
    ],
    highlight: false
  },
  {
    id: "prata",
    name: "Prata",
    features: [
      "Tributação Simples Nacional",
      "Escrituração Fiscal",
      "Folha de Pró-labore até 2 Sócios",
      "Folha de Pagamento Até 3 Funcionários",
      "Faturamento mensal até 50k"
    ],
    highlight: true
  },
  {
    id: "ouro",
    name: "Ouro",
    features: [
      "Tributação Simples Nacional",
      "Escrituração Fiscal",
      "Folha de Pró-labore até 3 Sócios",
      "Folha de Pagamento Até 6 Funcionários",
      "Faturamento mensal até 100k"
    ],
    highlight: false
  },
  {
    id: "platinum",
    name: "Platinum",
    features: [
      "Tributação Lucro Real / Presumido",
      "Escrituração Fiscal",
      "Folha de Pró-labore",
      "Folha de Pagamento",
      "Faturamento mensal acima de 100k"
    ],
    highlight: true
  }
];

// --- Components ---

const TransparentLogo = ({ src, className, invert = false }: { src: string, className?: string, invert?: boolean }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // Se for branco ou muito próximo de branco, torna transparente
        if (r > 230 && g > 230 && b > 230) {
          data[i + 3] = 0;
        } else if (invert) {
          // Se não for transparente e estiver no modo invertido (para o rodapé escuro)
          data[i] = 255;
          data[i+1] = 255;
          data[i+2] = 255;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL('image/png'));
    };
  }, [src, invert]);

  if (!dataUrl) return <div className={`${className} bg-gray-200 animate-pulse rounded-md`} />;

  return (
    <img 
      src={dataUrl} 
      alt="AJR Contabilidade Logo" 
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine header appearance based on scroll or if mobile menu is open
  const headerActive = isScrolled || isMenuOpen;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerActive ? "bg-white shadow-xl py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TransparentLogo 
            src="https://pbs.twimg.com/media/HGIvGklWYAAruY0?format=jpg&name=large" 
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            invert={!headerActive}
          />
          <div className="flex flex-col">
            <span className={`text-lg md:text-xl font-bold font-serif tracking-tighter transition-colors ${headerActive ? "text-natural-primary" : "text-white"}`}>
              AJR <span className="text-natural-accent">CONTABILIDADE</span>
            </span>
            <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${headerActive ? "text-natural-muted" : "text-white/70"}`}>
              Assessoria & Consultoria
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {["Início", "Sobre", "Serviços", "Planos", "Contato"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              className={`text-sm font-semibold transition-all duration-300 hover:text-natural-accent hover:scale-105 ${headerActive ? "text-natural-ink" : "text-white/90"}`}
            >
              {item}
            </a>
          ))}
          <div className="h-6 w-[1px] bg-natural-surface/20"></div>
          <a 
            href={CLIENT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-bold flex items-center gap-2 transition-all duration-300 ${headerActive ? "text-natural-primary" : "text-white"} hover:text-natural-accent hover:scale-105`}
          >
            <Users size={16} /> Área do Cliente
          </a>
          <a 
            href="#lead-form"
            className="bg-natural-accent hover:bg-natural-accent/90 text-natural-primary px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-natural-accent/20 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            Fale Conosco
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 rounded-lg transition-colors hover:bg-black/5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className={headerActive ? "text-natural-primary" : "text-white"} size={28} />
          ) : (
            <Menu className={headerActive ? "text-natural-primary" : "text-white"} size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-5">
              {["Início", "Sobre", "Serviços", "Planos", "Contato"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(" ", "-")}`} 
                  className="text-natural-primary text-xl font-bold tracking-tight hover:text-natural-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <hr className="border-natural-surface" />
              <a 
                href={CLIENT_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-natural-muted text-lg font-semibold flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users size={20} /> Área do Cliente
              </a>
              <a 
                href="https://wa.me/55${BRAND_PHONE}"
                onClick={() => setIsMenuOpen(false)}
                className="bg-natural-accent text-natural-primary p-4 rounded-2xl text-center font-black uppercase tracking-widest text-xs shadow-xl shadow-natural-accent/20"
              >
                Chamar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ showPlansModal, setShowPlansModal }: { showPlansModal: boolean, setShowPlansModal: (v: boolean) => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    plano: "",
    tipo: "",
    nicho: ""
  });

  // Listener para capturar plano escolhido via evento customizado
  useEffect(() => {
    const handleSetPlan = (e: any) => {
      setFormData(prev => ({ ...prev, plano: e.detail }));
    };
    window.addEventListener('setPlan', handleSetPlan);
    return () => window.removeEventListener('setPlan', handleSetPlan);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Redireciona para WhatsApp com os dados
    const tipoStr = formData.tipo ? `\n- Tipo: ${formData.tipo}` : "";
    const nichoStr = (formData.tipo === "Jurídica" && formData.nicho) ? `\n- Nicho: ${formData.nicho}` : "";
    
    const message = encodeURIComponent(
      `Olá AJR Contabilidade!\n\nAcabei de ver o site e gostaria de um orçamento.\n\n*Meus Dados:*\n- Nome: ${formData.nome}\n- E-mail: ${formData.email}\n- WhatsApp: ${formData.whatsapp}${tipoStr}${nichoStr}\n- Plano de Interesse: ${formData.plano || "Não selecionado"}`
    );
    window.open(`https://wa.me/55${BRAND_PHONE}?text=${message}`, "_blank");
  };

  const selectPlanFromModal = (planName: string) => {
    setFormData(prev => ({ ...prev, plano: planName }));
    setShowPlansModal(false);
  };

  return (
    <section id="início" className="relative min-h-screen pt-32 pb-16 lg:py-32 flex items-center overflow-hidden bg-natural-primary">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://pbs.twimg.com/media/HGJIzXZWQAAKRf2?format=jpg&name=4096x4096" 
          alt="AJR Contabilidade Background"
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-60 lg:opacity-50 object-right md:object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-natural-primary/70 via-natural-primary/50 to-natural-primary/100 lg:bg-gradient-to-r lg:from-natural-primary lg:via-natural-primary/30 lg:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-[1.2fr_420px] xl:grid-cols-[1.1fr_480px] gap-12 lg:gap-24 items-center">
        {/* Modal Planos */}
        <AnimatePresence>
          {showPlansModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPlansModal(false)}
                className="absolute inset-0 bg-natural-primary/80 backdrop-blur-sm"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 lg:p-12 border border-natural-surface"
              >
                <button 
                  onClick={() => setShowPlansModal(false)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-natural-bg border border-natural-surface flex items-center justify-center hover:bg-natural-accent hover:text-white transition-all transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h3 className="text-3xl md:text-5xl font-bold font-serif text-natural-primary mb-4">Escolha o Plano Ideal</h3>
                  <p className="text-natural-muted">Selecione uma das opções abaixo para que possamos fornecer um orçamento personalizado para sua empresa.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PLANS.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`flex flex-col rounded-[2.5rem] p-8 transition-all border shadow-sm ${
                        plan.highlight 
                        ? "bg-natural-primary text-white border-2 border-natural-accent" 
                        : "bg-natural-bg text-natural-ink border-natural-surface hover:border-natural-accent/50"
                      }`}
                    >
                      <h4 className={`text-xl font-black font-serif mb-4 ${plan.highlight ? "text-white" : "text-natural-primary"}`}>{plan.name}</h4>
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex gap-2 text-xs leading-tight items-start">
                            <CheckCircle2 size={14} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-natural-accent" : "text-natural-primary"}`} />
                            <span className={plan.highlight ? "text-white/80" : "text-black/70"}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button 
                        onClick={() => selectPlanFromModal(plan.name)}
                        className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg ${
                          plan.highlight 
                          ? "bg-white text-natural-primary hover:bg-natural-accent hover:text-natural-primary" 
                          : "bg-natural-primary text-white hover:bg-natural-accent hover:text-natural-primary"
                        }`}
                      >
                        Selecionar Plano
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-natural-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-natural-primary/20 mb-8">
            <Award size={14} className="text-natural-accent" />
            Especialistas em Gestão Empresarial
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif text-white leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 drop-shadow-md">
            Sua empresa segura, <span className="text-natural-accent italic">lucrativa</span> e livre de burocracia.
          </h1>
          <p className="text-white/80 text-base md:text-xl lg:text-2xl mb-10 max-w-xl leading-relaxed font-medium">
            Transformamos a contabilidade do seu negócio em uma ferramenta de crescimento estratégico com atendimento humanizado e tecnologia de ponta.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12 lg:mb-16">
            {[
              "Gestão Fiscal e Tributária",
              "Gestão de Folha de Pagamento",
              "Abertura e Legalização",
              "Consultoria Estratégica"
            ].map((benefit, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center justify-start gap-4 text-white group cursor-default"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 text-natural-accent flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-white/20">
                   <CheckCircle2 size={16} strokeWidth={3} />
                </div>
                <span className="text-sm md:text-base font-bold tracking-tight opacity-90 transition-opacity group-hover:opacity-100">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-12 lg:gap-20">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center lg:items-start group transition-all text-center lg:text-left"
             >
                <CheckCircle2 size={24} md:size={32} strokeWidth={2.5} className="text-white/80 mb-1 md:mb-2 transition-transform group-hover:scale-110" />
                <span className="text-2xl md:text-5xl lg:text-6xl font-black font-serif tracking-tighter text-white">98%</span>
                <span className="text-white/60 text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] mt-1 whitespace-nowrap">Satisfação</span>
             </motion.div>
             
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col items-center lg:items-start group transition-all text-center lg:text-left border-x border-white/10 px-2 md:px-0 md:border-none"
             >
                <Clock size={24} md:size={32} strokeWidth={2.5} className="text-white/80 mb-1 md:mb-2 transition-transform group-hover:scale-110" />
                <span className="text-2xl md:text-5xl lg:text-6xl font-black font-serif tracking-tighter text-white">15+</span>
                <span className="text-white/60 text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] mt-1 whitespace-nowrap">Exp.</span>
             </motion.div>
             
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col items-center lg:items-start group transition-all text-center lg:text-left"
             >
                <Users size={24} md:size={32} strokeWidth={2.5} className="text-white/80 mb-1 md:mb-2 transition-transform group-hover:scale-110" />
                <span className="text-2xl md:text-5xl lg:text-6xl font-black font-serif tracking-tighter text-white">500+</span>
                <span className="text-white/60 text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] mt-1 whitespace-nowrap">Clientes</span>
             </motion.div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="relative"
        >
          <div className="absolute -inset-6 bg-natural-accent/20 blur-[100px] rounded-full opacity-40"></div>
          <div className="relative bg-white p-6 md:p-14 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-natural-surface transition-all duration-500 hover:shadow-natural-accent/10">
            {!submitted ? (
              <>
                <div className="mb-6 md:mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-natural-primary mb-2 md:mb-3">Diagnóstico Gratuito</h3>
                  <p className="text-natural-muted text-xs md:text-sm font-medium">Receba uma análise estratégica da sua empresa em até 15 minutos.</p>
                </div>
                <form onSubmit={handleSubmit} id="lead-form" className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      placeholder="Ex: João da Silva"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent focus:bg-white transition-all duration-300 placeholder:text-gray-400 text-sm font-medium shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">E-mail Corporativo</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="joao@suaempresa.com.br"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent focus:bg-white transition-all duration-300 placeholder:text-gray-400 text-sm font-medium shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.whatsapp}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, '').slice(0, 11);
                        let formatted = val;
                        if (val.length > 0) {
                          formatted = "(" + val.slice(0, 2);
                          if (val.length > 2) {
                            formatted += ") " + val.slice(2, 7);
                            if (val.length > 7) {
                              formatted += "-" + val.slice(7);
                            }
                          }
                        }
                        setFormData({...formData, whatsapp: formatted});
                      }}
                      placeholder="(00) 00000-0000"
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent focus:bg-white transition-all duration-300 placeholder:text-gray-400 text-sm font-medium shadow-inner"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Pessoa Física ou Jurídica?</label>
                      <div className="relative">
                        <select 
                            required
                            value={formData.tipo}
                            onChange={(e) => setFormData({...formData, tipo: e.target.value, nicho: e.target.value === 'Física' ? '' : formData.nicho})}
                            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent focus:bg-white transition-all duration-300 appearance-none cursor-pointer text-sm font-medium shadow-inner"
                        >
                          <option value="">Selecione...</option>
                          <option value="Física">Pessoa Física</option>
                          <option value="Jurídica">Pessoa Jurídica</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-natural-accent">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>

                    {formData.tipo === 'Jurídica' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Qual o seu Nicho?</label>
                        <div className="relative">
                          <select 
                              required
                              value={formData.nicho}
                              onChange={(e) => setFormData({...formData, nicho: e.target.value})}
                              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent focus:bg-white transition-all duration-300 appearance-none cursor-pointer text-sm font-medium shadow-inner"
                          >
                            <option value="">Selecione o nicho...</option>
                            <option value="Comércio">Comércio</option>
                            <option value="Serviços">Serviços</option>
                            <option value="Indústria">Indústria</option>
                            <option value="Saúde">Saúde / Medicina</option>
                            <option value="Advocacia">Advocacia</option>
                            <option value="Engenharia">Engenharia / Arquitetura</option>
                            <option value="Tecnologia">TI / Tecnologia</option>
                            <option value="Outros">Outros</option>
                          </select>
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-natural-accent">
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Plano de Interesse</label>
                    <div className="relative">
                      <select 
                          value={formData.plano}
                          onChange={(e) => setFormData({...formData, plano: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent focus:bg-white transition-all duration-300 appearance-none cursor-pointer text-sm font-medium shadow-inner"
                      >
                        <option value="">Selecione um plano (Opcional)</option>
                        {PLANS.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                        <option value="Personalizado">Outro / Personalizado</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-natural-accent">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowPlansModal(true)}
                      className="mt-4 ml-1 text-[13px] md:text-[15px] font-black text-natural-primary hover:text-natural-accent transition-colors flex items-center gap-1 uppercase tracking-[0.05em]"
                    >
                      Dúvidas no plano? <span className="underline italic">clique aqui!</span>
                    </button>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-natural-accent hover:bg-natural-accent/90 text-natural-primary rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-natural-accent/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] mt-6"
                  >
                    Quero meu Diagnóstico Gratuito
                  </button>
                  <p className="text-[10px] text-natural-muted text-center pt-4 font-medium opacity-60 italic">
                    Garantimos a total confidencialidade dos seus dados.
                  </p>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-natural-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h3 className="text-natural-primary text-2xl font-bold font-serif mb-4">Sucesso!</h3>
                <p className="text-natural-muted text-sm">Um especialista entrará em contato em instantes.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-natural-accent font-bold text-sm underline"
                >
                  Enviar novo formulário
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Trust Badge */}
          <div className="absolute -bottom-6 -right-4 bg-white py-2 px-4 rounded-full shadow-lg border border-natural-surface flex items-center gap-2">
             <ShieldCheck size={16} className="text-natural-accent" />
             <span className="text-[10px] font-bold text-natural-primary uppercase tracking-wider">CRC Ativo 2SP032834/O-3</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
            >
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-natural-accent/10 rounded-full blur-3xl opacity-50"></div>
                <img 
                    src="https://pbs.twimg.com/media/HGI7UmnbUAAi7fv?format=jpg&name=4096x4096" 
                    alt="Sede AJR Contabilidade" 
                    className="rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/5] md:aspect-auto"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-xl border border-natural-surface z-20 hidden sm:block">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-natural-primary flex items-center justify-center text-natural-accent shadow-lg shadow-natural-primary/20">
                            <Award size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-natural-muted uppercase tracking-widest">Experiência</p>
                            <p className="font-bold text-natural-primary text-sm md:text-base">15+ Anos no Mercado</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
            >
                <h2 className="text-xs font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">Sobre Nós</h2>
                <h3 className="text-3xl md:text-5xl font-bold font-serif text-natural-ink mb-6 md:mb-8 leading-tight">
                  Excelência Contábil <span className="whitespace-nowrap">com <span className="relative inline-block">
                    <span className="relative z-10">DNA Estratégico</span>
                    <motion.span 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="absolute left-0 bottom-1 h-2 bg-natural-accent/40 -z-10"
                    ></motion.span>
                  </span></span>
                </h3>
                
                <div className="space-y-6 text-black/80 leading-relaxed text-base md:text-lg">
                    <p>
                        Com mais de 15 anos de trajetória sólida, o <strong>Escritório AJR Contabilidade</strong> é hoje uma organização referência em assessoria contábil, legal, fiscal e de gestão empresarial.
                    </p>
                    <p>
                        Nossa jornada é pautada pela transparência e pelo compromisso em transformar desafios burocráticos em inteligência estratégica. Elaboramos metodologias próprias que garantem soluções eficientes, éticas e responsáveis aos nossos parceiros.
                    </p>
                </div>

                <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="flex flex-col gap-2 p-4 bg-natural-bg/50 rounded-2xl border border-natural-surface/30">
                        <span className="text-natural-accent font-bold text-base">Confidencialidade</span>
                        <p className="text-sm text-black/60">Ambiente 100% seguro para seus dados empresariais.</p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 bg-natural-bg/50 rounded-2xl border border-natural-surface/30">
                        <span className="text-natural-accent font-bold text-base">Comprometimento</span>
                        <p className="text-sm text-black/60">Parceria duradoura focada na sua satisfação.</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const Plans = () => {
    const scrollToForm = (planName: string) => {
        window.dispatchEvent(new CustomEvent('setPlan', { detail: planName }));
        const element = document.getElementById('lead-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="planos" className="py-20 lg:py-32 bg-white relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                    <h2 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">Investimento</h2>
                    <h3 className="text-3xl md:text-5xl font-black font-serif text-natural-ink mb-6">Planos Sob Medida para <br className="hidden md:block" /> seu Negócio</h3>
                    <p className="text-black/60 text-sm md:text-base">Escolha a estrutura ideal para sua atual fase empresarial e escale com segurança.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {PLANS.map((plan, idx) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex flex-col rounded-[2rem] md:rounded-[2.5rem] p-7 md:p-8 transition-all hover:scale-[1.02] shadow-xl ${
                                plan.highlight 
                                ? "bg-natural-primary text-white border-2 border-natural-accent shadow-natural-primary/20" 
                                : "bg-natural-bg text-natural-ink border border-natural-surface"
                            }`}
                        >
                            <div className="mb-8 text-center">
                                <h4 className={`text-2xl font-black font-serif mb-2 ${plan.highlight ? "text-white" : "text-natural-primary"}`}>{plan.name}</h4>
                                <div className={`w-12 h-1 bg-natural-accent mx-auto rounded-full`}></div>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex gap-3 text-sm leading-tight items-start">
                                        <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-natural-accent" : "text-natural-primary"}`} />
                                        <span className={plan.highlight ? "text-white/80" : "text-black/70"}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => scrollToForm(plan.name)}
                                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                                    plan.highlight 
                                    ? "bg-white text-natural-primary hover:bg-natural-accent hover:text-natural-primary" 
                                    : "bg-natural-primary text-white hover:bg-natural-accent hover:text-natural-primary"
                                }`}
                            >
                                Receba um orçamento
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Services = () => {
  const services = [
    {
      title: "Assessoria Contábil",
      desc: "Escrituração completa, balancetes e demonstrações financeiras para total controle do seu negócio.",
      icon: <Calculator className="text-natural-primary" />,
    },
    {
      title: "Assessoria Fiscal & Tributária",
      desc: "Planejamento detalhado para redução legal de impostos e conformidade com todas as obrigações.",
      icon: <ShieldCheck className="text-natural-primary" />,
    },
    {
      title: "Assessoria Trabalhista (RH)",
      desc: "Gestão completa de folha de pagamento, encargos e eSocial com segurança e agilidade.",
      icon: <Users className="text-natural-primary" />,
    },
    {
      title: "Legalização de Empresas",
      desc: "Abertura, alteração e encerramento de empresas com agilidade e inteligência jurídica.",
      icon: <Briefcase className="text-natural-primary" />,
    },
    {
      title: "BPO Financeiro",
      desc: "Terceirização da gestão do seu fluxo de caixa para você focar apenas no que importa: crescer.",
      icon: <TrendingUp className="text-natural-primary" />,
    },
    {
      title: "Consultoria Jurídica",
      desc: "Suporte especializado em áreas Trabalhista e Previdenciária para proteção total do seu patrimônio.",
      icon: <FileText className="text-natural-primary" />,
    },
  ];

  return (
    <section id="serviços" className="py-20 lg:py-32 bg-natural-bg">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">O que fazemos</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-serif text-natural-ink mb-6">Soluções Completas para sua Tranquilidade Fiscal</h3>
          <p className="text-natural-muted text-sm md:text-base">Da abertura ao crescimento, cuidamos de toda a estrutura contábil para que você possa focar exclusivamente em vender e gerir.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              className="p-8 bg-white border border-natural-surface rounded-3xl hover:shadow-2xl transition-all hover:bg-natural-surface/10 flex flex-col items-start gap-4 group"
            >
              <div className="p-3 bg-natural-bg rounded-2xl group-hover:bg-white transition-colors">
                {s.icon}
              </div>
              <h4 className="text-xl font-bold font-serif text-natural-primary">{s.title}</h4>
              <p className="text-natural-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = ({ setShowHistoryModal }: { setShowHistoryModal: (v: boolean) => void }) => {
  return (
    <section id="diferenciais" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-1">
          <h1 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">Por que a AJR?</h1>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-natural-ink mb-8 leading-tight">Muito mais que números: Entregamos Parceria e Resultados.</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 group">
              <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-natural-primary/10 text-natural-accent flex items-center justify-center transition-colors group-hover:bg-natural-primary group-hover:text-white">
                <CheckCircle2 size={16} strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-bold font-serif text-natural-ink mb-1 text-lg">Consultoria Estratégica</h3>
                <p className="text-natural-muted text-sm md:text-base">Direcionamento focado em resultados reais para o crescimento da sua empresa.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-natural-primary/10 text-natural-accent flex items-center justify-center transition-colors group-hover:bg-natural-primary group-hover:text-white">
                <CheckCircle2 size={16} strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-bold font-serif text-natural-ink mb-1 text-lg">Suporte Ágil e Eficiente</h3>
                <p className="text-natural-muted text-sm md:text-base">Respostas imediatas para suas dúvidas, garantindo a fluidez do seu dia a dia.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-natural-primary/10 text-natural-accent flex items-center justify-center transition-colors group-hover:bg-natural-primary group-hover:text-white">
                <CheckCircle2 size={16} strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-bold font-serif text-natural-ink mb-1 text-lg">Tranquilidade e Segurança</h3>
                <p className="text-natural-muted text-sm md:text-base">Sua empresa sempre em conformidade, protegida com rigor jurídico e contábil.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowHistoryModal(true)}
            className="mt-10 w-full sm:w-auto px-10 py-5 border-2 border-natural-primary text-natural-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-natural-primary hover:text-white transition-all shadow-xl shadow-natural-primary/10 hover:shadow-natural-primary/20 active:scale-95"
          >
            Conhecer Nossa História
          </button>
        </div>

        <div className="relative order-2 lg:mt-0 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 md:pt-12">
              <div className="p-6 md:p-8 bg-natural-bg rounded-2xl md:rounded-3xl shadow-xl border border-natural-surface">
                <Clock className="text-natural-accent mb-4" />
                <h4 className="font-bold font-serif text-natural-ink text-xl">Agilidade</h4>
                <p className="text-xs md:text-sm text-natural-muted mt-2">Respostas rápidas para suas solicitações diárias.</p>
              </div>
              <div className="p-6 md:p-8 bg-natural-primary rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                   <ShieldCheck size={100} />
                 </div>
                 <h4 className="font-bold font-serif text-white relative z-10 text-xl">Confiança</h4>
                 <p className="text-xs md:text-sm text-white/80 mt-2 relative z-10">Sua contabilidade entregue com precisão cirúrgica.</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="p-6 md:p-8 bg-natural-primary rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                   <TrendingUp size={100} className="text-white" />
                </div>
                <h4 className="font-bold font-serif text-white relative z-10 text-xl">Resultados</h4>
                <p className="text-xs md:text-sm text-white/80 mt-2 relative z-10">Foco no aumento da rentabilidade da sua empresa.</p>
              </div>
              <div className="relative rounded-2xl md:rounded-3xl h-48 md:h-64 w-full flex items-center justify-center p-8 shadow-2xl z-10 border border-natural-surface overflow-hidden group">
                {/* Background Image for the Logo Card */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://pbs.twimg.com/media/HGJBMYCWwAAKnIn?format=jpg&name=4096x4096" 
                    className="w-full h-full object-cover blur-md opacity-30 group-hover:scale-110 transition-transform duration-700"
                    alt="Background"
                  />
                  <div className="absolute inset-0 bg-white/60"></div>
                </div>
                <img 
                  src="https://pbs.twimg.com/media/HGIlV-KWwAAt_Sa?format=png&name=360x360" 
                  alt="Logo AJR Contabilidade" 
                  className="w-28 h-28 md:w-32 md:h-32 object-contain relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
    // Cleaner address for navigation apps (Waze/Google Maps)
    const navAddress = "Rua Mangaratiba, 134, São Paulo";
    const navQuery = encodeURIComponent(navAddress);
    const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(BRAND_ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <section id="contato" className="py-16 md:py-24 lg:py-32 bg-natural-bg">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 lg:p-20 shadow-2xl border border-natural-surface">
                    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 lg:gap-24 items-center">
                        {/* Info Column */}
                        <div className="space-y-6 md:space-y-12">
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-serif text-natural-primary tracking-tight md:text-left text-center">Onde nos encontrar</h2>
                            
                            <div className="space-y-6 md:space-y-10">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
                                    <div className="w-12 h-12 rounded-2xl bg-natural-accent/10 flex items-center justify-center flex-shrink-0 text-natural-accent shadow-inner">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-natural-primary text-lg md:text-2xl uppercase tracking-tighter">Endereço</p>
                                        <p className="text-natural-muted font-medium leading-relaxed mt-1 md:mt-2 text-sm md:text-lg">{BRAND_ADDRESS}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
                                    <div className="w-12 h-12 rounded-2xl bg-natural-accent/10 flex items-center justify-center flex-shrink-0 text-natural-accent shadow-inner">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-natural-primary text-lg md:text-2xl uppercase tracking-tighter">Horário</p>
                                        <p className="text-natural-muted font-medium leading-relaxed mt-1 md:mt-2 text-sm md:text-lg">{BRAND_HOURS}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 max-w-lg mt-8">
                                <a 
                                    href="#lead-form"
                                    className="w-full py-6 bg-natural-accent hover:bg-natural-accent/90 text-natural-primary rounded-2xl font-black uppercase tracking-[0.25em] text-xs shadow-xl shadow-natural-accent/20 transition-all hover:scale-[1.02] text-center block active:scale-95"
                                >
                                    Agendar Consultoria
                                </a>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${navQuery}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-5 bg-natural-primary hover:bg-natural-primary/95 text-white rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                                    >
                                        Google Maps <ExternalLink size={14} />
                                    </a>
                                    <a 
                                        href={`https://www.waze.com/ul?q=${navQuery}&navigate=yes`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-5 bg-[#33CCFF] hover:bg-[#2CB3E0] text-natural-primary rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                                    >
                                        Waze <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map Column */}
                        <div className="relative group lg:mt-0 mt-8">
                            <div className="absolute -inset-4 bg-natural-accent/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative w-full aspect-video md:aspect-square bg-natural-surface rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-natural-surface lg:scale-105">
                                <iframe 
                                    src={mapEmbedUrl}
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localização AJR Contabilidade"
                                    className="filter contrast-[1.1] grayscale-[0.1]"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
  const USEFUL_LINKS = [
    { name: "Receita Federal", url: "https://www.gov.br/receitafederal/pt-br" },
    { name: "Simples Nacional", url: "http://www8.receita.fazenda.gov.br/SimplesNacional/" },
    { name: "Previdência Social", url: "https://www.gov.br/previdencia/pt-br" },
    { name: "JUCESP", url: "https://www.jucesp.sp.gov.br/" },
    { name: "Portal Empreendedor (MEI)", url: "https://www.gov.br/empresas-e-negocios/pt-br/empreendedor" },
    { name: "Prefeitura de São Paulo", url: "https://www.prefeitura.sp.gov.br/" }
  ];

  return (
    <footer className="bg-natural-primary pt-20 pb-10 border-t border-natural-surface/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 text-white/70">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <TransparentLogo 
                src="https://pbs.twimg.com/media/HGIvGklWYAAruY0?format=jpg&name=large" 
                className="w-12 h-12 object-contain"
                invert={true}
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-serif tracking-tighter text-white">
                  AJR <span className="text-natural-accent">CONTABILIDADE</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/50">
                  Assessoria & Consultoria
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed mb-8">
              Transformamos a contabilidade do seu negócio em uma ferramenta de crescimento estratégico com atendimento humanizado e tecnologia de ponta.
            </p>
            <div className="flex gap-4">
                <a 
                    href={CLIENT_PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-natural-accent text-white rounded-lg text-sm font-bold transition-all"
                >
                    <Users size={16} /> Área do Cliente - Contábil Data
                </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-serif text-white mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#início" className="hover:text-natural-accent transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-natural-accent transition-colors">Sobre Nós</a></li>
              <li><a href="#serviços" className="hover:text-natural-accent transition-colors">Serviços</a></li>
              <li><a href="#planos" className="hover:text-natural-accent transition-colors">Planos de Preços</a></li>
              <li><a href="#contato" className="hover:text-natural-accent transition-colors">Localização</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-serif text-white mb-6">Links Úteis</h4>
            <ul className="space-y-4 text-sm">
              {USEFUL_LINKS.map(link => (
                  <li key={link.name}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-natural-accent transition-colors">
                          {link.name}
                      </a>
                  </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-serif text-white mb-6">Siga a AJR!</h4>
            <div className="flex flex-col gap-4">
                <a 
                  href="https://www.instagram.com/contabilidadeajroficial/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-all group"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all">
                        <Instagram size={20} className="text-[#E4405F]" />
                    </div>
                    <span className="text-sm font-medium">@contabilidadeajroficial</span>
                </a>
                <a 
                  href="https://www.facebook.com/contabilidadeajroficial" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-all group"
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all">
                        <Facebook size={20} className="text-[#1877F2]" />
                    </div>
                    <span className="text-sm font-medium">/contabilidadeajroficial</span>
                </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60">
                <ShieldCheck size={20} />
            </div>
            <p className="text-xs">
              © 2026 AJR Contabilidade. Todos os direitos reservados. <span className="text-white/60 font-medium">CRC Ativo SP-000000/O.</span>
            </p>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <span className="cursor-pointer hover:text-white transition-colors">Privacidade</span>
            <span className="cursor-pointer hover:text-white transition-colors">Termos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const StoryModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-natural-primary/90 backdrop-blur-md"
                    ></motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-natural-surface"
                    >
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="https://pbs.twimg.com/media/HGJBMYCWwAAKnIn?format=jpg&name=4096x4096" 
                                className="w-full h-full object-cover blur-md opacity-40"
                                alt="Fundo História"
                            />
                            <div className="absolute inset-0 bg-white/80"></div>
                        </div>

                        <div className="relative z-10 p-6 sm:p-10 md:p-14 overflow-y-auto max-h-[90vh]">
                            <button 
                                onClick={onClose}
                                className="sticky top-0 float-right z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-natural-bg border border-natural-surface flex items-center justify-center hover:bg-natural-primary hover:text-white transition-all shadow-sm"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8 md:mb-10 clear-both">
                                <h3 className="text-3xl md:text-5xl font-black font-serif text-natural-primary mb-4">Nossa <span className="text-natural-accent">História</span></h3>
                                <div className="h-1.5 w-24 bg-natural-accent rounded-full"></div>
                            </div>

                            <div className="space-y-5 md:space-y-6 text-natural-ink/80 text-base md:text-lg leading-relaxed font-medium">
                                <p>
                                    O Escritório <strong className="text-natural-primary">AJR Contabilidade</strong> é hoje uma organização referência, contando com mais de 15 anos de expertise sólida em assessoria contábil, legal, fiscal, trabalhista e consultoria de gestão empresarial de alto nível.
                                </p>
                                <p>
                                    Nossa jornada nos permitiu desenvolver metodologias exclusivas para identificar necessidades complexas e transmitir conhecimento técnico de forma clara. Atuamos com <strong className="text-natural-primary">transparência, ética e um compromisso inabalável</strong> com o sucesso dos nossos parceiros, gerando soluções ágeis que otimizam a gestão de cada negócio.
                                </p>
                                <p>
                                    Nosso grande diferencial é a união da vasta experiência humana com as <strong className="text-natural-primary">ferramentas tecnológicas mais modernas</strong> do mercado global. Operamos em um ambiente digital 100% seguro e confidencial, garantindo que sua empresa esteja sempre à frente.
                                </p>
                                <p>
                                    Temos como missão a excelência contínua. Por meio de inovação constante e treinamento especializado, buscamos não apenas atender, mas <strong className="text-natural-primary">superar as expectativas</strong>, maximizando os lucros e a competitividade estratégica de nossos clientes no cenário empresarial atual.
                                </p>
                            </div>
                            
                            <div className="mt-10 md:mt-12 pt-8 border-t border-natural-surface flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-natural-accent/20 flex items-center justify-center text-natural-accent">
                                        <Award size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-natural-primary">Excelência em Performance</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-natural-primary/10 flex items-center justify-center text-natural-primary">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-natural-primary">Segurança de Dados</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default function App() {
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    if (showPlansModal || showHistoryModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [showPlansModal, showHistoryModal]);

  return (
    <div className="min-h-screen font-sans text-natural-ink selection:bg-natural-accent/30">
      <Navbar />
      <Hero showPlansModal={showPlansModal} setShowPlansModal={setShowPlansModal} />
      <About />
      <Services />
      <Plans />
      <Benefits setShowHistoryModal={setShowHistoryModal} />
      <FinalCTA />
      <Footer />
      <StoryModal isOpen={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
    </div>
  );
}
