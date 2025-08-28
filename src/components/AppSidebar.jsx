import { Sidebar, SidebarContent } from "./ui/sidebar";
import UserMenu from "./UserMenu";

const AppSidebar = ({ children }) => {
  return (
    <Sidebar>
      <SidebarContent className="relative flex flex-col justify-between h-full py-4 px-1 bg-background overflow-hidden">
        {children}
        <div className="px-2 border-t pt-3">
          <UserMenu />
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
