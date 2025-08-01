const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const apiService = {
  async saveDrawing(username: string, shapes: any[]): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`${API_BASE_URL}/drawings/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shapes),
      });

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: `Failed to save drawing: ${response.statusText}` };
      }
    } catch (error) {
      return { success: false, error: `Network error: ${error}` };
    }
  },

  async loadDrawing(username: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/drawings/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else if (response.status === 404) {
        return { success: false, error: 'No drawing found for this user' };
      } else {
        return { success: false, error: `Failed to load drawing: ${response.statusText}` };
      }
    } catch (error) {
      return { success: false, error: `Network error: ${error}` };
    }
  },
}; 