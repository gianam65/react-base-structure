/* eslint-disable @typescript-eslint/no-explicit-any */
import ExampleRepository from '@/repositories/ExampleRepository';
import { createAsyncThunk } from '@reduxjs/toolkit';

const appStateRepo = new ExampleRepository();

export const fetchList = createAsyncThunk(
    'appState/fetchList',
    async (params: any) => {
        const { response } = await appStateRepo.list(params);

        return response?.data[0];
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
    'appState/fetchUpdate',
    async ({ id, data }: { id: string; data: any }) => {
        const { response } = await appStateRepo.update(id, data);

        return response.data;
    },
);

export const fetchCreate = createAsyncThunk(
    'appState/fetchCreate',
    async ({ data }: { data: any }) => {
        const { response } = await appStateRepo.create(data);

        return response.data;
    },
);
