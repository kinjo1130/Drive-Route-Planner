
// src/components/routes/RouteFilter.tsx
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { DRIVING_TIME_OPTIONS } from "@/constants";

interface RouteFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  minTime: number | null;
  setMinTime: (time: number | null) => void;
  maxTime: number | null;
  setMaxTime: (time: number | null) => void;
}

export const RouteFilter = ({
  searchTerm,
  setSearchTerm,
  minTime,
  setMinTime,
  maxTime,
  setMaxTime,
}: RouteFilterProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div>
        <Input
          placeholder="ルートを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div>
        <Select
          value={minTime?.toString()}
          onValueChange={(value) => setMinTime(value ? Number(value) : null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="最小時間" />
          </SelectTrigger>
          <SelectContent>
            {/* 空文字列の代わりに "none" を使用 */}
            <SelectItem value="none">指定なし</SelectItem>
            {DRIVING_TIME_OPTIONS.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value.toString()}
              >
                {option.label}以上
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={maxTime?.toString()}
          onValueChange={(value) => setMaxTime(value === "none" ? null : Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="最大時間" />
          </SelectTrigger>
          <SelectContent>
            {/* 空文字列の代わりに "none" を使用 */}
            <SelectItem value="none">指定なし</SelectItem>
            {DRIVING_TIME_OPTIONS.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value.toString()}
              >
                {option.label}以下
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};