import { supplierType } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useSupplierService = () => useCRUD<supplierType>(API_ENDPOINTS.SUPPLIER);