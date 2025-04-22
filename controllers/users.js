import { userModel } from "../models/user.js";
import { mailTransporter, registerUserMailTemplate } from "../utils/mail.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res, next) => {
  //Validate user info
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //Check if user does not exist already
  const user = await userModel.findOne({
    $or: [
      { username: value.username },
      { email: value.email }
    ]
  });
  if (user) {
    return res.status(409).json('User already exists')
  }

  //Hash plaintext password
  const hashedPassword = bcrypt.hashSync(value.password, 10);
  //Create user record in db
  await userModel.create({
    ...value,
    password: hashedPassword
  });
  //send registration email to user 
  await mailTransporter.sendMail({
    from: 'dorcasnquaye28@gmail.com',
    to: value.email,
    subject: 'Checking out Nodemailer',
    html: registerUserMailTemplate.replace('{{username}}', value.username)
  })
  //(Optionally generate access token for user)
  //Return response
  res.status(201).json('User registered successfully')
}




//login
export const loginUser = async (req, res, next) => {
  //Validate user info
  const { error, value } = loginUserValidator.validate(req.body)
  if (error) {
    return res.status(422).json(error);
  }
  //Find matching user record in db
  const user = await userModel.findOne({
    $or: [
      { username: value.username },
      { email: value.email }
    ]
  });
  if (!user) {
    return res.status(404).json('User does not exist')
  }
  //Compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password)
  if (!correctPassword) {
    return res.status(401).json('Invalid credentials');
  }
  //Generate access token for the user
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '24h' }
  )
  //Return response
  res.status(200).json({
    accessToken,
    user: {
      role: user.role,
      email: user.email
    }
  });
}




export const updateUser = async (req, res, next) => {
  //validate request body
  const { error, value } = updateUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //update user in db
  const result = await userModel.findByIdAndUpdate(
    req.params.id,
    value,
    { new: true }
  );
  //return response
  res.status(200).json(result)
}


export const getAuthenticatedUser = async (req, res, next) => {
  //Get user by id using req.auth.id
  const result = await userModel
    .findById(req.auth.id)
    .select({ password: false });
  //return response
  res.status(200).json(result)
}