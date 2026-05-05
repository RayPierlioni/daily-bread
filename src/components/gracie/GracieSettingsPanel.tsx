"use client";

import { Sparkles } from "lucide-react";
import { useGracieState, type GracieSettings, type GracieTone } from "@/components/gracie/useGracieState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Select } from "@/components/ui/form-fields";
import { trackClientEvent } from "@/lib/client-analytics";

function updateSetting(settings: GracieSettings, changes: Partial<GracieSettings>) {
  return { ...settings, ...changes };
}

export function GracieSettingsPanel() {
  const { loaded, settings, setSettings } = useGracieState();

  function saveSettings(nextSettings: GracieSettings) {
    setSettings(nextSettings);
    trackClientEvent("gracie_settings_changed", {
      enabled: nextSettings.enabled,
      dailyAutoOpen: nextSettings.dailyAutoOpen,
      tone: nextSettings.tone,
      source: "settings"
    });
  }

  if (!loaded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gracie helper</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-[#68706e]">Loading Gracie settings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#b38b4d]" aria-hidden="true" />
          Gracie helper
        </CardTitle>
        <p className="text-sm leading-6 text-[#68706e]">
          Gracie is an optional app guide with gentle reminders. These settings are stored in this browser for now.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* TODO: Persist Gracie helper preferences in user settings when account-level preferences are expanded. */}
        <label className="flex items-center gap-3 rounded-lg border border-[#e4dccd] bg-white/70 p-3 text-sm">
          <input
            type="checkbox"
            checked={settings.enabled}
            onChange={(event) => saveSettings(updateSetting(settings, { enabled: event.target.checked }))}
            className="h-4 w-4 accent-[#345d6f]"
          />
          Show Gracie helper
        </label>
        <label className="flex items-center gap-3 rounded-lg border border-[#e4dccd] bg-white/70 p-3 text-sm">
          <input
            type="checkbox"
            checked={settings.dailyAutoOpen}
            onChange={(event) => saveSettings(updateSetting(settings, { dailyAutoOpen: event.target.checked }))}
            className="h-4 w-4 accent-[#345d6f]"
          />
          Allow gentle daily Gracie reminder
        </label>
        <div className="space-y-2">
          <Label htmlFor="gracieTone">Gracie tone</Label>
          <Select
            id="gracieTone"
            value={settings.tone}
            onChange={(event) => saveSettings(updateSetting(settings, { tone: event.target.value as GracieTone }))}
          >
            <option value="gentle">Gentle</option>
            <option value="cheerful">Cheerful</option>
            <option value="quiet">Quiet</option>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
