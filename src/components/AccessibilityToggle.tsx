import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAccessibility } from '@/hooks/useAccessibility';
import { 
  Eye, 
  Focus, 
  HelpCircle, 
  Palette,
  CheckCircle
} from 'lucide-react';

export function AccessibilityToggle() {
  const { settings, updateSettings, toggleColorBlindMode, toggleFocusIndicators, toggleHelpTooltips } = useAccessibility();

  const colorBlindLabels = {
    none: 'Normal',
    protanopia: 'Red-Blind',
    deuteranopia: 'Green-Blind', 
    tritanopia: 'Blue-Blind'
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Color Blind Support */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">Color Blind Support</span>
          </div>
          <Select 
            value={settings.colorBlindMode} 
            onValueChange={(value: any) => updateSettings({ colorBlindMode: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(colorBlindLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Focus Indicators */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Focus className="h-4 w-4" />
            <span className="text-sm font-medium">Focus Indicators</span>
          </div>
          <Switch
            checked={settings.showFocusIndicators}
            onCheckedChange={toggleFocusIndicators}
          />
        </div>

        {/* Help Tooltips */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Help Tooltips</span>
          </div>
          <Switch
            checked={settings.showHelpTooltips}
            onCheckedChange={toggleHelpTooltips}
          />
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-xs text-muted-foreground">
            Accessibility features active
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
