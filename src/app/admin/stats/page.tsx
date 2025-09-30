"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useClientStats } from "@/hooks/useClientStats";
import { RotateCcw, Save, Eye } from "lucide-react";
import Link from "next/link";

export default function ClientStatsAdminPage() {
  const { stats, isLoading, updateStats, resetStats } = useClientStats();
  const [editingStats, setEditingStats] = useState<Partial<typeof stats>>({});

  const handleInputChange = (field: keyof typeof stats, value: string) => {
    const numValue = parseInt(value) || 0;
    setEditingStats(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSave = () => {
    updateStats(editingStats);
    setEditingStats({});
  };

  const handleReset = () => {
    resetStats();
    setEditingStats({});
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Statistics</h1>
          <p className="text-gray-600 mt-2">Manage client satisfaction statistics displayed on the website</p>
        </div>
        <div className="flex gap-3">
          <Link href="/website" target="_blank">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Statistics</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all client statistics to default values. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>
                  Reset to Default
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Events Planned */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              Events Planned
            </CardTitle>
            <CardDescription>Total number of events planned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="eventsPlanned">Number of Events</Label>
              <Input
                id="eventsPlanned"
                type="number"
                value={editingStats.eventsPlanned !== undefined ? editingStats.eventsPlanned : stats.eventsPlanned}
                onChange={(e) => handleInputChange('eventsPlanned', e.target.value)}
                placeholder="500"
              />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {editingStats.eventsPlanned !== undefined ? editingStats.eventsPlanned : stats.eventsPlanned}+
              </div>
              <div className="text-sm text-gray-500">Events Planned</div>
            </div>
          </CardContent>
        </Card>

        {/* Client Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">%</span>
              </div>
              Client Satisfaction
            </CardTitle>
            <CardDescription>Percentage of satisfied clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clientSatisfaction">Satisfaction Percentage</Label>
              <Input
                id="clientSatisfaction"
                type="number"
                min="0"
                max="100"
                value={editingStats.clientSatisfaction !== undefined ? editingStats.clientSatisfaction : stats.clientSatisfaction}
                onChange={(e) => handleInputChange('clientSatisfaction', e.target.value)}
                placeholder="99"
              />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {editingStats.clientSatisfaction !== undefined ? editingStats.clientSatisfaction : stats.clientSatisfaction}%
              </div>
              <div className="text-sm text-gray-500">Client Satisfaction</div>
            </div>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">★</span>
              </div>
              Average Rating
            </CardTitle>
            <CardDescription>Average client rating out of 5</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="averageRating">Rating (1-5)</Label>
              <Input
                id="averageRating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={editingStats.averageRating !== undefined ? editingStats.averageRating : stats.averageRating}
                onChange={(e) => handleInputChange('averageRating', e.target.value)}
                placeholder="5"
              />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {editingStats.averageRating !== undefined ? editingStats.averageRating : stats.averageRating}
              </div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          disabled={Object.keys(editingStats).length === 0}
        >
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      {/* Current Values Display */}
      <Card>
        <CardHeader>
          <CardTitle>Current Statistics</CardTitle>
          <CardDescription>These values are currently displayed on the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.eventsPlanned}+</div>
              <div className="text-sm text-gray-600">Events Planned</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.clientSatisfaction}%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.averageRating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Status */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <Save className="w-4 h-4" />
          Changes are saved automatically
        </div>
      </div>
    </div>
  );
}
