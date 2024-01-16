import userService from "../services/user-service.js";

async function register(req, res) {
  const username = req.body.username;
  const result = await userService.register(username);

  res.status(200).json({
    status: "OK",
    data: result,
  });
}

export default {
  register,
};
