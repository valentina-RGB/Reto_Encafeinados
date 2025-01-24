import { productVariant_Interface } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useProductVariantService = () => useCRUD<productVariant_Interface>(API_ENDPOINTS.PRODUCTVARIANTS);
