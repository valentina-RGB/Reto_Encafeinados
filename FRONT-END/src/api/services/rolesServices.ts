import { roles_type } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useRolService = () => useCRUD<roles_type>(API_ENDPOINTS.ROLES);