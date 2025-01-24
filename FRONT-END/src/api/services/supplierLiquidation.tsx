import { supplierLiquidationType } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useSupplierLService = () => useCRUD<supplierLiquidationType>(API_ENDPOINTS.SUPPLIERLIQ);