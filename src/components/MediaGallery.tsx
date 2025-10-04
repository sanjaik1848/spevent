'use client';
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { PlayCircle, Image as ImageIcon, Video as VideoIcon, Eye, Grid, Layout } from "lucide-react";
import Image from "next/image";

export type MediaItem = {
    id: string;
    type: "image" | "video";
    src: string;
    title: string;
    category: string;
};

export default function MediaGallery({ items, categoryName }: { items: MediaItem[], categoryName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };
  
  const slides = items.map(item => {
      if (item.type === 'video') {
          return {
              type: 'video' as const,
              sources: [{ src: item.src, type: 'video/mp4' }],
              title: item.title,
              width: 1920,
              height: 1080
          };
      }
      return { src: item.src, title: item.title, width: 1800, height: 1200 };
  });

  const imageItems = items.filter(item => item.type === 'image');
  const videoItems = items.filter(item => item.type === 'video');

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50/30">
      <div className="container-professional">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
            {categoryName} <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            Discover the extraordinary {categoryName.toLowerCase()} events we've orchestrated. Each moment tells a unique story of elegance and precision.
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="flex bg-white rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid className="w-4 h-4 mr-2 inline" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'masonry' 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Layout className="w-4 h-4 mr-2 inline" />
                Masonry
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <span>{imageItems.length} Photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <VideoIcon className="w-5 h-5 text-red-600" />
              <span>{videoItems.length} Videos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-600" />
              <span>{items.length} Total</span>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-3xl shadow-professional hover:shadow-professional-lg transition-all duration-500 bg-white"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover object-center transform group-hover:scale-110 transition-all duration-500"
                      data-ai-hint={item.title.toLowerCase()}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover object-center"
                        muted
                        loop
                        playsInline
                        onMouseOver={e => (e.target as HTMLVideoElement).play()}
                        onMouseOut={e => (e.target as HTMLVideoElement).pause()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <PlayCircle className="text-white w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Type Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === 'image' ? 'bg-blue-500/80' : 'bg-red-500/80'
                    } backdrop-blur-sm`}>
                      {item.type === 'image' ? (
                        <ImageIcon className="w-4 h-4 text-white" />
                      ) : (
                        <VideoIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Content Info */}
                <div className="p-3 md:p-6">
                  <h3 className="text-sm md:text-lg font-serif font-semibold text-gray-800 mb-1 md:mb-2 group-hover:text-gradient transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-500 capitalize">{item.category}</span>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-3xl shadow-professional hover:shadow-professional-lg transition-all duration-500 break-inside-avoid bg-white"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden">
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover object-center transform group-hover:scale-110 transition-all duration-500"
                      data-ai-hint={item.title.toLowerCase()}
                    />
                  ) : (
                    <div className="relative">
                      <video
                        src={item.src}
                        className="w-full h-auto object-cover object-center"
                        muted
                        loop
                        playsInline
                        onMouseOver={e => (e.target as HTMLVideoElement).play()}
                        onMouseOut={e => (e.target as HTMLVideoElement).pause()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <PlayCircle className="text-white w-12 h-12" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Type Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.type === 'image' ? 'bg-blue-500/80' : 'bg-red-500/80'
                    } backdrop-blur-sm`}>
                      {item.type === 'image' ? (
                        <ImageIcon className="w-4 h-4 text-white" />
                      ) : (
                        <VideoIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Content Info */}
                <div className="p-3 md:p-6">
                  <h3 className="text-sm md:text-lg font-serif font-semibold text-gray-800 mb-1 md:mb-2 group-hover:text-gradient transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-gray-500 capitalize">{item.category}</span>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={slides}
            index={selectedIndex}
            plugins={[Video]}
          />
        )}
      </div>
    </section>
  );
}
