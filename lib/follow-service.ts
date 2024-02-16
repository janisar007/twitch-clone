import { db } from "./db";
import { getSelf } from "./auth-service";

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id,
      },
      include: {
        following: true,
      }
    })

    return followedUsers;
    
  } catch {
    return [];
  }
}

export const isFollowingUser = async (id: string) => {
  //id : it is the id of the user that we are trying to follow.

  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      //we are always going to be our follower. so no need to check in to the database.
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id, //this person is checking wether he is following the other user or not
        followingId: otherUser.id, //this person is being checked.
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
};

//this is a route for actually follow the user ->
export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
    throw new Error("Can not follow yourself");
  }

  //checking wether the user is already follwing the other user or not ->
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },

    include: {
      following: true, //isse us user ka data bhi aa jaega from User model, jo ki follow ho raha hai, the otheruser
      follower: true, //isse us user ka data include ho jaega jo ki follow kara raha hai.
    },
  });

  return follow;
};


export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: {
      id,
    }
  })

  if(!otherUser) {
    throw new Error("User not found")
  }

  if(otherUser.id === self.id) {
    throw new Error("Can not unfollow yourself")
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  })

  if(!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    }
  })

  return follow;
}