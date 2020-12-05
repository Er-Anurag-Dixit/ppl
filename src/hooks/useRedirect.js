import { useHistory, useLocation, useParams, useRouteMatch, generatePath } from "react-router-dom";

const UseRedirect = () =>{
    const history = useHistory()
  const location = useLocation()
  const params=useParams()
  const match=useRouteMatch()
  return{
    params: match.params,
    url: match.url,
    push: history.push,
    location,
    replace: history.replace,
    path: match.path,
    generatePath,
  }
}
export default UseRedirect;