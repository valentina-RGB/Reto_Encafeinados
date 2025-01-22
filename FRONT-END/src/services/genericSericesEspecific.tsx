import GenericService from './genericService';
import { Example } from '../interfaces';

const exampleService = new GenericService<Example>('/examples');
export default exampleService;