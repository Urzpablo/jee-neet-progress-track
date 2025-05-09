
import React from 'react';
import { Link } from "react-router-dom";
import { useApp } from '@/contexts/AppContext';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Book, BarChart, User, Settings, UserPlus } from 'lucide-react';

const AppSidebar = () => {
  const { userRole, setUserRole, students, currentStudent, setCurrentStudent } = useApp();
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <Link to="/" className="text-lg font-bold text-primary">
          JEE/NEET Progress
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <BarChart size={18} />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {userRole === 'tutor' && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/students">
                        <User size={18} />
                        <span>Students</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/practice">
                        <Book size={18} />
                        <span>Practice Tracking</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings">
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {userRole === 'tutor' && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel>Students</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {students.map(student => (
                  <SidebarMenuItem key={student.id}>
                    <SidebarMenuButton 
                      asChild
                      isActive={currentStudent?.id === student.id}
                      onClick={() => setCurrentStudent(student.id)}
                    >
                      <Link to={`/student/${student.id}`}>
                        <span className="inline-block w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                          {student.name.charAt(0)}
                        </span>
                        <span>{student.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/add-student" className="text-muted-foreground">
                      <UserPlus size={18} />
                      <span>Add Student</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <div className="flex gap-2">
            <Button
              variant={userRole === 'tutor' ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => setUserRole('tutor')}
            >
              Tutor View
            </Button>
            <Button
              variant={userRole === 'parent' ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => setUserRole('parent')}
            >
              Parent View
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
