// import { appropiationsDetails_type } from '../../types/index.tsx';
import { useCRUD } from '../../hooks/useCRUD.ts';
import {API_ENDPOINTS} from '../endpoints.ts';

export const useAppropiationDetailService = () => useCRUD<any>(API_ENDPOINTS.APPROPIATIONDETAILS);