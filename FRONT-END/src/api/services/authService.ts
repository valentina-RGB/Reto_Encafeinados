import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const loginService = () => useCRUD<any>(API_ENDPOINTS.LOGIN);
