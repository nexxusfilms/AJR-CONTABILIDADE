/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import {
  MapPin,
  CheckCircle2,
  Calculator,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  FileText,
  Users,
  Menu,
  X,
  Clock,
  Award,
  Instagram,
  Facebook,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Constants ---

const BRAND_PHONE = "11940141936";
const BRAND_EMAIL = "contato@contabilidadeajr.com.br";
const BRAND_ADDRESS = "R. Mangaratiba, 134 - Sala 3 - Cidade Dutra, São Paulo - SP, 04811-010";
const BRAND_HOURS = "Segunda à Sexta – das 09:00 às 18:00";
const CRC = "CRC 2SP032834/O-3";
const CLIENT_PORTAL_URL = "https://contabildataapp.azurewebsites.net/Account/Login";
const WHATSAPP_URL = `https://wa.me/55${BRAND_PHONE}`;

const INSTAGRAM_URL = "https://www.instagram.com/contabilidadeajroficial/";
const FACEBOOK_URL = "https://www.facebook.com/contabilidadeajroficial";

const SOCIOS = ["Ademario", "Neemias"];

const PLANS = [
  {
    id: "bronze",
    name: "Bronze",
    features: [
      "Profissional Liberal / MEI / Empresa de Serviço",
      "Tributação Simples Nacional",
      "Escrituração Fiscal",
      "Folha de Pró-labore 1 Sócio",
      "Faturamento mensal até 15k",
    ],
    highlight: false,
  },
  {
    id: "prata",
    name: "Prata",
    features: [
      "Tributação Simples Nacional",
      "Escrituração Fiscal",
      "Folha de Pró-labore até 2 Sócios",
      "Folha de Pagamento até 3 Funcionários",
      "Faturamento mensal até 50k",
    ],
    highlight: true,
  },
  {
    id: "ouro",
    name: "Ouro",
    features: [
      "Tributação Simples Nacional",
      "Escrituração Fiscal",
      "Folha de Pró-labore até 3 Sócios",
      "Folha de Pagamento até 6 Funcionários",
      "Faturamento mensal até 100k",
    ],
    highlight: false,
  },
  {
    id: "platinum",
    name: "Platinum",
    features: [
      "Tributação Lucro Real / Presumido",
      "Escrituração Fiscal",
      "Folha de Pró-labore",
      "Folha de Pagamento",
      "Faturamento mensal acima de 100k",
    ],
    highlight: true,
  },
];

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Travessia 2027", href: "#travessia" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Planos", href: "#planos" },
  { label: "Contato", href: "#contato" },
];

// --- Components ---

const TransparentLogo = ({ src, className, invert = false }: { src: string; className?: string; invert?: boolean }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r > 230 && g > 230 && b > 230) {
          data[i + 3] = 0;
        } else if (invert) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL("image/png"));
    };
  }, [src, invert]);

  if (!dataUrl) return <div className={`${className} bg-natural-surface animate-pulse rounded-md`} />;

  return <img src={dataUrl} alt="AJR Contabilidade" className={className} referrerPolicy="no-referrer" />;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerActive = isScrolled || isMenuOpen;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerActive ? "bg-natural-bg shadow-xl py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TransparentLogo
            src="https://pbs.twimg.com/media/HGIvGklWYAAruY0?format=jpg&name=large"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
            invert={!headerActive}
          />
          <div className="flex flex-col">
            <span className={`text-lg md:text-xl font-bold font-serif tracking-tight transition-colors ${headerActive ? "text-natural-primary" : "text-white"}`}>
              AJR <span className="text-natural-accent">CONTABILIDADE</span>
            </span>
            <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${headerActive ? "text-natural-muted" : "text-white/70"}`}>
              Assessoria & Consultoria
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-semibold transition-all duration-300 hover:text-natural-accent hover:scale-105 ${headerActive ? "text-natural-ink" : "text-white/90"}`}
            >
              {item.label}
            </a>
          ))}
          <div className="h-6 w-px bg-white/20"></div>
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
            className="bg-natural-accent hover:brightness-95 text-natural-primary px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-natural-accent/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Diagnóstico Gratuito
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
            className="md:hidden bg-natural-bg border-t border-natural-surface overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-natural-primary text-xl font-bold tracking-tight hover:text-natural-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
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
                href={WHATSAPP_URL}
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

