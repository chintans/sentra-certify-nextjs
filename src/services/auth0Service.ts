export const auth0Service = {
  async getUserMetadata(userId: string): Promise<any> {
    try {
      const response = await fetch(`/api/auth/management?userId=${encodeURIComponent(userId)}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user metadata');
      }

      const { metadata } = await response.json(); 
      return metadata;
    } catch (error) {
      console.error('Error fetching user metadata:', error);
      throw error;
    }
  }
};
