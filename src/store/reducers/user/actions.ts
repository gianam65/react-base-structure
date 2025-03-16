/* eslint-disable @typescript-eslint/no-explicit-any */
import UserRepository from '@/repositories/UserRepository';
import { createAsyncThunk } from '@reduxjs/toolkit';

const userRepo = new UserRepository();

export const fetchList = createAsyncThunk(
    'user/fetchList',
    async (params: any) => {
        const { response } = await userRepo.list(params);

        return response?.data?.[0];
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
    'user/fetchUpdate',
    async ({ id, data }: { id: string; data: any }) => {
        const { response } = await userRepo.update(id, data);

        return response.data;
    },
);

export const checkEnabledThemeExtension = createAsyncThunk(
    'user/checkEnabledThemeExtension',
    async (params: any) => {
        const { response } = await userRepo.checkEnabledThemeExtension(params);

        return response?.data;
    },
);

export const activateThemeExtensionLink = createAsyncThunk(
    'user/activateThemeExtensionLink',
    async (params: any) => {
        const { response } = await userRepo.activateThemeExtensionLink(params);

        return response?.data;
    },
);
