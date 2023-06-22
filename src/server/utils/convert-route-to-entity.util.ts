const mapping: Record<string, string> = {
  organizations: 'organization',
  'pose-estimation-results': 'pose_estimation_result',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
