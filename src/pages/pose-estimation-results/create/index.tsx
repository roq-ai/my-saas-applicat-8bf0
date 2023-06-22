import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPoseEstimationResult } from 'apiSdk/pose-estimation-results';
import { Error } from 'components/error';
import { poseEstimationResultValidationSchema } from 'validationSchema/pose-estimation-results';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeamMemberInterface } from 'interfaces/team-member';
import { getTeamMembers } from 'apiSdk/team-members';
import { PoseEstimationResultInterface } from 'interfaces/pose-estimation-result';

function PoseEstimationResultCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PoseEstimationResultInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPoseEstimationResult(values);
      resetForm();
      router.push('/pose-estimation-results');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PoseEstimationResultInterface>({
    initialValues: {
      result_data: '',
      team_member_id: (router.query.team_member_id as string) ?? null,
    },
    validationSchema: poseEstimationResultValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Pose Estimation Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="result_data" mb="4" isInvalid={!!formik.errors?.result_data}>
            <FormLabel>Result Data</FormLabel>
            <Input type="text" name="result_data" value={formik.values?.result_data} onChange={formik.handleChange} />
            {formik.errors.result_data && <FormErrorMessage>{formik.errors?.result_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<TeamMemberInterface>
            formik={formik}
            name={'team_member_id'}
            label={'Select Team Member'}
            placeholder={'Select Team Member'}
            fetcher={getTeamMembers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'pose_estimation_result',
  operation: AccessOperationEnum.CREATE,
})(PoseEstimationResultCreatePage);
