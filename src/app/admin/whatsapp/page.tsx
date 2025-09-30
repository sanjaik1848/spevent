"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useWhatsAppSettings } from "@/hooks/useWhatsAppSettings";
import { Save, RotateCcw, Eye, MessageCircle, Phone, Settings } from "lucide-react";
import Link from "next/link";

export default function WhatsAppSettingsPage() {
  const { settings, isLoading, updateSettings, resetToDefault } = useWhatsAppSettings();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSettingUpdate = (key: keyof typeof settings, value: any) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">WhatsApp Chat Settings</h1>
          <p className="text-gray-600 mt-2">Configure your WhatsApp chat widget for customer support</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" target="_blank">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview Website
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset Settings
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset WhatsApp Settings</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all WhatsApp settings to default values. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetToDefault}>
                  Reset Settings
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Status Card */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">WhatsApp Chat Widget</h3>
                <p className="text-sm text-gray-600">
                  {settings.isEnabled ? (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Disabled</Badge>
                  )}
                </p>
              </div>
            </div>
            <Switch
              checked={settings.isEnabled}
              onCheckedChange={(checked) => handleSettingUpdate('isEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Basic Settings
            </CardTitle>
            <CardDescription>
              Configure the basic information for your WhatsApp chat widget
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="phone-number">WhatsApp Phone Number</Label>
              <Input
                id="phone-number"
                value={settings.phoneNumber}
                onChange={(e) => handleSettingUpdate('phoneNumber', e.target.value)}
                placeholder="+1234567890"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Include country code (e.g., +1 for US, +44 for UK)
              </p>
            </div>

            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={settings.businessName}
                onChange={(e) => handleSettingUpdate('businessName', e.target.value)}
                placeholder="Your Business Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="welcome-message">Welcome Message</Label>
              <Textarea
                id="welcome-message"
                value={settings.welcomeMessage}
                onChange={(e) => handleSettingUpdate('welcomeMessage', e.target.value)}
                placeholder="Hi! How can we help you?"
                className="mt-1"
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                This message will appear when users open the chat widget
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Display Settings
            </CardTitle>
            <CardDescription>
              Customize how the WhatsApp widget appears on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="position">Widget Position</Label>
              <Select
                value={settings.position}
                onValueChange={(value) => handleSettingUpdate('position', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-pulse">Show Pulse Animation</Label>
                <p className="text-xs text-gray-500">
                  Adds a pulsing animation to attract attention
                </p>
              </div>
              <Switch
                id="show-pulse"
                checked={settings.showPulse}
                onCheckedChange={(checked) => handleSettingUpdate('showPulse', checked)}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Quick Message Templates</h4>
              <p className="text-sm text-blue-700 mb-2">
                These pre-written messages will be available for users to send quickly:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• "I'm interested in your event planning services"</li>
                <li>• "Can you help me plan a wedding?"</li>
                <li>• "I need a quote for a corporate event"</li>
                <li>• "What packages do you offer?"</li>
                <li>• "I'd like to schedule a consultation"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Widget Preview</CardTitle>
          <CardDescription>
            See how your WhatsApp chat widget will appear to visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">
                WhatsApp widget will appear as a floating button in the {settings.position} corner
              </p>
              <p className="text-xs mt-2">
                Business: {settings.businessName} | Phone: {settings.phoneNumber}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save WhatsApp Settings
        </Button>
      </div>
    </div>
  );
}



