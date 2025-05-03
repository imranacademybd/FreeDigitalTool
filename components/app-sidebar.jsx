import {
  Book,
  BookOpen,
  Calendar,
  ChevronRight,
  createLucideIcon,
  Home,
  Inbox,
  LayoutDashboard,
  Megaphone,
  MoveRight,
  PenTool,
  Search,
  Settings,
  Text,
  User,
  WalletCards,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import NavMain from "./nav-main";
import { NavUser } from "./nav-user";
import { NavTools } from "./nav-tools";

export function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
   
  ];



  const data = {
    navMain: [
      {
        title: "Blogs",
        url: "/dashboard/blogs",
        icon: <Text />,
        items: [
          {
            title: "Manage All Blogs",
            url: "/dashboard/blogs",
            icon: <ChevronRight />,
          },
          {
            title: "Create New Blog",
            url: "/dashboard/blogs/create-blog",
            icon: <ChevronRight />,
          },
          {
            title: "Categories",
            url: "/dashboard/blogs/categories",
            icon: <ChevronRight />,
          },
          {
            title: "Tags",
            url: "/dashboard/blogs/tags",
            icon: <ChevronRight />,
          },
        ],
      },
      {
        title: "Contact Us",
        url: "/dashboard/contact-us",
        icon: <Inbox />,
        items: [
          {
            title: "Manage All Contacts",
            url: "/dashboard/contact-us",
            icon: <ChevronRight />,
          },
        ],
      },
      {
        title: "Users",
        url: "dashboard/users",
        icon: <User />,
        items: [
          {
            title: "Manage All Users",
            url: "/dashboard/users",
          },
        ],
      },

      {
        title: "Plans",
        url: "#",
        icon: <WalletCards />,
        items: [
          {
            title: "All Plans",
            url: "/dashboard/plans/all-plans",
            icon: <ChevronRight />,
          },
          {
            title: "Create Plan",
            url: "/dashboard/plans/create-plan",
            icon: <ChevronRight />,
          },
          {
            title: "FAQ's",
            url: "/dashboard/plans/faqs",
            icon: <ChevronRight />,
          },
          // {
          //   title: "FAQ's",
          //   url: "/dashboard/plans/faqs/create-faqs",
          //   icon: <ChevronRight />,
          // },
          {
            title: "Transactions",
            url: "/dashboard/plans/transactions",
            icon: <ChevronRight />,
          },
        ],
      },
      {
        title: "Advertisements",
        url: "#",
        icon: <Megaphone />,
        items: [
          {
            title: "All Advertisements",
            url: "/dashboard/advertisements/all-advertisements",
            icon: <ChevronRight />,
          },
          {
            title: "Create Advertisement",
            url: "/dashboard/advertisements/create-advertisement",
            icon: <ChevronRight />,
          },
        ],
      },
    ],
    navTools: [
      {
        title: "Tools",
        url: "#",
        icon: <PenTool />,
        items: [
          {
            title: "All Tools Management",
            url: "/dashboard/tools/all-tools",
            icon: <ChevronRight />,
          },
          {
            title: "Create New Tool",
            url: "/dashboard/tools/create-new-tool",
            icon: <ChevronRight />,
          },
          {
            title: "Homepage Tools",
            url: "/dashboard/tools/homepage-tools",
            icon: <ChevronRight />,
          },
          {
            title: "Tools Categories",
            url: "/dashboard/tools/tools-categories",
            icon: <ChevronRight />,
          },
        ],
      },
    ],
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  };

  return (
    <Sidebar>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Link href={"/dashboard"}>
          <Image
            className="my-5 mx-auto"
            src="/logo.png"
            alt="Website Logo"
            width={150}
            height={50}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarContent>
            <NavMain items={data.navMain} />
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarContent>
            <NavMain items={data.navTools} />
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
