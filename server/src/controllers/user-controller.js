import userService from "../services/user-service.js";

async function register(req, res) {
  const username = req.body.username;
  const result = await userService.register(username);

  res.status(200).json({
    status: "OK",
    data: result,
  });
}

async function get(req, res) {
  const user_id = req.params.userId;
  const result = await userService.get(user_id);

  res.status(200).json({
    status: "Authorized",
    data: result,
  });
}

async function logout(req, res) {
  await userService.logout(req.body);

  res.status(200).json({
    status: "Logout",
  });
}

export default {
  register,
  get,
  logout,
};
