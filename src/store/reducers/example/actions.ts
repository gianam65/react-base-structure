/* eslint-disable @typescript-eslint/no-explicit-any */
import ExampleRepository from '@/repositories/ExampleRepository';
import { createAsyncThunk } from '@reduxjs/toolkit';

const exampleRepo = new ExampleRepository();

export const fetchList = createAsyncThunk(
    'example/fetchList',
    async (params: any) => {
        const { response } = await exampleRepo.list(params);

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
    'example/fetchUpdate',
    async ({ id, data }: { id: string; data: any }) => {
        const { response } = await exampleRepo.update(id, data);

        return response.data;
    },
);

export const fetchCreate = createAsyncThunk(
    'example/fetchCreate',
    async ({ data }: { data: any }) => {
        const { response } = await exampleRepo.create(data);

        return response.data;
    },
);
