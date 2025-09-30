import Menu, { MenuData } from "@/components/Menu";
import TopNavbar from "@/components/TopNavbar";
import { menuData } from "@/lib/menu-data";
import { defaultContent } from "@/lib/page-content";

export default function FoodPage() {
    const pageContent = defaultContent.menu;
    
    return (
        <>
            <TopNavbar />
            <main className="py-12 bg-background">
                <Menu menuData={menuData} pageContent={pageContent} />
            </main>
        </>
    );
}
