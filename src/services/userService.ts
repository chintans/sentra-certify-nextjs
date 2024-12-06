import axios from "axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    name: string;
  };
}

interface GetUsersResponse {
  users: User[];
}

interface Company {
  name: string;
  email: string;
}

interface UpdateCompanyData {
    name?: string;
    email?: string;
  }

interface GetCompanyResponse {
  company: Company;
}



export const userService = {
  getUsers: async (companyId: number): Promise<User[]> => {
    try {
      const { data } = await axios.get<GetUsersResponse>(
        `/api/user-list?companyId=${companyId}`
      );
      return data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
};

export const companyService = {

    updateCompany: async (companyId: number, data: UpdateCompanyData): Promise<Company> => {
        try {
          const { data: response } = await axios.put<GetCompanyResponse>(
            `/api/profile?companyId=${companyId}`,
            data
          );
          return response.company;
        } catch (error) {
          console.error('Error updating company:', error);
          throw error;
        }
      },

  getCompany: async (companyId: number): Promise<Company> => {
    try {
      const { data } = await axios.get<GetCompanyResponse>(
        `/api/profile?companyId=${companyId}`
      );
      return data.company;
    } catch (error) {
      console.error("Error fetching company:", error);
      throw error;
    }
  },
};
