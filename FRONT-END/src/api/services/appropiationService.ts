import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useAppropiationService = () => useCRUD<any>(API_ENDPOINTS.APPROPIATIONDETAILS);
