import { AuthMode } from "@/components/features/auth/types";

interface AuthModeToggleProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export function AuthModeToggle({ mode, onModeChange }: AuthModeToggleProps) {
  return (
    <div className="relative grid grid-cols-2 rounded-2xl border border-white/10 bg-brand-dark p-1.5 shadow-inner">
      <span
        aria-hidden
        className={`absolute top-0 bottom-0 z-0 w-[calc(50%)] rounded-xl bg-primary shadow-lg shadow-primary/45 transition-transform duration-300 ease-out ${
          mode === "signup" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <button
        type="button"
        onClick={() => onModeChange("login")}
        className={`relative z-10 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300 cursor-pointer ${
          mode === "login" ? "text-white font-semibold" : "text-white/60 hover:text-white"
        }`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => onModeChange("signup")}
        className={`relative z-10 rounded-xl px-4 py-2.5  text-sm font-medium transition-colors duration-300 cursor-pointer ${
          mode === "signup" ? "text-white font-semibold" : "text-white/60 hover:text-white"
        }`}
      >
        Criar Conta
      </button>
    </div>
  );
}
