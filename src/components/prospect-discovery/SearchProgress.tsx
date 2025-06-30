
import { Progress } from "@/components/ui/progress";

interface SearchProgressProps {
  searchProgress: number;
}

export const SearchProgress = ({ searchProgress }: SearchProgressProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">Search Progress</span>
        <span className="text-sm font-medium text-slate-900">{searchProgress}%</span>
      </div>
      <Progress value={searchProgress} className="h-2" />
    </div>
  );
};
