import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'contributor' | 'hirer';
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Dummy users for testing
export const dummyUsers = [
  {
    id: '1',
    email: 'contributor@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'contributor' as const,
  },
  {
    id: '2',
    email: 'hirer@example.com',
    password: 'password123',
    name: 'TechCorp',
    role: 'hirer' as const,
  },
];

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const logout = () => {
  useAuth.getState().setUser(null);
};