const Hero = ({ showPlansModal, setShowPlansModal }: { showPlansModal: boolean; setShowPlansModal: (v: boolean) => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    plano: "",
    tipo: "",
    nicho: "",
    servico: "",
  });

  useEffect(() => {
    const handleSetPlan = (e: any) => setFormData((prev) => ({ ...prev, plano: e.detail }));
    const handleSetServico = (e: any) => setFormData((prev) => ({ ...prev, servico: e.detail }));
    window.addEventListener("setPlan", handleSetPlan);
    window.addEventListener("setServico", handleSetServico);
    return () => {
      window.removeEventListener("setPlan", handleSetPlan);
      window.removeEventListener("setServico", handleSetServico);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const tipoStr = formData.tipo ? `\n- Tipo: ${formData.tipo}` : "";
    const nichoStr = formData.tipo === "Jurídica" && formData.nicho ? `\n- Nicho: ${formData.nicho}` : "";
    const servicoStr = formData.servico ? `\n- Serviço de interesse: ${formData.servico}` : "";
    const assunto = formData.servico ? `quero falar sobre ${formData.servico}` : "quero agendar o Diagnóstico Tributário AJR";

    const message = encodeURIComponent(
      `Olá AJR Contabilidade!\n\nVi o site e ${assunto}.\n\n*Meus dados:*\n- Nome: ${formData.nome}\n- E-mail: ${formData.email}\n- WhatsApp: ${formData.whatsapp}${tipoStr}${nichoStr}${servicoStr}\n- Plano de interesse: ${formData.plano || "Não selecionado"}`
    );
    window.open(`${WHATSAPP_URL}?text=${message}`, "_blank");
  };

  const selectPlanFromModal = (planName: string) => {
    setFormData((prev) => ({ ...prev, plano: planName }));
    setShowPlansModal(false);
  };

  return (
    <section id="inicio" className="relative min-h-screen pt-32 pb-16 lg:py-32 flex items-center overflow-hidden bg-natural-primary">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://pbs.twimg.com/media/HGJIzXZWQAAKRf2?format=jpg&name=4096x4096"
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-40 lg:opacity-30 object-right md:object-center scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-natural-primary/80 via-natural-primary/60 to-natural-primary lg:bg-gradient-to-r lg:from-natural-primary lg:via-natural-primary/40 lg:to-natural-primary/10"></div>
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
                className="relative bg-natural-bg w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 lg:p-12 border border-natural-surface"
              >
                <button
                  onClick={() => setShowPlansModal(false)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white border border-natural-surface flex items-center justify-center hover:bg-natural-accent hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h3 className="text-3xl md:text-5xl font-bold font-serif text-natural-primary mb-4">Escolha o plano ideal</h3>
                  <p className="text-natural-muted">Selecione uma das opções abaixo para que possamos fornecer um orçamento personalizado para a sua empresa.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`flex flex-col rounded-[2.5rem] p-8 transition-all border shadow-sm ${
                        plan.highlight
                          ? "bg-natural-primary text-white border-2 border-natural-accent"
                          : "bg-white text-natural-ink border-natural-surface hover:border-natural-accent/50"
                      }`}
                    >
                      <h4 className={`text-xl font-black font-serif mb-4 ${plan.highlight ? "text-white" : "text-natural-primary"}`}>{plan.name}</h4>
                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex gap-2 text-xs leading-tight items-start">
                            <CheckCircle2 size={14} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-natural-accent" : "text-natural-cyan"}`} />
                            <span className={plan.highlight ? "text-white/80" : "text-natural-ink/70"}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => selectPlanFromModal(plan.name)}
                        className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg ${
                          plan.highlight
                            ? "bg-white text-natural-primary hover:bg-natural-accent"
                            : "bg-natural-primary text-white hover:bg-natural-accent hover:text-natural-primary"
                        }`}
                      >
                        Selecionar plano
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Award size={14} className="text-natural-accent" />
            15 anos cuidando de empresa de serviço e indústria
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif text-white leading-[1.1] md:leading-[1.05] mb-6 md:mb-8">
            Sua empresa pronta para a <span className="text-natural-accent">travessia de 2027</span>.
          </h1>
          <p className="text-white/80 text-base md:text-xl lg:text-2xl mb-10 max-w-xl leading-relaxed font-medium">
            A reforma tributária vai mudar como o seu imposto é calculado. A AJR antecipa esse impacto no seu caixa — com dois
            sócios que atendem você pelo nome, não pelo número de protocolo.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12 lg:mb-16">
            {[
              "Planejamento tributário para 2027",
              "Gestão de folha e pró-labore",
              "BPO financeiro e fluxo de caixa",
              "Abertura e revisão de enquadramento",
            ].map((benefit, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03, x: 5 }} className="flex items-center gap-4 text-white group cursor-default">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/15 text-natural-accent flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/20">
                  <CheckCircle2 size={16} strokeWidth={3} />
                </div>
                <span className="text-sm md:text-base font-bold tracking-tight opacity-90 group-hover:opacity-100">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-12 lg:gap-20">
            {[
              { value: "15+", label: "Anos de operação" },
              { value: "+250", label: "Empresas atendidas" },
              { value: "11", label: "Frentes de serviço" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                className={`flex flex-col items-center lg:items-start text-center lg:text-left ${i === 1 ? "border-x border-white/10 px-2 md:px-0 md:border-none" : ""}`}
              >
                <span className="text-3xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight text-natural-accent">{stat.value}</span>
                <span className="text-white/60 text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] mt-1 whitespace-nowrap">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
          <div className="absolute -inset-6 bg-natural-accent/20 blur-[100px] rounded-full opacity-40"></div>
          <div className="relative bg-natural-bg p-6 md:p-14 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-natural-surface">
            {!submitted ? (
              <>
                <div className="mb-6 md:mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-natural-primary mb-2 md:mb-3">Diagnóstico Tributário AJR</h3>
                  <p className="text-natural-muted text-xs md:text-sm font-medium">
                    40 minutos, sem custo, com o Ademario ou o Neemias. Você sai com uma leitura da sua exposição em 2027.
                  </p>
                </div>
                <form onSubmit={handleSubmit} id="lead-form" className="space-y-6">
                  {formData.servico && (
                    <div className="flex items-start gap-3 rounded-2xl bg-natural-accent/15 border border-natural-accent/40 px-5 py-4">
                      <MessageCircle size={18} className="text-natural-accent flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-natural-primary uppercase tracking-[0.2em]">Assunto</p>
                        <p className="text-sm font-semibold text-natural-primary">Falar sobre {formData.servico}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, servico: "" })}
                        aria-label="Remover assunto"
                        className="text-natural-primary/60 hover:text-natural-primary transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Nome completo</label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: João da Silva"
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent transition-all duration-300 placeholder:text-natural-muted/60 text-sm font-medium shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">E-mail corporativo</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="joao@suaempresa.com.br"
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent transition-all duration-300 placeholder:text-natural-muted/60 text-sm font-medium shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "").slice(0, 11);
                        let formatted = val;
                        if (val.length > 0) {
                          formatted = "(" + val.slice(0, 2);
                          if (val.length > 2) {
                            formatted += ") " + val.slice(2, 7);
                            if (val.length > 7) formatted += "-" + val.slice(7);
                          }
                        }
                        setFormData({ ...formData, whatsapp: formatted });
                      }}
                      placeholder="(00) 00000-0000"
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent transition-all duration-300 placeholder:text-natural-muted/60 text-sm font-medium shadow-inner"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Pessoa Física ou Jurídica?</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.tipo}
                          onChange={(e) => setFormData({ ...formData, tipo: e.target.value, nicho: e.target.value === "Física" ? "" : formData.nicho })}
                          className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent transition-all duration-300 appearance-none cursor-pointer text-sm font-medium shadow-inner"
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

                    {formData.tipo === "Jurídica" && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Qual o seu nicho?</label>
                        <div className="relative">
                          <select
                            required
                            value={formData.nicho}
                            onChange={(e) => setFormData({ ...formData, nicho: e.target.value })}
                            className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent transition-all duration-300 appearance-none cursor-pointer text-sm font-medium shadow-inner"
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
                    <label className="block text-[10px] font-black text-natural-primary uppercase tracking-[0.2em] mb-2 ml-1">Plano de interesse</label>
                    <div className="relative">
                      <select
                        value={formData.plano}
                        onChange={(e) => setFormData({ ...formData, plano: e.target.value })}
                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl text-natural-ink focus:outline-none focus:border-natural-accent transition-all duration-300 appearance-none cursor-pointer text-sm font-medium shadow-inner"
                      >
                        <option value="">Selecione um plano (opcional)</option>
                        {PLANS.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
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
                      Dúvida no plano? <span className="underline">clique aqui</span>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 bg-natural-accent hover:brightness-95 text-natural-primary rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-natural-accent/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-6"
                  >
                    Agendar meu diagnóstico
                  </button>
                  <p className="text-[10px] text-natural-muted text-center pt-4 font-medium opacity-70">
                    Confidencialidade total dos seus dados. Sem compromisso.
                  </p>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-16 h-16 bg-natural-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h3 className="text-natural-primary text-2xl font-bold font-serif mb-4">Recebido!</h3>
                <p className="text-natural-muted text-sm">Um dos sócios entra em contato pelo WhatsApp em instantes.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-natural-accent font-bold text-sm underline">
                  Enviar novo formulário
                </button>
              </motion.div>
            )}
          </div>

          <div className="absolute -bottom-6 -right-4 bg-natural-bg py-2 px-4 rounded-full shadow-lg border border-natural-surface flex items-center gap-2">
            <ShieldCheck size={16} className="text-natural-green" />
            <span className="text-[10px] font-bold text-natural-primary uppercase tracking-wider">{CRC} · Ativo</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TRAVESSIA_STEPS = [
  {
    tag: "2026 · ano do teste",
    title: "A alíquota de teste já vale",
    desc: "1% de CBS e IBS, compensável — não aumenta a carga. O impacto é operacional: nota fiscal com campos novos, cadastro, NCM e sistema.",
    quote: "“Minha nota foi rejeitada e ninguém me explicou por quê.”",
    color: "text-natural-cyan",
  },
  {
    tag: "Nov–Dez 2026 · janela de decisão",
    title: "60 dias para escolher a estrutura",
    desc: "Última janela para simular o regime, revisar o enquadramento e preparar o sistema para o ano seguinte.",
    quote: "“Tenho pouco tempo para decidir e não sei com base em quê.”",
    color: "text-natural-accent",
  },
  {
    tag: "2027 · ano da conta",
    title: "O imposto muda de verdade",
    desc: "PIS e Cofins são extintos e a CBS passa a valer de fato. Para empresa de serviço, isso normalmente significa recalcular a base.",
    quote: "“Meu imposto mudou e eu não estava pronto.”",
    color: "text-natural-green",
  },
];

const Travessia = () => {
  return (
    <section id="travessia" className="py-20 lg:py-32 bg-natural-primary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 ajr-diagonal opacity-80"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16 lg:mb-20">
          <h2 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">A travessia de 2027</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
            A maior mudança tributária em 60 anos acontece <span className="text-natural-accent">agora</span>.
          </h3>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            Ninguém quer descobrir uma mudança de imposto pela multa. A AJR já está nessa conversa — para que, quando
            2027 virar dor de caixa, a sua empresa já esteja do outro lado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {TRAVESSIA_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col rounded-[2rem] p-7 md:p-8 bg-white/5 border border-white/10 hover:border-natural-accent/40 transition-colors"
            >
              <span className={`text-[10px] font-black uppercase tracking-[0.18em] mb-4 ${step.color}`}>{step.tag}</span>
              <h4 className="text-xl font-bold font-serif mb-3">{step.title}</h4>
              <p className="text-sm text-white/70 leading-relaxed flex-grow">{step.desc}</p>
              <p className="mt-6 pt-6 border-t border-white/10 text-sm text-white/80 italic">{step.quote}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="#lead-form"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-natural-accent text-natural-primary rounded-2xl font-black uppercase tracking-[0.15em] text-xs shadow-xl shadow-natural-accent/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            Ver como fica no meu caso <ArrowRight size={16} />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs transition-all hover:bg-white/10 active:scale-95"
          >
            Falar com um sócio <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-20 lg:py-32 bg-natural-bg overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative order-2 lg:order-1">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-natural-accent/10 rounded-full blur-3xl opacity-50"></div>
            <img
              src="https://pbs.twimg.com/media/HGI7UmnbUAAi7fv?format=jpg&name=4096x4096"
              alt="Escritório AJR Contabilidade na Cidade Dutra, São Paulo"
              className="rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/5] md:aspect-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-natural-bg p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-xl border border-natural-surface z-20 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-natural-primary flex items-center justify-center text-natural-accent">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-natural-muted uppercase tracking-widest">Atendimento</p>
                  <p className="font-bold text-natural-primary text-sm md:text-base">Ademario &amp; Neemias, sócios</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <h2 className="text-xs font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">Sobre nós</h2>
            <h3 className="text-3xl md:text-5xl font-bold font-serif text-natural-ink mb-6 md:mb-8 leading-tight">
              Uma operação de 15 anos.{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Dois sócios que atendem você.</span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute left-0 bottom-1 h-2 bg-natural-accent/40 -z-10"
                ></motion.span>
              </span>
            </h3>

            <div className="space-y-6 text-natural-ink/80 leading-relaxed text-base md:text-lg">
              <p>
                O <strong>Escritório AJR Contabilidade</strong> atua há mais de 15 anos em assessoria contábil, fiscal, legal e
                trabalhista, folha, BPO financeiro e consultoria de gestão — um portfólio de escritório médio, sob o mesmo teto.
              </p>
              <p>
                O que não muda: quem responde é sócio. <strong>Ademario</strong> e <strong>Neemias</strong> estão na frente do
                atendimento, com nome, rosto e resposta em até 2 horas úteis. Aqui você não fala com um protocolo.
              </p>
            </div>

            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-natural-surface">
                <span className="text-natural-cyan font-bold text-base">Tecnologia com propósito</span>
                <p className="text-sm text-natural-ink/60">Simulação tributária na tela e um painel que você acessa quando quiser.</p>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-natural-surface">
                <span className="text-natural-green font-bold text-base">Sempre em conformidade</span>
                <p className="text-sm text-natural-ink/60">Prazo, enquadramento e obrigações acompanhados — e você é avisado antes.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DORES = [
  {
    dor: "“Meu contador só me manda guia. Nunca me explica nada.”",
    resposta: "Todo mês você recebe os números com leitura: o que eles significam para a sua margem, não só o valor a pagar.",
  },
  {
    dor: "“Desconfio que estou no regime errado e pagando imposto a mais.”",
    resposta: "Simulação Presumido x Real x Simples com a sua realidade. Se dá para pagar menos dentro da lei, mostramos e assinamos embaixo.",
  },
  {
    dor: "“Ninguém me avisou da mudança. Descobri quando a multa chegou.”",
    resposta: "Você é avisado antes. Acompanhamos prazo, enquadramento e obrigações — e a gente te procura, não o contrário.",
  },
  {
    dor: "“Preciso de alguém que responda hoje, não em três dias úteis.”",
    resposta: "No WhatsApp quem responde é sócio, com compromisso de resposta em até 2 horas úteis.",
  },
  {
    dor: "“Não faço ideia do que 2027 vai fazer com a minha margem.”",
    resposta: "É a conversa que a gente puxa desde agora — no Diagnóstico Tributário AJR, 40 minutos com o Ademario ou o Neemias.",
  },
];

const Dores = () => {
  return (
    <section className="py-20 lg:py-32 bg-natural-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <h2 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">O que a gente resolve</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-serif mb-6">Se você já disse alguma dessas frases, a AJR é para você.</h3>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {DORES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid md:grid-cols-[1fr_1.2fr] gap-4 md:gap-8 rounded-3xl p-6 md:p-8 bg-white/5 border border-white/10"
            >
              <p className="text-white/90 font-serif text-lg md:text-xl leading-snug italic">{item.dor}</p>
              <div className="flex gap-3">
                <ArrowRight size={18} className="text-natural-accent flex-shrink-0 mt-1 hidden md:block" />
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{item.resposta}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SERVICES = [
  {
    title: "Assessoria Contábil",
    desc: "Escrituração, balancetes e demonstrações que viram informação para decidir — não papel para arquivar.",
    icon: <Calculator className="text-natural-primary" />,
    resumo:
      "Cuidamos da contabilidade completa da sua empresa: registramos cada movimento, fechamos o mês e transformamos isso em relatórios que você entende e usa para decidir.",
    inclui: [
      "Escrituração contábil completa e conciliação de contas",
      "Balancetes mensais e balanço patrimonial anual",
      "DRE (demonstração de resultado) com leitura do que os números significam",
      "ECD e ECF entregues no prazo",
      "Apoio para acesso a crédito: o banco olha o seu balanço antes de emprestar",
    ],
    paraQuem: "Toda empresa que precisa de contabilidade organizada e quer usar os números para gerir, não só para cumprir obrigação.",
  },
  {
    title: "Assessoria Fiscal & Tributária",
    desc: "Apuração, obrigações e planejamento para você pagar o mínimo dentro da lei, com alguém que assina embaixo.",
    icon: <ShieldCheck className="text-natural-primary" />,
    resumo:
      "Apuramos os seus impostos todo mês e revisamos se o regime tributário ainda é o melhor para a sua realidade — principalmente com a reforma de 2027 chegando.",
    inclui: [
      "Apuração mensal de impostos e emissão de guias",
      "Entrega das obrigações acessórias (SPED, DCTF, EFD e afins)",
      "Simulação Simples x Presumido x Real com os seus números",
      "Planejamento tributário e revisão de enquadramento",
      "Acompanhamento da reforma tributária (CBS e IBS) e do impacto no seu caixa",
    ],
    paraQuem: "Empresa de serviço ou indústria que desconfia estar pagando imposto a mais, ou que precisa se preparar para a virada de 2027.",
  },
  {
    title: "Assessoria Trabalhista (RH)",
    desc: "Folha, pró-labore, encargos e eSocial em dia — sem susto na virada do mês.",
    icon: <Users className="text-natural-primary" />,
    resumo:
      "Assumimos toda a rotina de pessoal da sua empresa: cálculo da folha, encargos, férias, 13º, admissões, desligamentos e o envio ao eSocial.",
    inclui: [
      "Folha de pagamento e recibos mensais",
      "Pró-labore dos sócios e cálculo do Fator R",
      "Admissão, rescisão, férias e 13º salário",
      "Guias de INSS, FGTS e IRRF",
      "Transmissão do eSocial e da DCTFWeb",
    ],
    paraQuem: "Empresa com funcionários ou com pró-labore de sócios que quer a folha correta e sem atraso, todo mês.",
  },
  {
    title: "Legalização de Empresas",
    desc: "Abertura, alteração, encerramento e revisão de enquadramento com agilidade e leitura jurídica.",
    icon: <Briefcase className="text-natural-primary" />,
    resumo:
      "Resolvemos a parte burocrática da vida da empresa na Junta Comercial, na Receita e na Prefeitura — da abertura ao encerramento, passando por qualquer alteração no meio do caminho.",
    inclui: [
      "Abertura de empresa e definição de CNAE e natureza jurídica",
      "Alteração contratual: sócios, capital, endereço, atividade",
      "Encerramento e baixa de CNPJ",
      "Licenças, alvarás e inscrições municipais e estaduais",
      "Revisão de enquadramento e do regime tributário",
    ],
    paraQuem: "Quem vai abrir empresa, mudar a estrutura societária ou precisa regularizar pendências de cadastro.",
  },
  {
    title: "BPO Financeiro",
    desc: "Contas a pagar e receber, fluxo de caixa e conciliação sob nossa gestão. Você olha o painel, não a papelada.",
    icon: <TrendingUp className="text-natural-primary" />,
    resumo:
      "Terceirização da rotina financeira: nós operamos contas a pagar, contas a receber, conciliação bancária e fluxo de caixa. Você acompanha por um painel e decide com número na mão.",
    inclui: [
      "Contas a pagar e a receber",
      "Conciliação bancária diária",
      "Fluxo de caixa projetado e relatório gerencial mensal",
      "Emissão de boletos e cobrança",
      "Painel financeiro que você acessa quando quiser",
    ],
    paraQuem: "Empresa acima de R$ 50 mil/mês que perde tempo com a papelada financeira ou não tem um número de caixa confiável para decidir.",
  },
  {
    title: "Consultoria Jurídica",
    desc: "Suporte especializado em Trabalhista e Previdenciário para proteger o patrimônio dos sócios.",
    icon: <FileText className="text-natural-primary" />,
    resumo:
      "Apoio jurídico nas áreas que mais afetam o dono da empresa: relações de trabalho e previdência. O objetivo é evitar passivo e proteger o patrimônio dos sócios.",
    inclui: [
      "Revisão de contratos e políticas trabalhistas",
      "Orientação preventiva sobre riscos de reclamatória",
      "Análise previdenciária dos sócios e da retirada de lucros",
      "Suporte em fiscalização e defesa administrativa",
      "Estruturação societária com foco em proteção patrimonial",
    ],
    paraQuem: "Sócios que querem reduzir exposição a processos trabalhistas e organizar a relação entre pessoa física e empresa.",
  },
];

const Services = ({ onSelect }: { onSelect: (index: number) => void }) => {
  return (
    <section id="servicos" className="py-20 lg:py-32 bg-natural-bg">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">O que fazemos</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-serif text-natural-ink mb-6">11 frentes de serviço sob o mesmo teto</h3>
          <p className="text-natural-muted text-sm md:text-base">
            Da abertura ao crescimento, cuidamos de toda a estrutura contábil para você focar em vender e gerir.
            <span className="block mt-1 text-natural-primary font-semibold">Clique em uma frente para ver o que ela inclui.</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((s, idx) => (
            <motion.button
              key={idx}
              type="button"
              onClick={() => onSelect(idx)}
              whileHover={{ y: -8 }}
              className="text-left p-8 bg-white border border-natural-surface rounded-3xl hover:shadow-2xl hover:border-natural-accent/40 transition-all flex flex-col items-start gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-natural-accent"
            >
              <div className="p-3 bg-natural-bg rounded-2xl group-hover:bg-natural-accent/15 transition-colors">{s.icon}</div>
              <h4 className="text-xl font-bold font-serif text-natural-primary">{s.title}</h4>
              <p className="text-natural-muted text-sm leading-relaxed">{s.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.15em] text-natural-primary group-hover:text-natural-accent transition-colors">
                Ver detalhes <ArrowRight size={14} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceModal = ({ index, onClose }: { index: number | null; onClose: () => void }) => {
  const service = index === null ? null : SERVICES[index];

  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-natural-primary/85 backdrop-blur-sm"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            className="relative bg-natural-bg w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-natural-surface"
          >
            <div className="absolute top-6 right-6">
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="w-11 h-11 rounded-full bg-white border border-natural-surface flex items-center justify-center hover:bg-natural-primary hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-7 sm:p-10 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white rounded-2xl border border-natural-surface">{service.icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-natural-primary pr-10">{service.title}</h3>
              </div>

              <p className="text-natural-ink/80 text-base md:text-lg leading-relaxed mb-8">{service.resumo}</p>

              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-natural-accent mb-4">O que inclui</h4>
              <ul className="space-y-3 mb-8">
                {service.inclui.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm md:text-base text-natural-ink/80 leading-snug">
                    <CheckCircle2 size={18} className="text-natural-cyan flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl bg-white border border-natural-surface p-5 mb-8">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-natural-primary mb-1.5">Para quem é</p>
                <p className="text-sm text-natural-ink/70 leading-relaxed">{service.paraQuem}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("setServico", { detail: service.title }));
                    onClose();
                    setTimeout(() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-natural-accent text-natural-primary rounded-2xl font-black uppercase tracking-[0.15em] text-xs shadow-lg shadow-natural-accent/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Falar sobre esse serviço <ArrowRight size={16} />
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-natural-primary/20 text-natural-primary rounded-2xl font-black uppercase tracking-[0.15em] text-xs transition-all hover:bg-natural-primary hover:text-white active:scale-95"
                >
                  WhatsApp <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Plans = () => {
  const scrollToForm = (planName: string) => {
    window.dispatchEvent(new CustomEvent("setPlan", { detail: planName }));
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="planos" className="py-20 lg:py-32 bg-natural-surface relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">Investimento</h2>
          <h3 className="text-3xl md:text-5xl font-black font-serif text-natural-ink mb-6">
            Planos sob medida para <br className="hidden md:block" /> a sua fase
          </h3>
          <p className="text-natural-ink/60 text-sm md:text-base">Escolha a estrutura ideal para o momento da empresa e escale com segurança.</p>
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
                <div className="w-12 h-1 bg-natural-accent mx-auto rounded-full"></div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex gap-3 text-sm leading-tight items-start">
                    <CheckCircle2 size={16} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-natural-accent" : "text-natural-cyan"}`} />
                    <span className={plan.highlight ? "text-white/80" : "text-natural-ink/70"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToForm(plan.name)}
                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                  plan.highlight ? "bg-white text-natural-primary hover:bg-natural-accent" : "bg-natural-primary text-white hover:bg-natural-accent hover:text-natural-primary"
                }`}
              >
                Receber orçamento
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DIFERENCIAIS = [
  {
    title: "Você fala com o sócio",
    desc: "Ademario e Neemias atendem, aparecem e respondem. Nenhuma plataforma consegue prometer isso.",
  },
  {
    title: "Tecnologia que devolve tempo",
    desc: "Simulação tributária na tela, fechamento mensal organizado e um painel que você acessa quando quiser.",
  },
  {
    title: "Adaptação por segmento",
    desc: "O mesmo serviço muda entre uma indústria e um prestador de serviço. A gente conhece a diferença.",
  },
  {
    title: "15 anos de estrada",
    desc: "Num setor em que 41% dos escritórios abriram nos últimos quatro anos, tempo de casa é raro — e verificável.",
  },
];

const Benefits = ({ setShowHistoryModal }: { setShowHistoryModal: (v: boolean) => void }) => {
  return (
    <section id="diferenciais" className="py-20 lg:py-32 bg-natural-bg">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-1">
          <h2 className="text-xs md:text-sm font-bold text-natural-accent uppercase tracking-[0.3em] mb-4">Por que a AJR?</h2>
          <h3 className="text-3xl md:text-5xl font-bold font-serif text-natural-ink mb-8 leading-tight">
            Muito mais que números: entregamos parceria e resultado.
          </h3>

          <div className="space-y-6">
            {DIFERENCIAIS.map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-natural-primary/10 text-natural-accent flex items-center justify-center transition-colors group-hover:bg-natural-primary group-hover:text-white">
                  <CheckCircle2 size={16} strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-bold font-serif text-natural-ink mb-1 text-lg">{item.title}</h4>
                  <p className="text-natural-muted text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowHistoryModal(true)}
            className="mt-10 w-full sm:w-auto px-10 py-5 border-2 border-natural-primary text-natural-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-natural-primary hover:text-white transition-all active:scale-95"
          >
            Conhecer nossa história
          </button>
        </div>

        <div className="relative order-2 lg:mt-0 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 md:pt-12">
              <div className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-xl border border-natural-surface">
                <Clock className="text-natural-cyan mb-4" />
                <h4 className="font-bold font-serif text-natural-ink text-xl">Agilidade</h4>
                <p className="text-xs md:text-sm text-natural-muted mt-2">Resposta em até 2 horas úteis, direto com quem atende.</p>
              </div>
              <div className="p-6 md:p-8 bg-natural-primary rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={100} />
                </div>
                <h4 className="font-bold font-serif text-white relative z-10 text-xl">Confiança</h4>
                <p className="text-xs md:text-sm text-white/80 mt-2 relative z-10">Sua contabilidade entregue com precisão.</p>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="p-6 md:p-8 bg-natural-primary rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <TrendingUp size={100} className="text-white" />
                </div>
                <h4 className="font-bold font-serif text-white relative z-10 text-xl">Resultado</h4>
                <p className="text-xs md:text-sm text-white/80 mt-2 relative z-10">Foco na rentabilidade real da sua empresa.</p>
              </div>
              <div className="relative rounded-2xl md:rounded-3xl h-48 md:h-64 w-full flex items-center justify-center p-8 shadow-2xl z-10 border border-natural-surface overflow-hidden group bg-natural-bg">
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://pbs.twimg.com/media/HGJBMYCWwAAKnIn?format=jpg&name=4096x4096"
                    className="w-full h-full object-cover blur-md opacity-30 group-hover:scale-110 transition-transform duration-700"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-natural-bg/70"></div>
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
  const navAddress = "Rua Mangaratiba, 134, São Paulo";
  const navQuery = encodeURIComponent(navAddress);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(BRAND_ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="contato" className="py-16 md:py-24 lg:py-32 bg-natural-bg">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-natural-bg rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 lg:p-20 shadow-2xl border border-natural-surface">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="space-y-6 md:space-y-12">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black font-serif text-natural-primary tracking-tight md:text-left text-center">
                Onde nos encontrar
              </h2>

              <div className="space-y-6 md:space-y-10">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-natural-accent/10 flex items-center justify-center flex-shrink-0 text-natural-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-black text-natural-primary text-lg md:text-2xl uppercase tracking-tight">Endereço</p>
                    <p className="text-natural-muted font-medium leading-relaxed mt-1 md:mt-2 text-sm md:text-lg">{BRAND_ADDRESS}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-natural-accent/10 flex items-center justify-center flex-shrink-0 text-natural-accent">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-black text-natural-primary text-lg md:text-2xl uppercase tracking-tight">Horário</p>
                    <p className="text-natural-muted font-medium leading-relaxed mt-1 md:mt-2 text-sm md:text-lg">{BRAND_HOURS}</p>
                  </div>
                </div>

                <p className="text-natural-muted text-sm md:text-base leading-relaxed md:pl-[4.5rem]">
                  Atendimento presencial na Cidade Dutra, Capela do Socorro e toda a zona sul de São Paulo — e digital para
                  o restante do Sudeste.
                </p>
              </div>

              <div className="space-y-4 max-w-lg mt-8">
                <a
                  href="#lead-form"
                  className="w-full py-6 bg-natural-accent hover:brightness-95 text-natural-primary rounded-2xl font-black uppercase tracking-[0.25em] text-xs shadow-xl shadow-natural-accent/20 transition-all hover:scale-[1.02] text-center block active:scale-95"
                >
                  Agendar diagnóstico
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${navQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-5 bg-natural-primary hover:brightness-125 text-white rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                  >
                    Google Maps <ExternalLink size={14} />
                  </a>
                  <a
                    href={`https://www.waze.com/ul?q=${navQuery}&navigate=yes`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-5 bg-natural-cyan hover:brightness-95 text-natural-primary rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                  >
                    Waze <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

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
                  title="Localização AJR Contabilidade — Cidade Dutra, São Paulo"
                  className="filter contrast-[1.05]"
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
    { name: "Prefeitura de São Paulo", url: "https://www.prefeitura.sp.gov.br/" },
  ];

  return (
    <footer className="bg-natural-primary pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 text-white/70">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <TransparentLogo src="https://pbs.twimg.com/media/HGIvGklWYAAruY0?format=jpg&name=large" className="w-12 h-12 object-contain" invert={true} />
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-serif tracking-tight text-white">
                  AJR <span className="text-natural-accent">CONTABILIDADE</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/50">Assessoria & Consultoria</span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed mb-6">
              15 anos de contabilidade consultiva para empresa de serviço e indústria na zona sul de São Paulo. Aqui você
              fala com o sócio, não com o protocolo.
            </p>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-natural-accent/15 text-natural-accent text-[10px] font-black uppercase tracking-[0.15em] mb-6">
              #Travessia2027
            </span>
            <div className="flex flex-wrap gap-4">
              <a
                href={CLIENT_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-natural-accent hover:text-natural-primary text-white rounded-lg text-sm font-bold transition-all"
              >
                <Users size={16} /> Área do Cliente
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold font-serif text-white mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-natural-accent transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-serif text-white mb-6">Links úteis</h4>
            <ul className="space-y-4 text-sm">
              {USEFUL_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-natural-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-serif text-white mb-6">Siga a AJR</h4>
            <div className="flex flex-col gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-all">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Instagram size={20} className="text-natural-accent" />
                </div>
                <span className="text-sm font-medium">@contabilidadeajroficial</span>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-white transition-all">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Facebook size={20} className="text-natural-accent" />
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
              © 2026 AJR Contabilidade. Todos os direitos reservados. <span className="text-white/60 font-medium">{CRC}.</span>
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

const StoryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
                alt=""
              />
              <div className="absolute inset-0 bg-natural-bg/85"></div>
            </div>

            <div className="relative z-10 p-6 sm:p-10 md:p-14 overflow-y-auto max-h-[90vh]">
              <button
                onClick={onClose}
                className="sticky top-0 float-right z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-natural-surface flex items-center justify-center hover:bg-natural-primary hover:text-white transition-all shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="mb-8 md:mb-10 clear-both">
                <h3 className="text-3xl md:text-5xl font-black font-serif text-natural-primary mb-4">
                  Nossa <span className="text-natural-accent">história</span>
                </h3>
                <div className="h-1.5 w-24 bg-natural-accent rounded-full"></div>
              </div>

              <div className="space-y-5 md:space-y-6 text-natural-ink/80 text-base md:text-lg leading-relaxed font-medium">
                <p>
                  O Escritório <strong className="text-natural-primary">AJR Contabilidade</strong> tem mais de 15 anos de
                  expertise em assessoria contábil, legal, fiscal, trabalhista e consultoria de gestão empresarial.
                </p>
                <p>
                  Ao longo desse tempo, desenvolvemos metodologias próprias para identificar necessidades complexas e
                  transmitir conhecimento técnico de forma clara. Atuamos com{" "}
                  <strong className="text-natural-primary">transparência, ética e compromisso</strong> com o resultado dos
                  nossos clientes.
                </p>
                <p>
                  Nosso diferencial é unir a experiência humana às{" "}
                  <strong className="text-natural-primary">ferramentas mais modernas</strong> do mercado, em um ambiente
                  digital seguro e confidencial — com dois sócios sempre acessíveis.
                </p>
                <p>
                  A missão é a excelência contínua: não apenas atender, mas{" "}
                  <strong className="text-natural-primary">antecipar o que vem</strong> e proteger a competitividade de cada
                  empresa que confia na AJR.
                </p>
              </div>

              <div className="mt-10 md:mt-12 pt-8 border-t border-natural-surface flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-natural-accent/20 flex items-center justify-center text-natural-accent">
                    <Award size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-natural-primary">15 anos de operação</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-natural-green/15 flex items-center justify-center text-natural-green">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-natural-primary">Segurança de dados</span>
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
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);

  useEffect(() => {
    if (showPlansModal || showHistoryModal || serviceIndex !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [showPlansModal, showHistoryModal, serviceIndex]);

  return (
    <div className="min-h-screen font-sans text-natural-ink selection:bg-natural-accent/30">
      <Navbar />
      <Hero showPlansModal={showPlansModal} setShowPlansModal={setShowPlansModal} />
      <Travessia />
      <About />
      <Dores />
      <Services onSelect={setServiceIndex} />
      <Plans />
      <Benefits setShowHistoryModal={setShowHistoryModal} />
      <FinalCTA />
      <Footer />
      <StoryModal isOpen={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
      <ServiceModal index={serviceIndex} onClose={() => setServiceIndex(null)} />
    </div>
  );
}
