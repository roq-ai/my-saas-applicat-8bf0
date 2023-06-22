import { PoseEstimationResultInterface } from 'interfaces/pose-estimation-result';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  pose_estimation_result?: PoseEstimationResultInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    pose_estimation_result?: number;
  };
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
