import { Patrol } from '@domain/entities/patrol.entity';

export class PatrolMapper {
  static toEntity(rawPatrol: any): Patrol {
    return {
      name: rawPatrol.name,
      type: rawPatrol.type,
    };
  }

  static toPersistence(patrol: Patrol): any {
    return {
      name: patrol.name,
      type: patrol.type,
    };
  }
}
