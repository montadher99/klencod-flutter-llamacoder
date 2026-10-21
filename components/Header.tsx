import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, RotateCcw, Shield } from "lucide-react";

type HeaderProps = {
  squadCount: number;
  remaining: number;
  budget: number;
  onReset: () => void;
};

export function Header({ squadCount, remaining, budget, onReset }: HeaderProps) {
  const spent = Math.round((budget - remaining) * 10) / 10;
  const pct = Math.min(100, (spent / budget) * 100);

  return (
    <header className="relative overflow-hidden border-b border-emerald-900/10 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 text-white">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-lg ring-1 ring-white/20 backdrop-blur">
              <Shield className="h-7 w-7 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">
                  فانتازي الصبخاية
                </h1>
                <Badge className="border-white/20 bg-white/15 text-emerald-50 hover:bg-white/20">
                  الجولة 12
                </Badge>
              </div>
              <p className="mt-1 text-sm text-emerald-100/80">
                اختر 15 لاعباً ضمن ميزانية 100 مليون واصنع فريق الأحلام
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2 text-xs text-emerald-100/80">
                <Wallet className="h-3.5 w-3.5" />
                الميزانية المتبقية
              </div>
              <div className="mt-1 text-xl font-bold tabular-nums">
                {remaining.toFixed(1)}
                <span className="ml-1 text-sm font-normal text-emerald-100/70">مليون</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
              <div className="text-xs text-emerald-100/80">اللاعبون المختارون</div>
              <div className="mt-1 text-xl font-bold tabular-nums">
                {squadCount}
                <span className="ml-1 text-sm font-normal text-emerald-100/70">/ 15</span>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={onReset}
              className="gap-2 bg-white/90 text-emerald-900 hover:bg-white"
            >
              <RotateCcw className="h-4 w-4" />
              إعادة
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs text-emerald-100/80">
            <span>المصروف: {spent.toFixed(1)} مليون</span>
            <span>من {budget} مليون</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-black/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-300 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}