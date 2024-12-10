import { auth0Service } from '@/services/auth0Service';

interface UserData {
  email: string;
  name: string;
  picture: string;
  sub?: string;
  nickname?: string;
  updated_at?: string;
  metadata?: any;
}

export const getUserFromStorage = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  try {
    return {
      email: localStorage.getItem('email') || '',
      name: localStorage.getItem('name') || '',
      picture: localStorage.getItem('picture') || '',
      sub: localStorage.getItem('sub') || '',
      nickname: localStorage.getItem('nickname') || '',
      updated_at: localStorage.getItem('updated_at') || '',
      metadata: JSON.parse(localStorage.getItem('user_metadata') || '{}')
    };
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

export const setUserInStorage = async (user: UserData): Promise<void> => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('email', user.email);
    localStorage.setItem('name', user.name);
    localStorage.setItem('picture', user.picture);
    localStorage.setItem('sub', user.sub || '');
    localStorage.setItem('nickname', user.nickname || '');
    localStorage.setItem('updated_at', user.updated_at || '');
    // Fetch and store user metadata if we have a sub
    if (user.sub) {
      try {
        const metadata = await auth0Service.getUserMetadata(user.sub);
        const userMeta = JSON.stringify(metadata).split(":")[1].replace("}", "");
        localStorage.setItem('user_metadata', userMeta);
      } catch (error) {
        console.error('Error fetching user metadata:', error);
      }
    }
  } catch (error) {
    console.error('Error setting user in storage:', error);
  }
};

export const clearUserFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('picture');
    localStorage.removeItem('sub');
    localStorage.removeItem('nickname');
    localStorage.removeItem('updated_at');
    localStorage.removeItem('user_metadata');
  } catch (error) {
    console.error('Error clearing user from storage:', error);
  }
};
