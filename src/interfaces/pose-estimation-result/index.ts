import { TeamMemberInterface } from 'interfaces/team-member';
import { GetQueryInterface } from 'interfaces';

export interface PoseEstimationResultInterface {
  id?: string;
  result_data: string;
  team_member_id?: string;
  created_at?: any;
  updated_at?: any;

  team_member?: TeamMemberInterface;
  _count?: {};
}

export interface PoseEstimationResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  result_data?: string;
  team_member_id?: string;
}
