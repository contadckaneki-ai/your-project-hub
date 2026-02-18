import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/50 bg-card/50 py-12"
    >
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div>
            <span className="font-display text-xl font-bold">
              <span className="gradient-text">K</span>ally
            </span>
            <p className="mt-2 text-sm text-muted-foreground">O melhor bot para o Discord!</p>
            <p className="mt-1 text-xs text-muted-foreground">Copyright © 2026 Kally Team.</p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="mb-3 text-sm font-semibold">Kally</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#suporte" className="hover:text-foreground transition-colors">Servidor de Suporte</a></li>
                <li><a href="#planos" className="hover:text-foreground transition-colors">Planos</a></li>
                <li><a href="#comandos" className="hover:text-foreground transition-colors">Comandos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Sobre nós</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
