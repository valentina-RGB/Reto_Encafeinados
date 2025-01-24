import { depositSupplierType } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useDepositService = () => useCRUD<depositSupplierType>(API_ENDPOINTS.DEPOSITS);