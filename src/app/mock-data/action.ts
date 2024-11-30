'use server';

import { prisma } from '@/lib/db';
import { RequestData } from '@/types';
import { revalidatePath } from 'next/cache';

const service_name = 'GENERIC';

export async function getAllRequests(): Promise<RequestData[]> {
  const result = await prisma.genericStubConfig.findMany();

  return result.map((item) => ({
    id: String(item.id),
    method: item.http_method,
    responseCode: item.http_status,
    uri: item.uri,
    responseBody: String(item.response),
  }));
}

export async function createNewRequest(param: RequestData) {
  try {
    await prisma.genericStubConfig.create({
      data: {
        http_method: param.method,
        http_status: param.responseCode,
        uri: param.uri,
        response: param.responseBody,
        service_name,
      },
    });

    revalidatePath('/mock-data');
  } catch (error) {
    console.error('Error creating new request:', error);
  }
}

export async function updateRequest(param: RequestData) {
  try {
    await prisma.genericStubConfig.update({
      where: { id: parseInt(param.id) },
      data: {
        http_method: param.method,
        http_status: param.responseCode,
        uri: param.uri,
        response: param.responseBody,
        service_name,
      },
    });

    revalidatePath('/mock-data');
  } catch (error) {
    console.error('Error updating request:', error);
  }
}

export async function deleteRequest(requestId: string) {
  try {
    await prisma.genericStubConfig.delete({ where: { id: Number(requestId) } });

    revalidatePath('/mock-data');
  } catch (error) {
    console.error('Error deleting request:', error);
  }
}
