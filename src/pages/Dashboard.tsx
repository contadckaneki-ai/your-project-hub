import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const servers = [
  { name: "catch me if u can", role: "Bot Premium", isPremium: true },
  { name: "VALORANT - BR", role: "Membro" },
  { name: "NECRUM", role: "Membro" },
  { name: "Xeno", role: "Membro" },
  { name: "UwU Hub", role: "Membro" },
  { name: "Argon Hub X | Intelligence", role: "Membro" },
  { name: "jcx traces", role: "Membro" },
  { name: "Water", role: "Membro" },
  { name: "KHALIFA", role: "Membro" },
  { name: "Supremacy", role: "Membro" },
  { name: "RADIANTE", role: "Membro" },
  { name: "Anonymous", role: "Membro" },
  { name: "Leasy", role: "Membro" },
  { name: "Midia Applications", role: "Membro" },
  { name: "Midia St0re #Voltamos", role: "Membro" },
  { name: "Hype #RECOMEÇO", role: "Membro" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Banner />
      <Navbar showUserMenu />

      <main className="flex-1 py-16">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center font-display text-3xl font-bold md:text-4xl"
          >
            Meus Servidores
          </motion.h1>

          <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servers.map((server, i) => (
              <motion.button
                key={server.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.03 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/server/${i + 1}/settings`)}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3 text-left card-hover group"
              >
                <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{server.name}</p>
                  <p className={`text-xs ${server.isPremium ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                    {server.role}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
