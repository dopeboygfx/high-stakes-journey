
import { LightbulbIcon, Brain, Navigation, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { formatMoney } from "../../utils/gameUtils";

const abilityIcons: Record<string, any> = {
  local_connect: LightbulbIcon,
  smooth_talk: Brain,
  fast_travel: Navigation,
  extra_space: Briefcase,
};

export const AbilitiesPanel = () => {
  const { state, dispatch } = useGame();

  const handleUnlockAbility = (abilityId: string) => {
    const ability = state.abilities.find((a) => a.id === abilityId);
    if (!ability) return;

    if (state.money < ability.cost) {
      toast.error("Not enough money!");
      return;
    }

    dispatch({ type: "UNLOCK_ABILITY", abilityId });
    toast.success(`Unlocked ${ability.name}!`);
  };

  return (
    <div className="p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 text-sm">
      <h2 className="text-base font-semibold mb-2">Abilities</h2>
      <div className="grid gap-2">
        {state.abilities.map((ability) => {
          const Icon = abilityIcons[ability.id];
          return (
            <div
              key={ability.id}
              className="flex items-center justify-between p-2 rounded-lg border bg-background/50"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <div>
                  <h3 className="text-xs font-medium">{ability.name}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {ability.description}
                  </p>
                </div>
              </div>
              {!ability.unlocked && (
                <button
                  onClick={() => handleUnlockAbility(ability.id)}
                  className="px-2 py-0.5 text-[10px] rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {formatMoney(ability.cost)}
                </button>
              )}
              {ability.unlocked && (
                <span className="text-[10px] text-success">Unlocked</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
