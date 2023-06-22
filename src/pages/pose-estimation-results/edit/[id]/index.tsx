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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPoseEstimationResultById, updatePoseEstimationResultById } from 'apiSdk/pose-estimation-results';
import { Error } from 'components/error';
import { poseEstimationResultValidationSchema } from 'validationSchema/pose-estimation-results';
import { PoseEstimationResultInterface } from 'interfaces/pose-estimation-result';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeamMemberInterface } from 'interfaces/team-member';
import { getTeamMembers } from 'apiSdk/team-members';

function PoseEstimationResultEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PoseEstimationResultInterface>(
    () => (id ? `/pose-estimation-results/${id}` : null),
    () => getPoseEstimationResultById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PoseEstimationResultInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePoseEstimationResultById(id, values);
      mutate(updated);
      resetForm();
      router.push('/pose-estimation-results');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PoseEstimationResultInterface>({
    initialValues: data,
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
            Edit Pose Estimation Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'pose_estimation_result',
  operation: AccessOperationEnum.UPDATE,
})(PoseEstimationResultEditPage);
