import { Vehicle } from 'app/_model/vehicle';
import { Repairman } from './repairman';

export class Workdone{

    idWorkdone: number;
    vehicle: Vehicle;
    repairman: Repairman;
    fecha: string;
    titleWorkdone: string;
    commentary: string;
    detail: string;
    
}