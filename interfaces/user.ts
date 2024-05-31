export interface User {
    id: number;
    data: {
      username: string;
      name: {
        firstname: string,
        lastname: string
      };
      email: string;
      password: string;
      phone: string;
    }
    certifications: any;
  }