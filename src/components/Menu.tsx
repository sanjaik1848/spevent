"use client";
import Image from "next/image";
import Link from "next/link";
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
        <div key={`${item.name}-${index}`} className="group flex flex-col items-center space-y-2 text-center card-professional p-3 rounded-3xl">
            <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-3xl shadow-professional group-hover:shadow-professional-lg transition-all duration-500 group-hover:scale-105">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover object-center sm:object-center transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={item.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-sm md:text-lg font-serif font-semibold text-white transition-colors duration-300 group-hover:text-gradient">
                {item.name}
            </h3>
            <p className="text-xs md:text-sm text-white leading-relaxed">
                {item.description}
            </p>
        </div>
    );
};

const MenuSection = ({ title, items, loading }: { title: string, items: MenuItem[], loading: boolean }) => (
    <div className="mb-20 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-12">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8">
            {loading ? (
                Array.from({length:3}).map((_, index) => (
                    <div key={`skeleton-${title}-${index}`} className="flex flex-col items-center space-y-2">
                        <Skeleton className="w-full h-60 rounded-3xl" />
                        <Skeleton className="h-5 w-3/4" />
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
        { key: "all", label: "All Items", count: menuData.starters.length + menuData.mainCourses.length + menuData.veg.length + menuData.desserts.length + menuData.organic.length },
        { key: "starters", label: "Starters", count: menuData.starters.length },
        { key: "mainCourses", label: "Main Courses", count: menuData.mainCourses.length },
        { key: "veg", label: "Vegetarian", count: menuData.veg.length },
        { key: "desserts", label: "Desserts", count: menuData.desserts.length },
        { key: "organic", label: "Organic Food", count: menuData.organic.length },
    ];

    const getFilteredItems = () => {
        if (activeFilter === "all") {
            return {
                starters: menuData.starters,
                mainCourses: menuData.mainCourses,
                veg: menuData.veg,
                desserts: menuData.desserts,
                organic: menuData.organic
            };
        }
        
        return {
            starters: activeFilter === "starters" ? menuData.starters : [],
            mainCourses: activeFilter === "mainCourses" ? menuData.mainCourses : [],
            veg: activeFilter === "veg" ? menuData.veg : [],
            desserts: activeFilter === "desserts" ? menuData.desserts : [],
            organic: activeFilter === "organic" ? menuData.organic : []
        };
    };

    const filteredData = getFilteredItems();

  return (
    <section id="menu" className="section-padding bg-motorcycle-dark">
      <div className="container-professional">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-6">
            {pageContent?.title || 'A Taste of Tradition'}
          </h1>
          <p className="text-xl text-white mt-6 max-w-3xl mx-auto leading-relaxed">
            {pageContent?.paragraph || 'Explore the rich and authentic flavors of Tamil Nadu, available for your events.'}
          </p>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
            {filterOptions.map((option) => {
                if (option.key === "organic") {
                    return (
                        <Button
                            key={option.key}
                            asChild
                            variant="outline"
                            className="relative text-sm px-6 py-3 rounded-xl transition-all duration-300 bg-motorcycle-card border-2 border-motorcycle-yellow text-white hover:border-motorcycle-yellow hover:text-motorcycle-yellow hover:bg-motorcycle-yellow/10"
                        >
                            <Link href="/organic-food">
                                {option.label}
                                <Badge variant="secondary" className="ml-2 text-xs bg-motorcycle-yellow text-black">
                                    {option.count}
                                </Badge>
                            </Link>
                        </Button>
                    );
                }
                
                return (
                    <Button
                        key={option.key}
                        variant={activeFilter === option.key ? "default" : "outline"}
                        onClick={() => setActiveFilter(option.key)}
                        className={`relative text-sm px-6 py-3 rounded-xl transition-all duration-300 ${
                            activeFilter === option.key 
                                ? 'btn-primary' 
                                : 'bg-motorcycle-card border-2 border-motorcycle-yellow/30 text-white hover:border-motorcycle-yellow hover:text-motorcycle-yellow hover:bg-motorcycle-yellow/10'
                        }`}
                    >
                        {option.label}
                        <Badge variant="secondary" className="ml-2 text-xs bg-motorcycle-yellow text-black">
                            {option.count}
                        </Badge>
                    </Button>
                );
            })}
        </div>
        
        <div className="max-w-6xl mx-auto">
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
            {filteredData.organic.length > 0 && (
                <MenuSection title="Organic Food" items={filteredData.organic} loading={loading} />
            )}
        </div>
      </div>
    </section>
  );
}
