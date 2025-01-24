import { productType } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useProductService = () => useCRUD<productType>(API_ENDPOINTS.PRODUCTS);
