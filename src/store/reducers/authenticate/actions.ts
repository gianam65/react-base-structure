/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthenticateRepository from '@/repositories/AuthenticateRepository';
import { createAsyncThunk } from '@reduxjs/toolkit';

const authenticateRepo = new AuthenticateRepository();

export const fetchList = createAsyncThunk(
  'authenticate/fetchList',
  async (params: any) => {
    const { response } = await authenticateRepo.list(params);

    return response.data;
  },
);

/**
 * Fetches and updates the general settings.
 *
 * @param id - The ID of the setting to update.
 * @param data - The data to update.
 * @returns The updated data.
 */
export const fetchUpdate = createAsyncThunk(
  'authenticate/fetchUpdate',
  async ({ id, data }: { id: string; data: any }) => {
    const { response } = await authenticateRepo.update(id, data);

    return response.data;
  },
);
