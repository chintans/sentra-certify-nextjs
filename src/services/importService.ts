import axios from 'axios';

export const importService = {
  async importExcelFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};