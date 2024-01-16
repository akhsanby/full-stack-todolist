import validate from "../validation/validate.js";
import { registerValidation, getValidation, loginValidation, logoutValidation } from "../validation/user-validation.js";
import prismaClient from "../app/database.js";
import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error.js";

async function register(username) {
  username = validate(registerValidation, username);

  const userInDatabase = await prismaClient.user.findFirst({
    where: {
      username: username,
    },
    select: {
      user_id: true,
      username: true,
    },
  });

  if (!userInDatabase) {
    const user = await prismaClient.user.create({
      data: {
        username: username,
      },
      select: {
        user_id: true,
        username: true,
      },
    });

    return await login(user);
  } else {
    return await login(userInDatabase);
  }
}

async function login(user) {
  user = validate(loginValidation, user);

  const secretKey = "sangatRahasia";

  // create token when login success
  const userPayload = {
    user_id: user.user_id,
    username: user.username,
  };

  const token = jwt.sign(userPayload, secretKey, { expiresIn: "1d" });

  return await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: token,
    },
    select: {
      token: true,
    },
  });
}

async function get(user_id) {
  user_id = validate(getValidation, user_id);

  const userInDatabase = await prismaClient.user.findFirst({
    where: {
      user_id: user_id,
    },
    select: {
      token: true,
    },
  });

  if (!userInDatabase) throw new ResponseError(403, "Unauthorized");

  const secretKey = "sangatRahasia";
  const isTokenVerified = jwt.verify(userInDatabase.token, secretKey);

  return {
    user_id: isTokenVerified.user_id,
    username: isTokenVerified.username,
  };
}

async function logout(user) {
  user = validate(logoutValidation, user);

  return await prismaClient.user.update({
    where: {
      user_id: user.user_id,
      AND: {
        username: user.username,
      },
    },
    data: {
      token: null,
    },
  });
}

export default {
  register,
  login,
  get,
  logout,
};
