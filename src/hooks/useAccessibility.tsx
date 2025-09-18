import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings } from '@/types';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
  toggleColorBlindMode: () => void;
  toggleFocusIndicators: () => void;
  toggleHelpTooltips: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const defaultSettings: AccessibilitySettings = {
  colorBlindMode: 'none',
  showFocusIndicators: true,
  showHelpTooltips: true,
};

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // Apply color blind mode to document
    document.documentElement.setAttribute('data-colorblind', settings.colorBlindMode);
    document.documentElement.setAttribute('data-focus-indicators', settings.showFocusIndicators.toString());
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleColorBlindMode = () => {
    const modes: AccessibilitySettings['colorBlindMode'][] = ['none', 'protanopia', 'deuteranopia', 'tritanopia'];
    const currentIndex = modes.indexOf(settings.colorBlindMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    updateSettings({ colorBlindMode: modes[nextIndex] });
  };

  const toggleFocusIndicators = () => {
    updateSettings({ showFocusIndicators: !settings.showFocusIndicators });
  };

  const toggleHelpTooltips = () => {
    updateSettings({ showHelpTooltips: !settings.showHelpTooltips });
  };

  return (
    <AccessibilityContext.Provider value={{
      settings,
      updateSettings,
      toggleColorBlindMode,
      toggleFocusIndicators,
      toggleHelpTooltips,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
