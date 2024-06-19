import type {Cultivation, User, Role} from "./types";

const api = {
  cultivation: {
    list: () =>
      fetch(`${process.env.API_ROOT!}/cultivations`).then(
        (res) => res.json() as Promise<Cultivation[]>,
      ),
    fetch: async (id: Cultivation["id"]) => {
      const cultivations = await fetch(`${process.env.API_ROOT!}/cultivations`).then(
        (res) => res.json() as Promise<Cultivation[]>,
      );

      return cultivations.find((cultivation) => cultivation.id === id);
    },
    user: {
      list: async (id: Cultivation["id"]) => {
        const users = await fetch(`${process.env.API_ROOT!}/cultivations/${id}/users`).then(
          (res) => res.json() as Promise<User[]>,
        );

        return users.filter(({user}) => user.id && user.name);
      },
      remove: async (id: Cultivation["id"], userId: User["user"]["id"]) =>
        fetch(`${process.env.API_ROOT!}/cultivations/${id}/users/${userId}`, {
          method: "DELETE",
        }),
      role: {
        update: async (
          id: Cultivation["id"],
          userId: User["user"]["id"],
          roleId: User["role"]["id"],
        ) =>
          fetch(`${process.env.API_ROOT!}/cultivations/${id}/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify({role: {id: roleId}}),
          }),
      },
    },
    role: {
      list: async () =>
        fetch(`${process.env.API_ROOT!}/cultivation-roles`).then(
          (res) => res.json() as Promise<Role[]>,
        ),
    },
  },
};

export default api;
