import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Crown, Star, Users } from "lucide-react";
import {
  positionLabels,
  positionColors,
  type Position,
} from "@/data/players";
import type { SquadSlot } from "@/App";
import { cn } from "@/lib/utils";

type MySquadProps = {
  squad: SquadSlot[];
  captainId: number | null;
  viceId: number | null;
  remaining: number;
  onRemove: (id: number) => void;
  onSetCaptain: (id: number) => void;
  onSetVice: (id: number) => void;
};

const order: Position[] = ["GK", "DEF", "MID", "FWD"];

export function MySquad({
  squad,
  captainId,
  viceId,
  remaining,
  onRemove,
  onSetCaptain,
  onSetVice,
}: MySquadProps) {
  const totalPoints = squad.reduce((sum, s) => {
    const mult = s.player.id === captainId ? 2 : s.player.id === viceId ? 1.5 : 1;
    return sum + s.player.points * mult;
  }, 0);

  if (squad.length === 0) {
    return (
      <Card className="border-dashed border-emerald-900/20 bg-emerald-50/40 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="mt-4 font-serif text-xl font-bold text-emerald-900">
            تشكيلتك فارغة
          </h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            اذهب إلى سوق اللاعبين واختر 15 لاعباً لبناء فريقك
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="space-y-5">
          {order.map((pos) => {
            const group = squad.filter((s) => s.player.position === pos);
            if (group.length === 0) return null;
            return (
              <div key={pos}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-md border px-2 py-0.5 text-xs font-bold",
                      positionColors[pos]
                    )}
                  >
                    {positionLabels[pos]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {group.length} لاعب
                  </span>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {group.map((s) => {
                    const isCap = s.player.id === captainId;
                    const isVice = s.player.id === viceId;
                    return (
                      <Card
                        key={s.player.id}
                        className={cn(
                          "border-slate-200 shadow-sm transition-all hover:shadow-md",
                          isCap && "border-amber-300 ring-1 ring-amber-200",
                          isVice && "border-sky-300 ring-1 ring-sky-200"
                        )}
                      >
                        <CardContent className="p-3.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="truncate font-semibold text-slate-900">
                                  {s.player.name}
                                </p>
                                {isCap && <Crown className="h-4 w-4 shrink-0 text-amber-500" />}
                                {isVice && <Star className="h-4 w-4 shrink-0 text-sky-500" />}
                              </div>
                              <p className="truncate text-xs text-muted-foreground">
                                {s.player.team}
                              </p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 shrink-0 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                              onClick={() => onRemove(s.player.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex gap-1.5">
                              <Button
                                size="sm"
                                variant={isCap ? "default" : "outline"}
                                className={cn(
                                  "h-7 px-2 text-xs",
                                  isCap && "bg-amber-500 hover:bg-amber-600"
                                )}
                                onClick={() => onSetCaptain(s.player.id)}
                              >
                                كابتن
                              </Button>
                              <Button
                                size="sm"
                                variant={isVice ? "default" : "outline"}
                                className={cn(
                                  "h-7 px-2 text-xs",
                                  isVice && "bg-sky-500 hover:bg-sky-600"
                                )}
                                onClick={() => onSetVice(s.player.id)}
                              >
                                نائب
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">السعر</p>
                              <p className="text-sm font-bold text-emerald-700">
                                {s.player.price.toFixed(1)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <Card className="border-emerald-900/10 bg-gradient-to-br from-emerald-700 to-teal-700 text-white shadow-md">
          <CardContent className="p-5">
            <p className="text-sm text-emerald-100/80">مجموع نقاط التشكيلة</p>
            <p className="mt-1 font-serif text-4xl font-bold tabular-nums">
              {Math.round(totalPoints)}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-100/80">عدد اللاعبين</span>
                <span className="font-semibold">{squad.length} / 15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-100/80">الميزانية المتبقية</span>
                <span className="font-semibold">{remaining.toFixed(1)} مليون</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-serif text-lg font-bold text-slate-900">مضاعفات النقاط</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2">
                <span className="flex items-center gap-2 text-amber-900">
                  <Crown className="h-4 w-4" /> الكابتن
                </span>
                <Badge className="bg-amber-500 text-white">×2</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-sky-50 px-3 py-2">
                <span className="flex items-center gap-2 text-sky-900">
                  <Star className="h-4 w-4" /> النائب
                </span>
                <Badge className="bg-sky-500 text-white">×1.5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}