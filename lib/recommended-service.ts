//recommeds new users

import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) { //if user is logged in
    users = await db.user.findMany({
      where: { //excluding the current user in the recommendation to him self in the left side bar.
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                }
              }
            },
          }
        ]
        
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  } else { //if not logged in then show all of them.
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
