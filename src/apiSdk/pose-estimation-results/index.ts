import axios from 'axios';
import queryString from 'query-string';
import {
  PoseEstimationResultInterface,
  PoseEstimationResultGetQueryInterface,
} from 'interfaces/pose-estimation-result';
import { GetQueryInterface } from '../../interfaces';

export const getPoseEstimationResults = async (query?: PoseEstimationResultGetQueryInterface) => {
  const response = await axios.get(`/api/pose-estimation-results${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPoseEstimationResult = async (poseEstimationResult: PoseEstimationResultInterface) => {
  const response = await axios.post('/api/pose-estimation-results', poseEstimationResult);
  return response.data;
};

export const updatePoseEstimationResultById = async (
  id: string,
  poseEstimationResult: PoseEstimationResultInterface,
) => {
  const response = await axios.put(`/api/pose-estimation-results/${id}`, poseEstimationResult);
  return response.data;
};

export const getPoseEstimationResultById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/pose-estimation-results/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deletePoseEstimationResultById = async (id: string) => {
  const response = await axios.delete(`/api/pose-estimation-results/${id}`);
  return response.data;
};
