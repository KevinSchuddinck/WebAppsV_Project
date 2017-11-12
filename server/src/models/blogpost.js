import mongoose from 'mongoose';
import config from '../config/index';


const blogpostSchema = mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, required: true} ,
    text: { type: String, required: true }
});

class BlogpostClass {

}

blogpostSchema.loadClass(BlogpostClass);
const Blogpost = mongoose.model('Blogpost', blogpostSchema);
export default Blogpost;
