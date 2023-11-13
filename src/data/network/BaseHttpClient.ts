import ky from "ky";
import { API_BASE_URL } from "../../Config";

const baseHttpClient = ky.create({
  prefixUrl: API_BASE_URL,
});

export default baseHttpClient;
