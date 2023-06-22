import * as yup from 'yup';

export const poseEstimationResultValidationSchema = yup.object().shape({
  result_data: yup.string().required(),
  team_member_id: yup.string().nullable(),
});
