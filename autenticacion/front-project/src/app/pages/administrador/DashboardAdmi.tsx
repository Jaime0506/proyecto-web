import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardHeader, CardFooter } from '../microdesafios/components/ui/card';
import { Button } from '../microdesafios/components/ui/button';
import { 
  Users, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface userType {
  id: number
  email: string
  role: string
}

// Simulated admin users database (in a real app, this would come from a backend)
const ADMIN_USERS: userType[] = [
  { id: 1, email: 'admin1@canvis.com', role: 'superadmin' },
  { id: 2, email: 'admin2@canvis.com', role: 'editor' }
];

export const AdminDashboard = () => {
  const [user, setUser] = useState<userType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication on component mount
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    // In a real application, this would involve:
    // 1. Checking localStorage or session storage
    // 2. Validating a JWT token
    // 3. Making an API call to validate the admin session
    const storedAdminEmail = localStorage.getItem('adminEmail');
    
    if (storedAdminEmail) {
      const adminUser = ADMIN_USERS.find(
        admin => admin.email === storedAdminEmail
      );

      if (adminUser) {
        setUser(adminUser);
        setIsAuthenticated(true);
        return;
      }
    }

    // If no valid admin found, redirect to login
    setIsAuthenticated(false);
  };

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
  };

  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/auth/admin-login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Canvis Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">User Management</h2>
              <Users className="text-blue-500" />
            </CardHeader>
           
              <p>Manage user accounts and permissions</p>
         
            <CardFooter>
              <Button>Manage Users</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Analytics</h2>
              <BarChart2 className="text-green-500" />
            </CardHeader>
            
              <p>View system-wide usage and performance metrics</p>
            
            <CardFooter>
              <Button>View Reports</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">System Settings</h2>
              <Settings className="text-purple-500" />
            </CardHeader>
            
              <p>Configure system-wide settings and preferences</p>
           
            <CardFooter>
              <Button>Configure</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut /> Logout
          </Button>
        </div>

        {user && (
          <div className="mt-4 text-center text-gray-600">
            Logged in as: {user.email} (Role: {user.role})
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;