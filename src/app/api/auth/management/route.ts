import { NextResponse } from 'next/server';

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

async function getManagementToken() {
  try {
    console.log(AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET);
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
      throw new Error('Failed to get management token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting management token:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const token = await getManagementToken();
    const response = await fetch(`${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user metadata');
    }

    const userData = await response.json();
    return NextResponse.json({ metadata: userData.user_metadata || {} });
  } catch (error) {
    console.error('Error in management API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
