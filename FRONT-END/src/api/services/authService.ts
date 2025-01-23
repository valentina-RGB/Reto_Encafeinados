import { userType } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const loginService = () => useCRUD<userType>(API_ENDPOINTS.LOGIN);
