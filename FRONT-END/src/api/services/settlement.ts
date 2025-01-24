import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useSettlementsService = () => useCRUD<any>(API_ENDPOINTS.SETTLEMENTS);