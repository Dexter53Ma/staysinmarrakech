"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface BilingualTabsProps {
  frContent: React.ReactNode;
  enContent: React.ReactNode;
  defaultTab?: "fr" | "en";
}

export default function BilingualTabs({ frContent, enContent, defaultTab = "fr" }: BilingualTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="fr">Français (FR)</TabsTrigger>
        <TabsTrigger value="en">English (EN)</TabsTrigger>
      </TabsList>
      <TabsContent value="fr">{frContent}</TabsContent>
      <TabsContent value="en">{enContent}</TabsContent>
    </Tabs>
  );
}
