
import OpenAI from "openai";
import { OPEN_API_KEY } from "./API_Auths";

const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;