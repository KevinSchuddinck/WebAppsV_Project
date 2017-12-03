import express from 'express';
import Blogpost from '../models/blogpost';
import { auth } from '../middleware/authentication';

const router = express.Router();

router.get('/get', auth, async function (req, res, next) {
  var blogposts;
  try{
    blogposts = await Blogpost.find({});
  }catch(err){
    console.log(err);
    return res.status(400).json({ error : err });
  }
  return res.status(201).json({blogposts});
});

router.post('/send', auth, async function(req, res, next) {
  try{
    const {email, text} = req.body;
    const blogpost = new Blogpost();
    blogpost.email = email;
    blogpost.date = new Date();
    blogpost.text = text;

    console.log(req.body);

    await blogpost.save();
  }catch(err){
    //console.log(err);
    return res.status(400).json({ message: 'Error while saving blogpost' });
  }
  return res.status(201).json({ message : 'blogpost sent'});
});

export default router;
