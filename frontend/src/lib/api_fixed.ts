// src/lib/api.ts

const API_BASE_URL = 'http://localhost:3001/api';

// Authentication API functions
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}

export async function registerUser(userData: any) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}

// User management API functions
export async function fetchUsers(token: string) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function updateUserRole(userId: string, newRole: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ role: newRole })
  });
  if (!response.ok) throw new Error('Failed to update user role');
  return response.json();
}

// Collections API functions
export async function fetchCollections(token: string) {
  const response = await fetch(`${API_BASE_URL}/collections`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch collections');
  return response.json();
}

export async function createCollection(collectionData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(collectionData)
  });
  if (!response.ok) throw new Error('Failed to create collection');
  return response.json();
}

export async function updateCollection(collectionId: string, collectionData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/collections/${collectionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(collectionData)
  });
  if (!response.ok) throw new Error('Failed to update collection');
  return response.json();
}

export async function deleteCollection(collectionId: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/collections/${collectionId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete collection');
  return response.json();
}

// Vehicles API functions
export async function fetchVehicles(token: string) {
  const response = await fetch(`${API_BASE_URL}/vehicles`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch vehicles');
  return response.json();
}

export async function createVehicle(vehicleData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(vehicleData)
  });
  if (!response.ok) throw new Error('Failed to create vehicle');
  return response.json();
}

export async function updateVehicle(vehicleId: string, vehicleData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(vehicleData)
  });
  if (!response.ok) throw new Error('Failed to update vehicle');
  return response.json();
}

export async function deleteVehicle(vehicleId: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete vehicle');
  return response.json();
}

// Reports API functions
export async function fetchReports(token: string) {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch reports');
  return response.json();
}

export async function createReport(reportData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(reportData)
  });
  if (!response.ok) throw new Error('Failed to create report');
  return response.json();
}

export async function updateReport(reportId: string, reportData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/reports/${reportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(reportData)
  });
  if (!response.ok) throw new Error('Failed to update report');
  return response.json();
}

export async function deleteReport(reportId: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/reports/${reportId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete report');
  return response.json();
}

// Routes API functions
export async function fetchRoutes(token: string) {
  const response = await fetch(`${API_BASE_URL}/routes`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch routes');
  return response.json();
}

export async function createRoute(routeData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/routes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(routeData)
  });
  if (!response.ok) throw new Error('Failed to create route');
  return response.json();
}

export async function updateRoute(routeId: string, routeData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/routes/${routeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(routeData)
  });
  if (!response.ok) throw new Error('Failed to update route');
  return response.json();
}

export async function deleteRoute(routeId: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/routes/${routeId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to delete route');
  return response.json();
}
