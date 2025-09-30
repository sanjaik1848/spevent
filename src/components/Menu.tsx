"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PageContent } from "@/lib/page-content";
import type { MenuData, MenuItem } from "@/lib/menu-data";

export type { MenuData, MenuItem };

type MenuPageContent = PageContent['menu'];

const MenuItemCard = ({ item, index }: { item: MenuItem; index: number }) => {
    if (!item.imageUrl) return null;

    return (
        <div key={`${item.name}-${index}`} className="group flex flex-col items-center space-y-4 text-center">
            <div className="relative w-full h-80 overflow-hidden rounded-3xl shadow-professional group-hover:shadow-professional-lg transition-all duration-500 group-hover:scale-105">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={item.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-gray-800 transition-colors duration-300 group-hover:text-gradient">
                {item.name}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
            </p>
        </div>
    );
};

const MenuSection = ({ title, items, loading }: { title: string, items: MenuItem[], loading: boolean }) => (
    <div className="mb-20 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-800 mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {loading ? (
                Array.from({length:3}).map((_, index) => (
                    <div key={`skeleton-${title}-${index}`} className="flex flex-col items-center space-y-4">
                        <Skeleton className="w-full h-80 rounded-3xl" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                ))
            ) : (
                items.map((item, index) => (
                    <MenuItemCard key={`${title}-${index}`} item={item} index={index} />
                ))
            )}
        </div>
    </div>
);


export default function Menu({ menuData, pageContent }: { menuData: MenuData, pageContent: MenuPageContent | undefined}) {
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string>("all");

    useEffect(() => {
        if (menuData) {
            setLoading(false);
        }
    }, [menuData]);

    const filterOptions = [
        { key: "all", label: "All Items", count: menuData.starters.length + menuData.mainCourses.length + menuData.veg.length + menuData.desserts.length },
        { key: "starters", label: "Starters", count: menuData.starters.length },
        { key: "mainCourses", label: "Main Courses", count: menuData.mainCourses.length },
        { key: "veg", label: "Vegetarian", count: menuData.veg.length },
        { key: "desserts", label: "Desserts", count: menuData.desserts.length },
    ];

    const getFilteredItems = () => {
        if (activeFilter === "all") {
            return {
                starters: menuData.starters,
                mainCourses: menuData.mainCourses,
                veg: menuData.veg,
                desserts: menuData.desserts
            };
        }
        
        return {
            starters: activeFilter === "starters" ? menuData.starters : [],
            mainCourses: activeFilter === "mainCourses" ? menuData.mainCourses : [],
            veg: activeFilter === "veg" ? menuData.veg : [],
            desserts: activeFilter === "desserts" ? menuData.desserts : []
        };
    };

    const filteredData = getFilteredItems();

  return (
    <section id="menu" className="section-padding bg-white">
      <div className="container-professional">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-gray-800 mb-6">
            {pageContent?.title || 'A Taste of Tradition'}
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            {pageContent?.paragraph || 'Explore the rich and authentic flavors of Tamil Nadu, available for your events.'}
          </p>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
            {filterOptions.map((option) => (
                <Button
                    key={option.key}
                    variant={activeFilter === option.key ? "default" : "outline"}
                    onClick={() => setActiveFilter(option.key)}
                    className={`relative text-sm px-6 py-3 rounded-xl transition-all duration-300 ${
                        activeFilter === option.key 
                            ? 'btn-primary' 
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-600 hover:text-amber-600'
                    }`}
                >
                    {option.label}
                    <Badge variant="secondary" className="ml-2 text-xs bg-white/20 text-white">
                        {option.count}
                    </Badge>
                </Button>
            ))}
        </div>
        
        <div className="max-w-7xl mx-auto">
            {filteredData.starters.length > 0 && (
                <MenuSection title="Starters" items={filteredData.starters} loading={loading} />
            )}
            {filteredData.mainCourses.length > 0 && (
                <MenuSection title="Main Courses" items={filteredData.mainCourses} loading={loading} />
            )}
            {filteredData.veg.length > 0 && (
                <MenuSection title="Vegetarian" items={filteredData.veg} loading={loading} />
            )}
            {filteredData.desserts.length > 0 && (
                <MenuSection title="Desserts" items={filteredData.desserts} loading={loading} />
            )}
        </div>
      </div>
    </section>
  );
}
