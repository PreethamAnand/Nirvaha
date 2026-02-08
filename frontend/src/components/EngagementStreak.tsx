import { useState } from "react";
import { Waves, ChevronDown } from "lucide-react";

// Data structure for daily engagement
interface EngagementDay {
  date: string; // YYYY-MM-DD format
  activeMinutes: number;
}

// Mock data generator for demonstration
const generateMockData = (): EngagementDay[] => {
  const data: EngagementDay[] = [];
  const today = new Date();
  
  // Generate data for the last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random activity pattern (some days active, some not)
    const isActive = Math.random() > 0.3; // 70% chance of being active
    const minutes = isActive ? Math.floor(Math.random() * 90) + 10 : 0; // 10-100 minutes
    
    data.push({
      date: date.toISOString().split('T')[0],
      activeMinutes: minutes,
    });
  }
  
  return data;
};

interface TooltipData {
  date: string;
  minutes: number;
  x: number;
  y: number;
}

export function EngagementStreak() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // 0-11
  
  // Mock engagement data - will be replaced with API call
  const engagementData = generateMockData();
  
  // Calculate current streak
  const calculateStreak = (): number => {
    let streak = 0;
    const sortedData = [...engagementData].reverse();
    
    for (const day of sortedData) {
      if (day.activeMinutes >= 10) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  const currentStreak = calculateStreak();
  
  // Organize data into yearly grid (12 months × ~31 days)
  const organizeYearlyGrid = () => {
    const grid: { [month: string]: EngagementDay[] } = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    months.forEach(month => {
      grid[month] = [];
    });
    
    engagementData.forEach(day => {
      const date = new Date(day.date);
      const monthName = months[date.getMonth()];
      grid[monthName].push(day);
    });
    
    return grid;
  };
  
  const yearlyGrid = organizeYearlyGrid();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Format date for tooltip
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Determine color based on activity
  const getActivityColor = (minutes: number): string => {
    if (minutes === 0) return "bg-[#595b67]/10"; // Inactive - very light gray
    if (minutes < 20) return "bg-[#1a5d47]/20"; // Light green
    if (minutes < 40) return "bg-[#1a5d47]/40"; // Medium-light green
    if (minutes < 60) return "bg-[#1a5d47]/60"; // Medium green
    return "bg-[#1a5d47]"; // Full green for 60+ minutes
  };
  
  const handleMouseEnter = (day: EngagementDay, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      date: day.date,
      minutes: day.activeMinutes,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };
  
  const handleMouseLeave = () => {
    setTooltip(null);
  };
  
  return (
    <div className="border-2 border-[#0f131a] rounded-3xl p-4 hover:border-[#1a5d47] transition-colors">
      {/* Header with Streak */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#1a5d47] flex items-center justify-center">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0f131a]">{currentStreak} Day</h3>
            <p className="text-xs text-[#595b67] font-medium">Engagement Streak</p>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-[#595b67] mb-3">
        Consistently active in your wellness journey
      </p>
      
      {/* View Mode & Month Selector */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#595b67]/20">
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("month")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === "month"
                ? "bg-[#1a5d47] text-white"
                : "bg-[#595b67]/10 text-[#595b67] hover:bg-[#595b67]/20"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode("year")}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === "year"
                ? "bg-[#1a5d47] text-white"
                : "bg-[#595b67]/10 text-[#595b67] hover:bg-[#595b67]/20"
            }`}
          >
            Year
          </button>
        </div>
        
        {viewMode === "month" && (
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              aria-label="Select month"
              className="appearance-none bg-[#595b67]/10 text-[#0f131a] text-xs font-medium px-3 py-1.5 pr-7 rounded-lg border border-[#595b67]/20 cursor-pointer hover:bg-[#595b67]/20 transition-colors"
            >
              {fullMonthNames.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#595b67] pointer-events-none" />
          </div>
        )}
      </div>
      
      {/* Conditional Rendering: Month or Year View */}
      {viewMode === "month" ? (
        /* Month View - Empty Space */
        <div className="mb-3 h-32"></div>
      ) : (
        /* Yearly Heatmap Grid */
        <div className="overflow-x-auto mb-3">
        <div className="min-w-[320px]">
          <div className="grid grid-cols-12 gap-1">
            {months.map((month) => {
              const daysInMonth = yearlyGrid[month].length;
              return (
                <div key={month} className="flex flex-col gap-1">
                  <div className="text-[10px] font-semibold text-[#595b67] mb-0.5 text-center">
                    {month}
                  </div>
                  <div className="flex flex-wrap gap-[3px] w-full">
                    {yearlyGrid[month].slice(0, daysInMonth).map((day, index) => (
                      <div
                        key={`${month}-${index}`}
                        className={`w-1 h-1 rounded-sm ${getActivityColor(
                          day.activeMinutes
                        )} cursor-pointer transition-all hover:scale-150 hover:shadow-md`}
                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                        onMouseLeave={handleMouseLeave}
                        title={`${formatDate(day.date)} - ${day.activeMinutes} minutes`}
                      ></div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}
      
      {/* Tooltip */}
      {tooltip && (
        // eslint-disable-next-line @microsoft/sdl/no-inline-styles
        <div
          className="fixed z-50 bg-[#0f131a] text-white px-3 py-2 rounded-lg text-sm shadow-xl pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="font-medium">{formatDate(tooltip.date)}</div>
          <div className="text-xs text-[#ffffff]/80">
            {tooltip.minutes > 0 ? `${tooltip.minutes} minutes active` : "No activity"}
          </div>
        </div>
      )}
      
      {/* Summary Stats */}
      <div className="mt-3 pt-3 border-t border-[#595b67]/20 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-lg font-bold text-[#0f131a]">
            {engagementData.filter(d => d.activeMinutes >= 10).length}
          </div>
          <div className="text-[9px] text-[#595b67] mt-0.5">Active Days</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-[#0f131a]">
            {Math.round(
              engagementData.reduce((sum, d) => sum + d.activeMinutes, 0) / 60
            )}h
          </div>
          <div className="text-[9px] text-[#595b67] mt-0.5">Total Time</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-[#0f131a]">
            {Math.round(
              engagementData.reduce((sum, d) => sum + d.activeMinutes, 0) /
                engagementData.filter(d => d.activeMinutes > 0).length
            )}
            min
          </div>
          <div className="text-[9px] text-[#595b67] mt-0.5">Avg Session</div>
        </div>
      </div>
    </div>
  );
}
