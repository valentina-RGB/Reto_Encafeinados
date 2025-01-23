// import { useState } from 'react';
import client from '../api/clients';

type CrudMethods<T> = {
  getAll: () => Promise<T[]>;
  getById: (id: string | number) => Promise<T>;
  create: (data: T) => Promise<T>;
  update: (id: string | number, data: Partial<T>) => Promise<T>;
  login: (data: any) => Promise<T>;
  remove: (id: string | number) => Promise<void>;
};

export const useCRUD = <T>(endpoint: string): CrudMethods<T> => {
  const setError = (message: string) => console.error(message);

  const getAll = async (): Promise<T[]> => {
    try {

      const response = await client.get(endpoint);
      return response.data;

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err;
    }
  };

  const getById = async (id: string | number): Promise<T> => {
    try {

      const response = await client.get(`${endpoint}/${id}`);
      return response.data;

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err;
    }
  };

  const create = async (data: T): Promise<T> => {
    try {

      const response = await client.post(endpoint, data);
      return response.data;

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err;
    }
  };

  const update = async (id: string | number, data: Partial<T>): Promise<T> => {
    try {

      const response = await client.put(`${endpoint}/${id}`, data);
      return response.data;

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err;
    }
  };

  const remove = async (id: string | number): Promise<void> => {
    try {

      await client.delete(`${endpoint}/${id}`);
      
    }catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err;
    }
  };

  const login = async (data: any): Promise<T> => {
    try {
      const response = await client.post(endpoint, data);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      throw err;
    }
  };  

  return { login, getAll, getById, create, update, remove };
};
