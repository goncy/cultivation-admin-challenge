"use server";

import type {Cultivation, User} from "@/types";

import {revalidatePath} from "next/cache";

import api from "@/api";

export async function removeUser(cultivationId: Cultivation["id"], userId: User["user"]["id"]) {
  await api.cultivation.user.remove(cultivationId, userId);

  revalidatePath(`/${cultivationId}/edit`);
}

export async function updateUserRole(
  cultivationId: Cultivation["id"],
  userId: User["user"]["id"],
  roleId: User["role"]["id"],
) {
  await api.cultivation.user.role.update(cultivationId, userId, roleId);

  revalidatePath(`/${cultivationId}/edit`);
}
