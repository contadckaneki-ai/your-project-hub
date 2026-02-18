import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  LayoutDashboard,
  Shield,
  Sliders,
  CreditCard,
  Link2,
  ShieldAlert,
  Blocks,
  UserCog,
  SmilePlus,
  ScrollText,
  HandMetal,
  Gavel,
  Hash,
  MessageSquare,
  ListChecks,
  Pin,
  FlaskConical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  Save,
  RotateCcw,
  Plus,
  Search,
  X,
  MessageCircle,
  LayoutGrid,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Banner from "@/components/Banner";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  id: string;
  badge?: string;
  badgeColor?: string;
}

interface SidebarGroup {
  title?: string;
  collapsible?: boolean;
  items: SidebarItem[];
}

const sidebarGroups: SidebarGroup[] = [
  {
    items: [
      { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
      { icon: Settings, label: "Configurações", id: "settings" },
      { icon: Sliders, label: "Permissões", id: "permissions" },
      { icon: CreditCard, label: "Financeiro", id: "financial" },
    ],
  },
  {
    title: "PROTEÇÃO",
    collapsible: true,
    items: [
      { icon: Link2, label: "Proteção de Uri", id: "uri-protection" },
      { icon: ShieldAlert, label: "Proteção de Servidor", id: "server-protection", badge: "Update", badgeColor: "bg-primary" },
    ],
  },
  {
    title: "KALLY ENGINE",
    collapsible: true,
    items: [
      { icon: Blocks, label: "Custom Modules", id: "custom-modules", badge: "New", badgeColor: "bg-green-600" },
    ],
  },
  {
    title: "GERENCIAMENTO DE SERVIDOR",
    collapsible: true,
    items: [
      { icon: UserCog, label: "Autorole", id: "autorole", badge: "Update", badgeColor: "bg-primary" },
      { icon: SmilePlus, label: "Reações automática", id: "auto-reactions", badge: "Update", badgeColor: "bg-primary" },
      { icon: ScrollText, label: "Logs de Eventos", id: "event-logs", badge: "Update", badgeColor: "bg-primary" },
      { icon: HandMetal, label: "Bem vindo & Adeus", id: "welcome" },
      { icon: Gavel, label: "Moderação", id: "moderation", badge: "Update", badgeColor: "bg-primary" },
      { icon: Hash, label: "Contadores", id: "counters", badge: "Update", badgeColor: "bg-primary" },
      { icon: MessageSquare, label: "Mensagens", id: "messages" },
      { icon: ListChecks, label: "Whitelist", id: "whitelist", badge: "Update", badgeColor: "bg-primary" },
      { icon: FlaskConical, label: "Bio Checker", id: "bio-checker", badge: "Update", badgeColor: "bg-primary" },
      { icon: Pin, label: "Utilitários", id: "utilities", badge: "Update", badgeColor: "bg-primary" },
    ],
  },
];

const servers: Record<string, string> = {
  "1": "catch me if u can",
  "2": "VALORANT - BR",
  "3": "NECRUM",
  "4": "Xeno",
  "5": "UwU Hub",
};

const mockRoles = [
  { id: "1", name: "zamigaet svet" },
  { id: "2", name: "Jockie Music" },
  { id: "3", name: "Kally Premium" },
  { id: "4", name: "Moderador" },
  { id: "5", name: "Admin" },
  { id: "6", name: "VIP" },
];

interface AllSettings {
  prefix: string;
  botName: string;
  deleteMessage: boolean;
  slashCommands: boolean;
  addedRoles: { id: string; name: string }[];
  addedMembers: { id: string; name: string }[];
  uriProtectionEnabled: boolean;
  uriAccount: string;
  uriOriginal: string;
  uriLogChannel: string;
  uriPunishment: string;
  serverProtectionEnabled: boolean;
  fakeAccountDays: string;
  ignoredRoleProtection: string;
  blockBots: boolean;
  bkGlobalLimit: boolean;
  bkActionLimit: string;
  bkTime: string;
  bkLogChannel: string;
  bkPunishment: string;
  bkRevertActions: boolean;
  bkBlockBans: boolean;
  bkBlockKicks: boolean;
  castActionLimit: string;
  castTime: string;
  castLogChannel: string;
  castPunishment: string;
  castRevertActions: boolean;
  castBlockManual: boolean;
  chGlobalLimit: boolean;
  chActionLimit: string;
  chTime: string;
  chLogChannel: string;
  chPunishment: string;
  chRevertActions: boolean;
  roleGlobalLimit: boolean;
  roleActionLimit: string;
  roleTime: string;
  roleLogChannel: string;
  rolePunishment: string;
  roleRevertActions: boolean;
  roleBlockedRole: string;
  rolePermissions: Record<string, boolean>;
  mgWhitelistRole: string;
  mgPunishment: string;
  mgLogChannel: string;
  cmdAddrole: boolean;
  cmdRemoverole: boolean;
  autoroleEnabled: boolean;
  autoroleRole: string;
  autoroleEmblems: Record<string, string>;
  moderationEnabled: boolean;
  modAutoSpam: string;
  modBlockedWords: string;
  modDuplicateText: string;
  modAntiInvites: string;
  modAntiLinks: string;
  modExcessCaps: string;
  modExcessEmojis: string;
  modExcessMentions: string;
  modZalgo: string;
  modImmunityRoles: string;
  modMutedRole: string;
  modSpamLimit: number;
  modSpamSeconds: number;
  modBlockedExact: string[];
  modBlockedPartial: string[];
  modAllowedLinks: string[];
  modEmojiLimit: number;
  modMentionLimit: number;
  modNotifyBans: boolean;
  modNotifyKicks: boolean;
  modNotifyWarns: boolean;
  modLogBans: string;
  modLogMutes: string;
  modLogKicks: string;
  modLogWarns: string;
  modLogPunishments: string;
  modRestrictionRoles: string;
  modRestrictionUsers: string;
  modRestrictionLogChannel: string;
  modCommands: Record<string, boolean>;
  settingsChannels: string;
  modSpamDisabledChannel: string;
  modSpamDisabledRole: string;
  eventLogsEnabled: boolean;
  evFinanceiro: string;
  evEntradaBot: string;
  evMsgEditada: string;
  evMsgDeletada: string;
  evComandos: string;
  evCanaisVoz: string;
  evEntradaMembro: string;
  evSaidaMembro: string;
  evCargoAdicionado: string;
  evCargoRemovido: string;
  evCargoCriado: string;
  evCargoAtualizado: string;
  evCargoDeletado: string;
  evCanalCriado: string;
  evCanalAtualizado: string;
  evCanalDeletado: string;
  countersEnabled: boolean;
  cntMembrosCanal: string;
  cntMembrosMsg: string;
  cntMembrosEmojis: Record<string, string>;
  cntCallCanal: string;
  cntCallMsg: string;
  bioCheckerEnabled: boolean;
  bioTokens: string;
  bioLogChannel: string;
  bioRoles: { id: string; name: string }[];
  bioProfileText: string;
  bioPostChannel: string;
  bioBuilderMode: string;
  bioMessageText: string;
  bioMentionEveryone: boolean;
  bioMentionRoles: boolean;
  bioMentionUsers: boolean;
  bioVerifyText: string;
  bioVerifyRoles: { id: string; name: string }[];
  whitelistEnabled: boolean;
  wlApprovalChannel: string;
  wlLogChannel: string;
  wlApproveRoles: { id: string; name: string }[];
  wlWhitelistRolesMode: string;
  wlWhitelistRoles: { id: string; name: string }[];
  wlVerifiedRoles: { id: string; name: string }[];
  wlVerificationType: string;
  wlMentionedUserOnly: boolean;
  wlCodeSystem: boolean;
  wlCodeRoles: { id: string; name: string }[];
  wlMessageChannel: string;
  wlBuilderMode: string;
  wlMessageText: string;
  wlMentionEveryone: boolean;
  wlMentionRoles: boolean;
  wlMentionUsers: boolean;
  wlVerifyBtnLabel: string;
  wlCodeBtnLabel: string;
}

const defaultAllSettings: AllSettings = {
  prefix: "k.",
  botName: "kally",
  deleteMessage: false,
  slashCommands: true,
  addedRoles: [{ id: "5", name: "Admin" }, { id: "4", name: "Moderador" }],
  addedMembers: [{ id: "m1", name: "usuario#1234" }, { id: "m2", name: "jogador#5678" }],
  uriProtectionEnabled: false,
  uriAccount: "",
  uriOriginal: "",
  uriLogChannel: "disabled",
  uriPunishment: "remove-roles",
  serverProtectionEnabled: false,
  fakeAccountDays: "0",
  ignoredRoleProtection: "",
  blockBots: false,
  bkGlobalLimit: true,
  bkActionLimit: "3",
  bkTime: "1",
  bkLogChannel: "disabled",
  bkPunishment: "remove-roles",
  bkRevertActions: true,
  bkBlockBans: false,
  bkBlockKicks: false,
  castActionLimit: "3",
  castTime: "1",
  castLogChannel: "disabled",
  castPunishment: "remove-roles",
  castRevertActions: false,
  castBlockManual: false,
  chGlobalLimit: true,
  chActionLimit: "3",
  chTime: "1",
  chLogChannel: "disabled",
  chPunishment: "remove-roles",
  chRevertActions: false,
  roleGlobalLimit: true,
  roleActionLimit: "3",
  roleTime: "1",
  roleLogChannel: "disabled",
  rolePunishment: "remove-roles",
  roleRevertActions: false,
  roleBlockedRole: "",
  rolePermissions: { admin: false, ban: true, kick: true, manageRoles: true, manageChannels: true, manageServer: true },
  mgWhitelistRole: "",
  mgPunishment: "revert",
  mgLogChannel: "disabled",
  cmdAddrole: true,
  cmdRemoverole: true,
  autoroleEnabled: false,
  autoroleRole: "",
  autoroleEmblems: {
    staff: "disabled", parceiro: "disabled", hypesquad: "disabled",
    bugHunter: "disabled", bugHunterGold: "disabled", hypesquadBravery: "disabled",
    hypesquadBriliance: "disabled", hypesquadBalance: "disabled", apoiadorInicial: "disabled",
    devVerificado: "disabled", devAtivo: "disabled", modCertificado: "disabled",
  },
  moderationEnabled: false,
  modAutoSpam: "disabled", modBlockedWords: "disabled", modDuplicateText: "disabled",
  modAntiInvites: "disabled", modAntiLinks: "disabled", modExcessCaps: "disabled",
  modExcessEmojis: "disabled", modExcessMentions: "disabled", modZalgo: "disabled",
  modImmunityRoles: "", modMutedRole: "",
  modSpamLimit: 4, modSpamSeconds: 1,
  modBlockedExact: [], modBlockedPartial: [],
  modAllowedLinks: ["*.gif", "*.jpg", "*.jpeg", "*.png", "*.webp", "http://tenor.com/*", "https://tenor.com/*"],
  modEmojiLimit: 7, modMentionLimit: 5,
  modNotifyBans: false, modNotifyKicks: false, modNotifyWarns: false,
  modLogBans: "disabled", modLogMutes: "disabled", modLogKicks: "disabled",
  modLogWarns: "disabled", modLogPunishments: "disabled",
  modRestrictionRoles: "", modRestrictionUsers: "", modRestrictionLogChannel: "disabled",
  modCommands: {
    ban: true, unban: true, kick: true, mute: true, unmute: true, mutecall: true,
    unmutecall: true, lock: true, unlock: true, unbanall: true, blacklist: true,
    advertence: true, removeadvertence: true, castigar: true, removecastigo: true, nuke: true,
  },
  settingsChannels: "",
  modSpamDisabledChannel: "",
  modSpamDisabledRole: "",
  eventLogsEnabled: false,
  evFinanceiro: "disabled", evEntradaBot: "disabled",
  evMsgEditada: "disabled", evMsgDeletada: "disabled",
  evComandos: "disabled", evCanaisVoz: "disabled", evEntradaMembro: "disabled",
  evSaidaMembro: "disabled", evCargoAdicionado: "disabled", evCargoRemovido: "disabled",
  evCargoCriado: "disabled", evCargoAtualizado: "disabled", evCargoDeletado: "disabled",
  evCanalCriado: "disabled", evCanalAtualizado: "disabled", evCanalDeletado: "disabled",
  countersEnabled: false,
  cntMembrosCanal: "disabled",
  cntMembrosMsg: "",
  cntMembrosEmojis: { "0": "", "1": "", "2": "", "3": "", "4": "", "5": "", "6": "", "7": "", "8": "", "9": "" },
  cntCallCanal: "disabled",
  cntCallMsg: "Membros em call: %",
  bioCheckerEnabled: false,
  bioTokens: "",
  bioLogChannel: "disabled",
  bioRoles: [],
  bioProfileText: "",
  bioPostChannel: "disabled",
  bioBuilderMode: "message-builder",
  bioMessageText: "",
  bioMentionEveryone: true,
  bioMentionRoles: true,
  bioMentionUsers: true,
  bioVerifyText: "",
  bioVerifyRoles: [],
  whitelistEnabled: false,
  wlApprovalChannel: "disabled",
  wlLogChannel: "disabled",
  wlApproveRoles: [],
  wlWhitelistRolesMode: "allow-except",
  wlWhitelistRoles: [],
  wlVerifiedRoles: [],
  wlVerificationType: "user",
  wlMentionedUserOnly: false,
  wlCodeSystem: true,
  wlCodeRoles: [],
  wlMessageChannel: "disabled",
  wlBuilderMode: "message-builder",
  wlMessageText: "",
  wlMentionEveryone: true,
  wlMentionRoles: true,
  wlMentionUsers: true,
  wlVerifyBtnLabel: "Verificar",
  wlCodeBtnLabel: "Utilizar Código",
};

const emblemsList = [
  { key: "staff", label: "Emblema de Staff", icon: "⚒️" },
  { key: "parceiro", label: "Emblema de Parceiro", icon: "👀" },
  { key: "hypesquad", label: "Emblema de Hypesquad", icon: "🏆" },
  { key: "bugHunter", label: "Emblema de Bug Hunter", icon: "🐛" },
  { key: "bugHunterGold", label: "Emblema de Bug Hunter Gold", icon: "🐛" },
  { key: "hypesquadBravery", label: "Emblema de Hypesquad Bravery", icon: "💜" },
  { key: "hypesquadBriliance", label: "Emblema de Hypesquad Briliance", icon: "❤️" },
  { key: "hypesquadBalance", label: "Emblema de Hypesquad Balance", icon: "💚" },
  { key: "apoiadorInicial", label: "Emblema de Apoiador Inicial", icon: "💰" },
  { key: "devVerificado", label: "Emblema de Desenvolvedor Verificado", icon: "🔵" },
  { key: "devAtivo", label: "Emblema de Desenvolvedor Ativo", icon: "🟢" },
  { key: "modCertificado", label: "Emblema de Moderador Certificado", icon: "🟣" },
];

const serverProtectionTabs = ["Geral", "Bans/Kicks", "Castigos", "Canais", "Cargos", "Cargos Gerenciados", "Comandos"];

const ServerSettings = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("settings");
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  const [saved, setSaved] = useState<AllSettings>(structuredClone(defaultAllSettings));
  const [current, setCurrent] = useState<AllSettings>(structuredClone(defaultAllSettings));

  const [permissionsTab, setPermissionsTab] = useState<"roles" | "members">("roles");
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);
  const [rolesSearch, setRolesSearch] = useState("");
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const rolesDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState<{ id: string; name: string } | null>(null);
  const [selectedMember, setSelectedMember] = useState<{ id: string; name: string } | null>(null);
  const [permToggles, setPermToggles] = useState<Record<string, boolean>>({});
  const [savedPermToggles, setSavedPermToggles] = useState<Record<string, boolean>>({});
  const [serverProtectionTab, setServerProtectionTab] = useState("geral");
  const [cmdSearch, setCmdSearch] = useState("");
  const [mgAddCargoOpen, setMgAddCargoOpen] = useState(false);
  const [mgCargoSearch, setMgCargoSearch] = useState("");
  const mgAddCargoRef = useRef<HTMLDivElement>(null);
  const [moderationTab, setModerationTab] = useState("automod");
  const [modCmdSearch, setModCmdSearch] = useState("");
  const [modDetailOpen, setModDetailOpen] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<Array<{ id: number; cargo: string; tempo: string; punicao: string }>>([]);
  const [openWarningId, setOpenWarningId] = useState<number | null>(null);
  const [wlQuestions, setWlQuestions] = useState<Array<{ id: number; nome: string; placeholder: string; estilo: string; tamanhoMin: number; tamanhoMax: number; obrigatoria: boolean }>>([]);
  const [savedWlQuestions, setSavedWlQuestions] = useState<Array<{ id: number; nome: string; placeholder: string; estilo: string; tamanhoMin: number; tamanhoMax: number; obrigatoria: boolean }>>([]);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const [wlQuestionCounter, setWlQuestionCounter] = useState(1);
  const [modBlockedExactInput, setModBlockedExactInput] = useState("");
  const [modBlockedPartialInput, setModBlockedPartialInput] = useState("");
  const [modLinkInput, setModLinkInput] = useState("");

  const update = <K extends keyof AllSettings>(key: K, value: AllSettings[K]) => {
    setCurrent((prev) => ({ ...prev, [key]: value }));
  };

  const filteredRoles = mockRoles.filter(
    (r) => r.name.toLowerCase().includes(rolesSearch.toLowerCase()) && !current.addedRoles.some((ar) => ar.id === r.id)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rolesDropdownRef.current && !rolesDropdownRef.current.contains(e.target as Node)) {
        setShowRolesDropdown(false);
      }
      if (mgAddCargoRef.current && !mgAddCargoRef.current.contains(e.target as Node)) {
        setMgAddCargoOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const hasChanges = useMemo(() => JSON.stringify(current) !== JSON.stringify(saved) || JSON.stringify(permToggles) !== JSON.stringify(savedPermToggles) || JSON.stringify(wlQuestions) !== JSON.stringify(savedWlQuestions), [current, saved, permToggles, savedPermToggles, wlQuestions, savedWlQuestions]);

  const handleSave = useCallback(() => { setSaved(structuredClone(current)); setSavedPermToggles(structuredClone(permToggles)); setSavedWlQuestions(structuredClone(wlQuestions)); }, [current, permToggles, wlQuestions]);
  const handleDiscard = useCallback(() => { setCurrent(structuredClone(saved)); setPermToggles(structuredClone(savedPermToggles)); setWlQuestions(structuredClone(savedWlQuestions)); }, [saved, savedPermToggles, savedWlQuestions]);

  const serverName = servers[id || "1"] || "Servidor";
  const toggleGroup = (title: string) => setCollapsedGroups((prev) => ({ ...prev, [title]: !prev[title] }));

  const sp = current.serverProtectionEnabled;
  const me = current.moderationEnabled;
  const el = current.eventLogsEnabled;

  const channelOptions = (
    <>
      <SelectItem value="disabled">Desativado</SelectItem>
      <SelectItem value="general">general</SelectItem>
      <SelectItem value="logs">logs</SelectItem>
      <SelectItem value="mod-logs">mod-logs</SelectItem>
    </>
  );

  const permissionCategories = [
    {
      title: "GERAL",
      color: "border-red-500",
      permissions: [
        { key: "posse", name: "Posse", desc: "Membros com essa permissão têm acesso a todas as funcionalidades do site." },
        { key: "visualizar_financas", name: "Visualizar Finanças", desc: "Permite que os membros visualizem as informações referente à inscrição premium do servidor." },
        { key: "mudar_aparencia", name: "Mudar Aparência", desc: "Permite que os membros mudam a aparência do bot, como nome e avatar." },
        { key: "gerenciar_bot", name: "Gerenciar Bot", desc: "Permite que os membros mudam as informações iniciais do bot." },
        { key: "gerenciar_permissoes", name: "Gerenciar Permissões", desc: "Permite que os membros mudam as permissões de outros membros ou cargos no site ou bot." },
      ],
    },
    {
      title: "KALLY ENGINE",
      color: "border-purple-500",
      permissions: [
        { key: "gerenciar_custom_modules", name: "Gerenciar Custom Modules", desc: "Permite que os membros gerenciem custom modules." },
        { key: "gerenciar_datasets", name: "Gerenciar Datasets", desc: "Permite que os membros gerenciem datasets." },
      ],
    },
    {
      title: "PLUGINS",
      color: "border-green-500",
      permissions: [
        { key: "gerenciar_protecao_url", name: "Gerenciar Proteção de Url", desc: "Permite que os membros mudam as configurações de proteção de url do servidor." },
        { key: "gerenciar_protecao_servidor", name: "Gerenciar Proteção de Servidor", desc: "Permite que os membros mudam as configurações de anti raid do servidor." },
        { key: "gerenciar_autorole", name: "Gerenciar Autorole", desc: "Permite que os membros mudam cargos atribuídos a novos membros." },
        { key: "gerenciar_moderacao", name: "Gerenciar Moderação", desc: "Permite que os membros mudam as configurações de moderação dentro do servidor." },
        { key: "gerenciar_contadores", name: "Gerenciar Contadores", desc: "Permite que os membros mudam as configurações de contadores dentro do servidor." },
        { key: "gerenciar_tickets", name: "Gerenciar Tickets", desc: "Permite que os membros mudam as configurações de tickets do servidor." },
        { key: "gerenciar_vips", name: "Gerenciar Vips", desc: "Permite que os membros mudam as configurações de vips do servidor." },
      ],
    },
  ];

  const selectedItem = permissionsTab === "roles" ? selectedRole : selectedMember;

  const renderContent = () => {
    switch (activeSection) {
      case "settings":
        return (
          <>
            <h1 className="font-display text-3xl font-bold">Configurações</h1>
            <p className="mt-1 text-muted-foreground">Configure as principais informações de funcionamento</p>
            <div className="mt-10">
              <h2 className="font-display text-xl font-semibold">Configurações de comando</h2>
              <div className="mt-6 rounded-lg border border-border/50 bg-card p-6">
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-sm font-medium">Configure o prefixo para comandos em mensagem</p>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Prefixo</label>
                    <Input value={current.prefix} onChange={(e) => update("prefix", e.target.value)} className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Nome do CL</label>
                    <Input value={current.botName} onChange={(e) => update("botName", e.target.value)} className="bg-background border-border" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-0 divide-y divide-border/50 rounded-lg border border-border/50 bg-card">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-sm font-semibold">Deletar mensagem</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Ao executar um comando, irei deletar a mensagem do usuário</p>
                </div>
                <Switch checked={current.deleteMessage} onCheckedChange={(v) => update("deleteMessage", v)} />
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-sm font-semibold">Permitir comandos em Slash</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Permitir que usuários utilizem comandos com "/"</p>
                </div>
                <Switch checked={current.slashCommands} onCheckedChange={(v) => update("slashCommands", v)} />
              </div>
            </div>
          </>
        );

      case "permissions":
        return (
          <>
            <h1 className="font-display text-3xl font-bold">Permissões</h1>
            <p className="mt-1 text-muted-foreground">Configure as permissões de acesso ao sistema</p>
            <div className="mt-8 flex gap-6 border-b border-border/50">
              <button onClick={() => { setPermissionsTab("roles"); setSelectedMember(null); }} className={`pb-3 text-sm font-semibold transition-colors ${permissionsTab === "roles" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Cargos</button>
              <button onClick={() => { setPermissionsTab("members"); setSelectedRole(null); }} className={`pb-3 text-sm font-semibold transition-colors ${permissionsTab === "members" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Membros</button>
            </div>
            <div className="mt-6 flex gap-6">
              <div className="w-44 shrink-0">
                <div className="rounded-lg border border-border/50 bg-card">
                  <div className="relative" ref={rolesDropdownRef}>
                    <div className="flex items-center justify-between border-l-2 border-primary pl-3 pr-3 py-3">
                      <p className="text-xs font-medium">{permissionsTab === "roles" ? "Lista de cargos" : "Lista de membros"}</p>
                      <button onClick={() => { permissionsTab === "roles" ? setShowRolesDropdown(!showRolesDropdown) : setShowMemberSearch(!showMemberSearch); }} className="flex h-5 w-5 items-center justify-center rounded border border-border/50 bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <AnimatePresence>
                      {showRolesDropdown && permissionsTab === "roles" && (
                        <motion.div initial={{ opacity: 0, y: -5, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -5, scale: 0.97 }} transition={{ duration: 0.15 }} className="absolute left-0 top-full z-[100] mt-1 w-56 rounded-lg border border-border bg-background shadow-xl" style={{ backgroundColor: 'hsl(var(--background))' }}>
                          <div className="p-2">
                            <div className="relative">
                              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                              <Input placeholder="Pesquisar" value={rolesSearch} onChange={(e) => setRolesSearch(e.target.value)} className="h-8 bg-background border-border pl-8 text-sm" autoFocus />
                            </div>
                          </div>
                          <div className="max-h-48 overflow-y-auto px-1 pb-1">
                            {filteredRoles.length === 0 ? (
                              <p className="px-3 py-2 text-xs text-muted-foreground">Nenhum cargo encontrado</p>
                            ) : (
                              filteredRoles.map((role) => (
                                <button key={role.id} onClick={() => { update("addedRoles", [...current.addedRoles, role]); setShowRolesDropdown(false); setSelectedRole(role); }} className="flex w-full items-center rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">{role.name}</button>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="divide-y divide-border/30">
                    {permissionsTab === "roles" ? (
                      current.addedRoles.map((role) => (
                        <button key={role.id} onClick={() => setSelectedRole(role)} className={`flex w-full items-center px-3 py-2.5 text-xs transition-colors ${selectedRole?.id === role.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}>
                          <span className="truncate">@{role.name}</span>
                        </button>
                      ))
                    ) : (
                      current.addedMembers.map((member) => (
                        <button key={member.id} onClick={() => setSelectedMember(member)} className={`flex w-full items-center px-3 py-2.5 text-xs transition-colors ${selectedMember?.id === member.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}>
                          <span className="truncate">@{member.name}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
              {selectedItem ? (
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-6">
                    Você está editando as permissões de <span className="font-bold text-foreground">{selectedItem.name}</span>
                  </p>
                  <div className="space-y-2">
                    {permissionCategories.map((cat) => (
                      <div key={cat.title}>
                        <div className={`border-l-2 ${cat.color} pl-3 mb-2`}>
                          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{cat.title}</span>
                        </div>
                        <div className="divide-y divide-border/30">
                          {cat.permissions.map((perm) => (
                            <div key={perm.key} className="flex items-center justify-between py-3 px-1">
                              <div>
                                <p className="text-sm font-semibold text-primary">{perm.name}</p>
                                <p className="text-xs text-muted-foreground">{perm.desc}</p>
                              </div>
                              <Switch
                                checked={permToggles[`${selectedItem.id}_${perm.key}`] || false}
                                onCheckedChange={(v) => setPermToggles((prev) => ({ ...prev, [`${selectedItem.id}_${perm.key}`]: v }))}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button variant="destructive" className="w-full">Deletar</Button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm py-20">
                  Selecione um {permissionsTab === "roles" ? "cargo" : "membro"} para editar as permissões
                </div>
              )}
            </div>
          </>
        );

      case "uri-protection":
        return (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold">Proteção de Url</h1>
                <p className="mt-1 text-muted-foreground">Mantenha a url do seu servidor protegida.</p>
              </div>
              <Switch checked={current.uriProtectionEnabled} onCheckedChange={(v) => update("uriProtectionEnabled", v)} />
            </div>
            <div className="relative mt-8">
              <AnimatePresence>
                {!current.uriProtectionEnabled && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
                    <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-xl max-w-sm">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"><Link2 className="h-6 w-6 text-primary" /></div>
                      <h3 className="font-display text-lg font-bold">Proteção De Url</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Mantenha a url do seu servidor protegida.</p>
                      <Button onClick={() => update("uriProtectionEnabled", true)} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">Ativar plugin</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-6">
                <div className="rounded-lg border border-border/50 bg-card p-6">
                  <div className="border-l-2 border-primary pl-4"><p className="text-sm font-bold">URL Original</p></div>
                  <div className="mt-4 flex items-center gap-0">
                    <span className="rounded-l-md border border-r-0 border-border bg-muted px-3 py-2 text-sm text-muted-foreground">discord.gg/</span>
                    <Input value={current.uriOriginal} onChange={(e) => update("uriOriginal", e.target.value)} className="rounded-l-none bg-background border-border max-w-xs" disabled={!current.uriProtectionEnabled} />
                  </div>
                </div>
                <div className="rounded-lg border border-border/50 bg-card p-6">
                  <div className="border-l-2 border-primary pl-4"><p className="text-sm font-medium">Canal de logs</p></div>
                  <div className="mt-4">
                    <Select value={current.uriLogChannel} onValueChange={(v) => update("uriLogChannel", v)} disabled={!current.uriProtectionEnabled}>
                      <SelectTrigger className="w-full max-w-xs bg-background border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>{channelOptions}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="rounded-lg border border-border/50 bg-card p-6">
                  <div className="border-l-2 border-primary pl-4"><p className="text-sm font-medium">Punição</p></div>
                  <div className="mt-4">
                    <Select value={current.uriPunishment} onValueChange={(v) => update("uriPunishment", v)} disabled={!current.uriProtectionEnabled}>
                      <SelectTrigger className="w-full max-w-xs bg-background border-border"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="remove-roles">Remover todos os cargos</SelectItem><SelectItem value="kick">Expulsar</SelectItem><SelectItem value="ban">Banir</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "moderation":
        return (
          <>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-bold">Moderação</h1>
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">Update</span>
                </div>
                <p className="mt-1 text-muted-foreground">Mantenha seu servidor seguro com moderação automática</p>
              </div>
              <Switch checked={me} onCheckedChange={(v) => update("moderationEnabled", v)} />
            </div>
            <div className="relative mt-8">
              <AnimatePresence>
                {!me && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
                    <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-xl max-w-sm">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"><Gavel className="h-6 w-6 text-primary" /></div>
                      <h3 className="font-display text-lg font-bold">Moderação</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Mantenha seu servidor seguro com moderação automática</p>
                      <Button onClick={() => update("moderationEnabled", true)} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">Ativar plugin</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="rounded-lg border border-border/50 bg-card p-6 space-y-6">
                <div className="border-l-2 border-primary pl-4"><p className="text-sm font-medium">O Automod é uma ação de moderação automática.</p></div>
                <div className="grid grid-cols-3 gap-6">
                  {([
                    { key: "modAutoSpam" as const, label: "ANTI-SPAM" },
                    { key: "modBlockedWords" as const, label: "PALAVRAS BLOQUEADAS" },
                    { key: "modDuplicateText" as const, label: "TEXTO DUPLICADO" },
                    { key: "modAntiInvites" as const, label: "ANTI INVITES" },
                    { key: "modAntiLinks" as const, label: "ANTI LINKS" },
                    { key: "modExcessCaps" as const, label: "CAPS EM EXCESSO" },
                    { key: "modExcessEmojis" as const, label: "EMOJIS EM EXCESSO" },
                    { key: "modExcessMentions" as const, label: "MENÇÕES EM EXCESSO" },
                    { key: "modZalgo" as const, label: "ZALGO" },
                  ]).map((item) => (
                    <div key={item.key}>
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">{item.label}</label>
                      <Select value={current[item.key]} onValueChange={(v) => update(item.key, v)} disabled={!me}>
                        <SelectTrigger className="bg-background border-border"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disabled">Desativado</SelectItem>
                          <SelectItem value="delete">Deletar mensagem</SelectItem>
                          <SelectItem value="alert">Alertar membro</SelectItem>
                          <SelectItem value="delete-alert">Deletar mensagem & Alertar membro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case "event-logs":
        return (
          <>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-bold">Logs de Eventos</h1>
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">Update</span>
                </div>
                <p className="mt-1 text-muted-foreground">Mantenha seu servidor seguro com logs.</p>
              </div>
              <Switch checked={el} onCheckedChange={(v) => update("eventLogsEnabled", v)} />
            </div>
            <div className="relative mt-8">
              <AnimatePresence>
                {!el && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
                    <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-xl max-w-sm">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"><ScrollText className="h-6 w-6 text-primary" /></div>
                      <h3 className="font-display text-lg font-bold">Logs De Eventos</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Mantenha seu servidor seguro com logs.</p>
                      <Button onClick={() => update("eventLogsEnabled", true)} className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">Ativar plugin</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-8">
                <div className="rounded-lg border border-border/50 bg-card p-6 space-y-4">
                  <div className="border-l-2 border-primary pl-4"><p className="text-sm font-bold">Eventos Gerais</p></div>
                  <div className="grid grid-cols-2 gap-6">
                    {([
                      { key: "evFinanceiro" as const, label: "FINANCEIRO" },
                      { key: "evEntradaBot" as const, label: "ENTRADA DE BOT" },
                    ] as const).map((item) => (
                      <div key={item.key}>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</label>
                        <Select value={current[item.key]} onValueChange={(v) => update(item.key, v)} disabled={!el}>
                          <SelectTrigger className="bg-background border-border"><SelectValue /></SelectTrigger>
                          <SelectContent>{channelOptions}</SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border/50 bg-card p-6 space-y-4">
                  <div className="border-l-2 border-primary pl-4"><p className="text-sm font-bold">Eventos de Membro</p></div>
                  <div className="grid grid-cols-3 gap-6">
                    {([
                      { key: "evComandos" as const, label: "COMANDOS" },
                      { key: "evCanaisVoz" as const, label: "CANAIS DE VOZ" },
                      { key: "evEntradaMembro" as const, label: "ENTRADA DE MEMBRO" },
                      { key: "evSaidaMembro" as const, label: "SAÍDA DE MEMBRO" },
                      { key: "evCargoAdicionado" as const, label: "CARGO ADICIONADO" },
                      { key: "evCargoRemovido" as const, label: "CARGO REMOVIDO" },
                    ] as const).map((item) => (
                      <div key={item.key}>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</label>
                        <Select value={current[item.key]} onValueChange={(v) => update(item.key, v)} disabled={!el}>
                          <SelectTrigger className="bg-background border-border"><SelectValue /></SelectTrigger>
                          <SelectContent>{channelOptions}</SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border/50 bg-card p-6 space-y-4">
                  <div className="border-l-2 border-primary pl-4"><p className="text-sm font-bold">Eventos de Cargo</p></div>
                  <div className="grid grid-cols-3 gap-6">
                    {([
                      { key: "evCargoCriado" as const, label: "CARGO CRIADO" },
                      { key: "evCargoAtualizado" as const, label: "CARGO ATUALIZADO" },
                      { key: "evCargoDeletado" as const, label: "CARGO DELETADO" },
                    ] as const).map((item) => (
                      <div key={item.key}>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</label>
                        <Select value={current[item.key]} onValueChange={(v) => update(item.key, v)} disabled={!el}>
                          <SelectTrigger className="bg-background border-border"><SelectValue /></SelectTrigger>
                          <SelectContent>{channelOptions}</SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border/50 bg-card p-6 space-y-4">
                  <div className="border-l-2 border-primary pl-4"><p className="text-sm font-bold">Eventos de Canais</p></div>
                  <div className="grid grid-cols-3 gap-6">
                    {([
                      { key: "evCanalCriado" as const, label: "CANAL CRIADO" },
                      { key: "evCanalAtualizado" as const, label: "CANAL ATUALIZADO" },
                      { key: "evCanalDeletado" as const, label: "CANAL DELETADO" },
                    ] as const).map((item) => (
                      <div key={item.key}>
                        <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</label>
                        <Select value={current[item.key]} onValueChange={(v) => update(item.key, v)} disabled={!el}>
                          <SelectTrigger className="bg-background border-border"><SelectValue /></SelectTrigger>
                          <SelectContent>{channelOptions}</SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "counters":
        const ct = current.countersEnabled;
        return (
          <>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-bold">Contadores</h1>
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">Update</span>
                </div>
                <p className="mt-1 text-muted-foreground">Configure contadores de membros em call ou da quantidade de membros.</p>
              </div>
              <Switch checked={ct} onCheckedChange={(v) => update("countersEnabled", v)} />
            </div>
            <div className="relative mt-8 space-y-8">
              <AnimatePresence>
                {!ct && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex items-start justify-center rounded-xl backdrop-blur-sm bg-background/30 pt-20">
                    <div className="rounded-xl border border-border/50 bg-card p-8 text-center shadow-2xl max-w-sm">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Hash className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-display text-lg font-bold">Contadores</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Configure contadores de membros.</p>
                      <Button className="mt-4 w-full" onClick={() => update("countersEnabled", true)}>Ativar plugin</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Contador de membros</h2>
                <div className="rounded-lg border border-border/50 bg-card p-6 space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">CANAL</label>
                    <Select value={current.cntMembrosCanal} onValueChange={(v) => update("cntMembrosCanal", v)} disabled={!ct}>
                      <SelectTrigger className="w-full max-w-xs bg-background border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Desativado</SelectItem>
                        <SelectItem value="general">general</SelectItem>
                        <SelectItem value="counters">counters</SelectItem>
                        <SelectItem value="stats">stats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">MENSAGEM</label>
                    <Input value={current.cntMembrosMsg} onChange={(e) => update("cntMembrosMsg", e.target.value)} className="bg-background border-border max-w-md" disabled={!ct} placeholder="Membros: %" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">Contador de membros em call</h2>
                <div className="rounded-lg border border-border/50 bg-card p-6 space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">CANAL</label>
                    <Select value={current.cntCallCanal} onValueChange={(v) => update("cntCallCanal", v)} disabled={!ct}>
                      <SelectTrigger className="w-full max-w-xs bg-background border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Desativado</SelectItem>
                        <SelectItem value="general">general</SelectItem>
                        <SelectItem value="counters">counters</SelectItem>
                        <SelectItem value="stats">stats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">MENSAGEM</label>
                    <Input value={current.cntCallMsg} onChange={(e) => update("cntCallMsg", e.target.value)} className="bg-background border-border max-w-md" disabled={!ct} />
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold">Em breve</h2>
              <p className="mt-2 text-muted-foreground">Esta seção está sendo desenvolvida.</p>
            </div>
          </div>
        );
    }
  };

  const avatarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Banner />

      {/* Top bar */}
      <div className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-display font-bold"><span className="gradient-text">K</span>ally</span>
          </Link>
          <span className="text-border">/</span>
          <span className="text-sm font-medium truncate max-w-[200px]">{serverName}</span>
        </div>
        <div className="relative" ref={avatarRef}>
          <img
            src="https://cdn.discordapp.com/embed/avatars/0.png"
            alt="User avatar"
            className="h-8 w-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
          />
          <AnimatePresence>
            {avatarMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 z-50 w-48 rounded-md border border-border/50 bg-popover shadow-lg overflow-hidden"
              >
                <div className="py-1">
                  <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
                    <LayoutGrid className="h-4 w-4" />
                    Servidores
                  </Link>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-border/50 bg-sidebar overflow-y-auto scrollbar-none">
          <div className="py-4">
            {sidebarGroups.map((group, gi) => (
              <div key={gi}>
                {group.title && (
                  <button
                    onClick={() => group.collapsible && toggleGroup(group.title!)}
                    className="flex w-full items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {group.title}
                    {group.collapsible && (
                      collapsedGroups[group.title] ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />
                    )}
                  </button>
                )}
                <AnimatePresence initial={false}>
                  {!(group.title && collapsedGroups[group.title!]) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                            activeSection === item.id
                              ? "bg-sidebar-accent text-foreground font-medium"
                              : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                          }`}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`ml-auto rounded px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground ${item.badgeColor}`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Save bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-card px-6 py-3 shadow-2xl glow-border">
              <p className="text-sm font-medium">Você possui alterações não salvas!</p>
              <Button variant="outline" size="sm" className="gap-2 border-border" onClick={handleDiscard}>
                <RotateCcw className="h-3.5 w-3.5" />
                Descartar
              </Button>
              <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSave}>
                <Save className="h-3.5 w-3.5" />
                Salvar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServerSettings;
