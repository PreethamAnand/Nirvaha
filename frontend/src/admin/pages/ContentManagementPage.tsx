import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeditationContent } from "./content/MeditationContent";
import { SoundHealingContent } from "./content/SoundHealingContent";
import { ProductsContent } from "./content/ProductsContent";

const TAB_TO_PATH: Record<string, string> = {
  meditation: "/admin/content/meditation",
  sound: "/admin/content/sound",
  products: "/admin/content/products",
};

const PATH_TO_TAB: Record<string, string> = {
  "/admin/content/meditation": "meditation",
  "/admin/content/sound": "sound",
  "/admin/content/products": "products",
};

export function ContentManagementPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const path = location.pathname.replace(/\/$/, "");
    return PATH_TO_TAB[path] || "meditation";
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/admin/content" || location.pathname === "/admin/content/") {
      navigate("/admin/content/meditation", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleTabChange = (value: string) => {
    const target = TAB_TO_PATH[value] || "/admin/content/meditation";
    navigate(target);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Content Management</h1>
        <p className="text-gray-700">Manage meditations, sound healing sessions, and marketplace products</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-white border-b border-emerald-200">
          <TabsTrigger value="meditation" className="data-[state=active]:bg-emerald-50 text-black data-[state=active]:text-emerald-700">
            Meditation
          </TabsTrigger>
          <TabsTrigger value="sound" className="data-[state=active]:bg-emerald-50 text-black data-[state=active]:text-emerald-700">
            Sound Healing
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-emerald-50 text-black data-[state=active]:text-emerald-700">
            Marketplace Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="meditation" className="mt-6">
          <MeditationContent />
        </TabsContent>
        <TabsContent value="sound" className="mt-6">
          <SoundHealingContent />
        </TabsContent>
        <TabsContent value="products" className="mt-6">
          <ProductsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}


