interface UserData {
  email: string;
  name: string;
  picture: string;
  sub: string;
  nickname: string;
  updated_at: string;
}

export const getUserFromStorage = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('user');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return null;
  }
};

export const setUserInStorage = (user: UserData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('email', user.email);
    localStorage.setItem('name', user.name);
    localStorage.setItem('picture', user.picture);
    localStorage.setItem('sub', user.sub);
    localStorage.setItem('nickname', user.nickname);
    localStorage.setItem('updated_at', user.updated_at);
  } catch (error) {
    console.error('Error storing user data in localStorage:', error);
  }
};

export const clearUserFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('user');
};
