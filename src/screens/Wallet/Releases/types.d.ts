import { IReleasesList } from '../types';

export interface IReleases {
  releasesList: IReleasesList[];
  onTrashClick: (id: number) => void;
  onEditClick: (release: IReleasesList) => void;
}
