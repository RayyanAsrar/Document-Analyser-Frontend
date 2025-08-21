import { Sidebar, SidebarContent } from "./ui/sidebar";

const AppSidebar = ({ children }) => {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full py-4 px-2  bg-background">
        {children}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
