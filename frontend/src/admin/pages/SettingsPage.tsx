import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function SettingsPage() {
  const [platformName, setPlatformName] = useState("Nirvaha Wellness");
  const [supportEmail, setSupportEmail] = useState("support@nirvaha.com");
  const [onboardingEnabled, setOnboardingEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const handleSave = () => {
    const timestamp = new Date().toLocaleString();
    setLastSaved(timestamp);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Settings</h1>
        <p className="text-gray-700">Configure platform preferences for admins and companions</p>
      </div>

      <Card className="bg-white border-emerald-200 p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="platformName" className="text-black">Platform Name</Label>
          <Input
            id="platformName"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="bg-white border-emerald-200 text-black placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supportEmail" className="text-black">Support Email</Label>
          <Input
            id="supportEmail"
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="bg-white border-emerald-200 text-black placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg border border-emerald-200 bg-emerald-50">
          <div>
            <p className="text-black font-semibold">Enable Companion Onboarding</p>
            <p className="text-gray-700 text-sm">Allow new companions to submit applications</p>
          </div>
          <Switch
            checked={onboardingEnabled}
            onCheckedChange={setOnboardingEnabled}
            aria-label="Toggle companion onboarding"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
            onClick={handleSave}
          >
            Save Settings
          </Button>
          {lastSaved && (
            <span className="text-gray-700 text-sm">Last saved at {lastSaved}</span>
          )}
        </div>
      </Card>
    </div>
  );
}

