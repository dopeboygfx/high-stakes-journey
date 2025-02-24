
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
    <div className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
      <h2 className="text-xl font-semibold mb-4">Abilities</h2>
      <div className="grid gap-4">
        {state.abilities.map((ability) => {
          const Icon = abilityIcons[ability.id];
          return (
            <div
              key={ability.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-background/50"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{ability.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {ability.description}
                  </p>
                </div>
              </div>
              {!ability.unlocked && (
                <button
                  onClick={() => handleUnlockAbility(ability.id)}
                  className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {formatMoney(ability.cost)}
                </button>
              )}
              {ability.unlocked && (
                <span className="text-sm text-success">Unlocked</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
