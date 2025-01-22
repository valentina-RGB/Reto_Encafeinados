
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3300', // URL de tu API
  });

class GenericService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint; // Define la URL base para este servicio
  }

  async create(data: T): Promise<T> {
    const response = await apiClient.post<T>(`${this.endpoint}`, data);
    return response.data;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const response = await apiClient.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }

  async list(): Promise<T[]> {
    const response = await apiClient.get<T[]>(`${this.endpoint}`);
    return response.data;
  }

  async getById(id: number): Promise<T> {
    const response = await apiClient.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }
}

export default GenericService;


