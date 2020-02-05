import { ServerUrl } from "./config";
import Axios from "axios";
const fetchData = (route, data = null) => Axios.post(ServerUrl + route, data);

export default fetchData;
