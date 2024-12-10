const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '';
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || '';

interface Auth0TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const auth0Service = {
  async getManagementApiToken(): Promise<string> {
    try {
      const response = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          client_id: AUTH0_CLIENT_ID,
          client_secret: AUTH0_CLIENT_SECRET,
          audience: `${AUTH0_DOMAIN}/api/v2/`,
          grant_type: 'client_credentials'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get management API token');
      }

      const data: Auth0TokenResponse = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error getting management API token:', error);
      throw error;
    }
  },

  async getUserMetadata(userId: string): Promise<any> {
    try {
      const token = await this.getManagementApiToken();
      const response = await fetch(`${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user metadata');
      }
      const userData = await response.json();
      return userData.user_metadata || {};
    } catch (error) {
      console.error('Error fetching user metadata:', error);
      throw error;
    }
  }
};
