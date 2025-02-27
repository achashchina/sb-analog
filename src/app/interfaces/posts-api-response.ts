import { LinkedinPostInterface } from './linkedin-post.interface';

type PostsApiResponse = {
  statusCode: number;
  body: ResponseBody 
};

type ResponseBody =
  | {
      response: LinkedinPostInterface[];
      status: boolean;
    }
  | {
      error: any;
    };

export default PostsApiResponse;
