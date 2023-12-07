import crypto from "crypto";
import User from "../database/model/user.js";
import Url from "../database/model/url.js";
import createToken from "../utils/createToken.js";
export const shortenUrl = async (req, res) => {
  let { longUrl, id } = req.body;
  try {
    function generateRandomString(length) {
      return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
    }
    // Usage:
    const randomString = generateRandomString(8); // Generates an 8-character random string
    // If the longUrl exists, update the shortCode
    const updatedShortUrl = await Url.findOneAndUpdate(
      { longUrl },
      { $set: { shortCode: randomString, userId: id } },
      { new: true, upsert: true }
    );
    const shortenedUrl = process.env.SERVER_URL + "/" + randomString;

    return res.send({ shortUrl: shortenedUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Failure 😂");
  }
};

export const redirect = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    let data = await Url.findOne({ shortCode: id });
    if (!data) {
      return res.status(404).send("URL not found");
    }
    data.click += 1;
    await data.save();
    const url = data.longUrl.startsWith("http")
      ? data.longUrl
      : `https://${data.longUrl}`;
    return res.redirect(`${url}`);
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    let { email, name, picture, email_verified } = req.body.data;
    console.log(email_verified);
    if (!email_verified) {
      return res.status(200).send({ success: false });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = await User.create({
        email,
        name,
        picture,
        email_verified,
      });
    }
    let response = await createToken(
      { id: user._id, name: user.name },
      process.env.SECRET_KEY,
      "24h"
    );
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const cookieOptions = {
      httpOnly: true,
      secure: false,
      expires: expiration,
      domain: process.env.CLIENT_DOMAIN,
      path: "/",
    };

    res.cookie("tokenA", response, cookieOptions);
    return res.status(200).send({ success: user });
  } catch (err) {
    console.log(err);
  }
};

export const urls = async (req, res) => {
  try {
    let { id } = req.query;
    let data = await Url.find({ userId: id });
    if (!data) return res.status(200).send({ success: false });
    return res.status(200).send({ success: true, urls: data });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


export function reset(req,res){
    const isSecure = req.protocol === 'https';
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(0),
        secure: isSecure, // Set 'Secure' attribute only for HTTPS
        domain:process.env.CLIENT_DOMAIN,
        path:"/"
    };
    
    res.cookie('tokenA', "", cookieOptions);
    res.send("Cookie deleted SIR!")
}

export const check = async(req,res) => {
    try{
        if(req.payload){
            let {id} = req.payload; 
             
            return res.status(200).send({success:true})
        }else{
            return res.status(200).send({success:false})
        }
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
  
   
}