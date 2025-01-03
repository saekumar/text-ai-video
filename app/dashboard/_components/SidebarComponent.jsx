'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  CircleUser,
  Command,
  CreditCard,
  FileVideo2Icon,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  ShieldPlusIcon,
  Sparkles,
  SquareTerminal,
  Trash2,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserButton } from '@clerk/nextjs'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Icons from '../../../components/global/icons'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Input } from '../../../components/ui/input'
import { redirect, usePathname } from 'next/navigation'
const menuOptions = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    id: 2,
    name: 'Create-new Short',
    path: '/dashboard/create-new',
    icon: FileVideo2Icon,
  },
  {
    id: 4,
    name: 'Create-new Video',
    path: '/dashboard/video',
    icon: CircleUser,
  },
]

const SidebarComponent = (props) => {
  const path = usePathname()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Icons.logo className="w-8 h-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SaeNius</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu className="space-y-4">
              {menuOptions.map((item) => (
                <Link href={item.path}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={item.name}
                      className={`${
                        path === item.path && 'text-gray-200 bg-blue-700'
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          style={{ width: '25px', height: '25px' }}
                          className="text-neutral-300"
                        />
                      )}
                      <span className="text-gray-300 font-medium">
                        {item.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <Input placeholder="Search here..." className="w-80" />
          <UserButton />
        </header>
        <div className="md:ml-32 p-6">{props.children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarComponent
