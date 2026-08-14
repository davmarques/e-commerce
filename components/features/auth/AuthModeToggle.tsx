import { AuthMode } from "@/components/features/auth/types";

interface AuthModeToggleProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export function AuthModeToggle({ mode, onModeChange }: AuthModeToggleProps) {
  return (
    <div className="relative grid grid-cols-2 rounded-2xl border border-black/10 bg-[#F3F3F3]">
      <span
        aria-hidden
        className={`absolute top-0 bottom-0 z-0 w-1/2 rounded-2xl bg-black transition-transform duration-300 ease-out ${
          mode === "signup" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <button
        type="button"
        onClick={() => onModeChange("login")}
        className={`relative z-10 rounded-2xl px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
          mode === "login" ? "text-white" : "text-black/60 hover:text-black"
        }`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => onModeChange("signup")}
        className={`relative z-10 rounded-2xl px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
          mode === "signup" ? "text-white" : "text-black/60 hover:text-black"
        }`}
      >
        SignUp
      </button>
    </div>
  );
}
